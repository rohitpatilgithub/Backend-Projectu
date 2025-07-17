import User from "../model/user.model.js";
import mongoose from "mongoose";

// @desc GET user
// @route GET /api/users
export const getUser = async (req,res) => {
  try {
    const userData = await User.find({ createdBy: req.user._id  });
    res.status(200).json({ data: userData });
  } catch (error) {
    console.log("No user found : "+ error.message)
    res.status(404).json({message : "User not found"})
  }
};


// @desc GET user
// @route GET /api/users/:id
export const getUserById = async (req,res) => {
  try{
    const { id } = req.params;
    const userData = await User.findOne({ _id: id, createdBy: req.user._id });
    if(!userData){
      res.status(404).json({message : `User id ${id} not found`});
    }
    res.status(200).json({ data : userData});
  }
  catch(error){
    res.status(500).json({message : error.message});
  }
}

//@ Using middleware but not used in that way
// export const userById = async (req, res) => {
//     try {
//       res.status(200).json({ data: req.user });
//     } catch (error) {
//       res.status(500).json({ message: "Unexpected error" });
//     }
// };

// @desc POST user
// @route POST /api/users
export const postUser = async (req, res) => {
  const { _id , name, salary } = req.body;

  if (!_id || !name || !salary) {
    return res.status(400).json({ message: "Name and salary are required" });
  }

  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized: Admin not logged in" });
  }
  const newUser = await new User({
    _id,
    name,
    salary,
    createdBy: req.user._id
  });
  try {
    await newUser.save();
    return res.status(201).json({message : "User created ", data : newUser });
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong"});
  }
};

// @desc PUT user
// @route PUT /api/users/:id
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const userInfo = req.body;
  if (!userInfo) {
    res.status(404).json({ message: "Please enter user info" });
  }
  try {
    const userData = await User.findOneAndUpdate(
      { _id: id, createdBy: req.user._id }, // 🔐 filter to only update own user
      userInfo,
      { new: true }
    );
    res.status(200).json({ data: userData });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete user
// @route DELETE /api/users/:id
export const deleteUser = async (req,res) => {
  const { id } = req.params;
  try {
    await User.findOneAndDelete({
      _id: id,
      createdBy: req.user._id, // 🔐 match by creator
    });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};