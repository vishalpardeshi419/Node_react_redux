const User = require('../model/User')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const { name, email, password, password2 } = req.body;
    if(!name || !password) return res.status(400).json({'message': 'Username and password required!'});
    // check duplicate 
    const duplicate = await User.findOne({ username: name}).exec();
    if(duplicate) return res.status(409).json({message : "User Already exist"})
    try {
        const hashPwd = await bcrypt.hash(password, 10);
        const user =  await User.create({
            "username": name,
            "email" : email,
            "password" : hashPwd,
            "password2" : hashPwd,
        });

        // Alternative to save
        // const newUser = new User();
        // const result =  await newUser.save();
        console.log('resutl', user)       
        
        res.status(201).json({  
            _id: user._id,
            name: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (err) {

    }
}

const generateToken = (id) => {
    return jwt.sign({ id },  process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30d',
    })
  }

module.exports = { handleNewUser }