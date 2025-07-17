import Admin from "../model/admin.model.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/admin.auth.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAdmin = async (req, res) => {
  try {
    const adminData = await Admin.find({});
    res.status(200).json({ data: adminData });
  } catch (error) {
    console.log("No user found : " + error.message);
    res.status(404).json({ message: "User not found" });
  }
};

export const postAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(404).json({ message: "Fill the complete details" });
  }
  const newUser = new Admin({ name, email, password });
  try {
    await newUser.save();
    return res.status(200).json({ message: "Saved user details" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ message: "Fill the complete details" });
  }
  try {
    const user = await Admin.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId, {
      httpOnly: true,
      sameSite: "None", // or "Strict" for security
      secure: true
    });
    console.log(sessionId);
    return res.status(200).json({ message: "User exists" });
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }
};

export const singUpUser = async (req, res) => {
  res.sendFile(path.join(__dirname, "..//..//public/admin/admin.html"));
};

export const loginUser = async (req, res) => {
  res.sendFile(path.join(__dirname, "..//..//public/index.html"));
};  

export const homePage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/admin/crud.html"));
};
