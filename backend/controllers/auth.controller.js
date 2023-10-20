const { User } = require("../models/models.js");
const bycrpt = require("bcryptjs");
const createAccessToken = require("../libs/jwt.js");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config.js");
const nodemailer = require("nodemailer");

const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["El email ya esta en uso"]);

    const passwordHash = await bycrpt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      categorias: [],
    });
    console.log(newUser);
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

    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bycrpt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect Password" });

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
  if (!userFound) return res.status(400).json({ message: "User not found" });
  console.log(userFound);

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
    categorias: userFound.categorias,
  });
  res.send("profile");
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

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "marconcinileandro2043@gmail.com", // Cambia esto con tu dirección de correo
    pass: "leluma30", // Contraseña de tu correo
  },
});

const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Verifica si el usuario con el correo electrónico existe
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    // Genera un token único y de corta duración
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Almacena el token en la base de datos junto con una fecha de expiración
    userFound.resetPasswordToken = resetToken;
    userFound.resetPasswordExpires = Date.now() + 3600000; // Expira en 1 hora
    await userFound.save();

    // Envía un correo electrónico al usuario con un enlace de restablecimiento de contraseña
    const mailOptions = {
      from: "marconcinileandro2043@gmail.com",
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

// Controlador para cambiar la contraseña
const changePassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    // Busca el usuario por el token y verifica la fecha de expiración
    const userFound = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!userFound) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }

    // Hashea y actualiza la contraseña del usuario
    const hashedPassword = await bycrpt.hash(newPassword, 10);
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
