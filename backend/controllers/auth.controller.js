const { User } = require("../models/models.js");
const bcrypt = require("bcryptjs");
const createAccessToken = require("../libs/jwt.js");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config.js");
const nodemailer = require("nodemailer");
const Cookies = require('js-cookie');
const randomstring = require('randomstring');

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "marconcinileandrogaston@gmail.com", // Cambia esto con tu dirección de correo
    pass: "290405lea", // Contraseña de tu correo
  },
});

const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["El email ya esta en uso"]);

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      categorias: [],
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token, {
      Secure: true,
      SameSite: "None",
    });
    res.json({
      id: userSaved.id,
      username: userSaved.username,
      email: userSaved.email,
      createAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token, {
      Secure: true,
      SameSite: "None",
    });

    

    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });

    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

const profile = async (req, res) => {
  console.log(req.user);
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
    categorias: userFound.categorias,
  });
};

const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    // Genera un token único y de corta duración
    const resetToken = randomstring.generate({ length: 32 });

    // Almacena el token en la base de datos junto con una fecha de expiración
    userFound.resetPasswordToken = resetToken;
    userFound.resetPasswordExpires = Date.now() + 3600000; // Expira en 1 hora
    await userFound.save();

    // Envía un correo electrónico al usuario con un enlace de restablecimiento de contraseña
    const mailOptions = {
      from: "marconcinileandrogaston@gmail.com",
      to: userFound.email,
      subject: "Restablecimiento de Contraseña",
      text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${req.headers.origin}/reset-password/${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Error al enviar el correo electrónico" });
      }

      res.json({ message: "Correo de restablecimiento de contraseña enviado" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const userFound = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!userFound) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    userFound.password = hashedPassword;
    userFound.resetPasswordToken = null;
    userFound.resetPasswordExpires = null;

    await userFound.save();

    res.json({ message: "Contraseña restablecida con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  profile,
  verifyToken,
  resetPassword,
  changePassword,
};
