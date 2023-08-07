const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken=(id, name, ispremiumuser)=>{
    return jwt.sign({userId:id, name: name, ispremiumuser },process.env.JSW_WEB_TOKEN_SECRETKEY);
}

const signup = async (req, res, next) => {
  try {
    const name = req.body.name.trim();
    const email = req.body.email.trim();
    const pass = req.body.pass;
    console.log(`sign up with:${name} ${email} ${pass}`);

    if (Invalidstring(name) || Invalidstring(email) || Invalidstring(pass)) {
      return res.status(400).json({ err: 'All the fields are mandatory' });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    } else {
      bcrypt.hash(pass, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({ err: 'Error generating hash' });
        }

        const newUser = new User({
          name: name,
          email: email,
          password: hash
        });

        await newUser.save();

        res.status(201).json({ message: 'Successfully new user created' });
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Internal server error' });
  }
};


const login = async (req, res, next) => {
    try {
      const email = req.body.email.trim();
      const pass = req.body.pass;
      console.log(`with: ${email} ${pass}`);
  
      if (Invalidstring(email) || Invalidstring(pass)) {
        return res.status(400).json({ success: false, message: 'All the fields are mandatory' });
      }
  
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      bcrypt.compare(pass, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Something Went Wrong' });
        }
        if (result === true) {
          const token = generateToken(user._id, user.name, user.ispremiumuser);
          return res.status(201).json({ success: true, message: 'Successfully loggedIn', token: token });
        } else {
          return res.status(401).json({ success: false, message: 'Password is incorrect' });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err, success: false });
    }
  };


function Invalidstring(str){
    if(str.trim().length==0 || str == undefined){
        return true;
    }else{
        return false;
    }
}

module.exports = {
    signup,
    login,
    generateToken
}