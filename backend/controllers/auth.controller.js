const { User } = require("../models/models.js");
const bcrypt = require("bcryptjs");
const createAccessToken = require("../libs/jwt.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const randomstring = require('randomstring');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'stocked2043@gmail.com',
    pass: 'kcoo cibx djbq dudf ',
  },
});

const register = async (req, res) => {
  console.log("AA")
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
  console.log("AA")
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
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

const profile = async (req, res) => {
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

const verifyToken = (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.send(false);
  }

  jwt.verify(token, 'some secret key', async (error, decoded) => {

    if (error) {
      console.log("Error al verificar el token:", error);
      return res.sendStatus(401);
    }

    const userFound = await User.findById(decoded.id);

    if (!userFound) {
      return res.sendStatus(401).json({message: "Usuario no encontrado"});
    }

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

const resetPasswordRequest = async (req, res) => {
  const { email } = req.body;

  try {
    const userFound = await User.findOne({ email: email });
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    // Genera un token único y de corta duración
    const resetToken = randomstring.generate({ length: 32 });

    // Almacena el token en la base de datos junto con una fecha de expiración
    userFound.resetPasswordToken = resetToken;
    userFound.resetPasswordExpires = Date.now() + 600000; // Expira en 1 hora
    await userFound.save();

    // Envía un correo electrónico al usuario con un enlace de restablecimiento de contraseña
    const mailOptions = {
      from: "stocked2043@gmail.com",
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

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const userFound = await User.findOne({
      resetPasswordToken: token
    });
    // console.log(token)
    // console.log(userFound)
    if (!userFound) {
      return res.status(400).json({ message: 'Token inválido' });
    }
    if(userFound.resetPasswordExpires < Date.now()){
      return res.status(400).json({ message: 'Token Vencido' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    userFound.password = passwordHash;
    userFound.resetPasswordToken = undefined;
    userFound.resetPasswordExpires = undefined;
    await userFound.save();

    res.status(200).json({ message: 'Contraseña cambiada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'La contraseña actual no es válida' });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ message: 'La nueva contraseña no puede ser igual a la anterior' });
    }

    if (confirmPassword !== newPassword) {
      return res.status(400).json({ message: 'La nueva contraseña debe coincidir con la contraseña de confirmación' });
    }

    // Hashea la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualiza la contraseña del usuario en la base de datos
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).json({ message: 'Contraseña cambiada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al cambiar la contraseña' });
  }
};



module.exports = {
  register,
  login,
  logout,
  profile,
  verifyToken,
  resetPasswordRequest,
  resetPassword,
  changePassword
};
