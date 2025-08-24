
//put this in your userController

const UserModel = require("../Model/user");
const sendEmail = require('../email');
// const User = require('../Models/Users');

exports.signup = async (req, res) => {
 
  //destructure the request body
const { email } = req.body;
const { firstName } = req.body;
//console.log(req.body)
  
  // check exsiting user
  const existingUser = await UserModel.findOne({ email: email });

  if (existingUser) {

    //this is not a good approach. It makes the request infinite. Remind me to explain in the next class
    // return new Error("Email already exist");

    //this is a better approach
    return res.status(400).json({ 
      message: "Email already exists" 
    });
  }

  

  //create user if user does not exist
  const newUser = await UserModel.create(req.body);


  res.status(201).json({
    message: "Signup successful.",
    user: newUser,
  });
 
await sendEmail(email, 'Welcome to My App!', 'welcome.html', { firstName });

};

 

// add this to userController

exports.login = async (req, res) => {

  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    // bad request
    return res.status(400).json({ 
      message: "Please provide email & password" 
    });
  }

  // 2) Check if user exists and password is correct
  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({ 
      message: "User not found" 
    });
  }

  if (!(await user.correctPassword(password, user.password))) {
    // unauthorized
    return res.status(401).json({ 
      message: "Incorrect email or password" 
    });
  }

  // If everything is okay, grant access
  res.status(200).json({
    status: "User login successful.",
    data: {
      user: user,
    },
  });
};


// controllers/userController.js
//const User = require('../models/User'); // import your User model

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: { users },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// GET id by users
exports.getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ status: "success", data: { user } });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};