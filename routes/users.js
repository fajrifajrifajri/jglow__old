const router = require('express').Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Buat JWT Token (jwt.sign)
const createJWT = (email, userId, duration) => {
   const payload = {
      email,
      userId,
      duration
   };
   return jwt.sign(payload, process.env.TOKEN_SECRET, {
     expiresIn: duration,
   });
};

// Verifikasi token disaat login
router.post("/verifikasiToken", async (req, res) => {
	try {
		const token = req.header( "x-auth-token");
		if (!token) return res.json(false);
			const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		if (!verified) return res.json(false);
			const user = await User.findById(verified.id);
		if (!user) return res.json(false);
			return res.json(true);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Login
router.route('/masuk').post((req, res) => {
	let { email, password } = req.body;
	
	let errors = [];
     if (!email) {
       errors.push({ email: "required" });
     }
     if (!emailRegexp.test(email)) {
       errors.push({ email: "invalid" });
     }
     if (!password) {
       errors.push({ password: "required" });
     }
     if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
     }
	
    User.findOne({ email: email }).then(user => {
       if (!user) {
         return res.status(404).json({
           errors: [{ user: "unregistered" }],
         });
       } else {
          bcrypt.compare(password, user.password).then(isMatch => {
				 if (!isMatch) {
				  return res.status(400).json({ errors: [{ password: "wrong" }] 
				  });
				 }
			   let access_token = createJWT(
				 user.email,
				 user._id,
				 3600
			   );
			   jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
				 if (err) {
					res.status(500).json({ errors: err });
				 }
				 if (decoded) {
					 return res.status(200).json({
						success: true,
						token: access_token,
						message: user
					 });
				   }
				 });
        }).catch(err => {
          res.status(500).json({ errors: err.stack });
        });
      }
   }).catch(err => {
      res.status(500).json({ errors: err });
   });
});

// Register
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

router.route('/daftar').post((req, res) => {
	let { username, email, password, passwordCheck } = req.body;
	
	let errors = [];
	if (!username) {
		errors.push({ username: "required" });
	}
	if (!email) {
		errors.push({ email: "required" });
	}
	if (!emailRegexp.test(email)) {
		errors.push({ email: "invalid" });
	}
	if (!password) {
		errors.push({ password: "required" });
	}
	if (!passwordCheck) {
		errors.push({ passwordCheck: "required" });
	}
	if (password != passwordCheck) {
		errors.push({ password: "mismatch" });
	}
	if (errors.length > 0) {
		return res.status(422).json({ errors: errors });
	}
  
	User.findOne({email: email})
	.then(user=>{
	  if(user){
		 return res.status(422).json({ errors: [{ user: "registered" }] });
	  }else {
		 const user = new User({
		   username: username,
		   email: email,
		   password: password,
		 });
		 bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
		 if (err) throw err;
		 user.password = hash;
		 user.save()
			 .then(response => {
				res.status(200).json({
				  success: true,
				  result: response
				})
			 })
			 .catch(err => {
			   res.status(500).json({
				  errors: [{ error: err }]
			   });
			});
		 });
	  });
	 }
	}).catch(err =>{
	  res.status(500).json({
		errors: [{ error: 'Something went wrong' }]
	  });
	})
});

// Cek Token, digunakan untuk proses router.delete menghapus user
// & router.get("/") dalam mengekstrak data user dari token.
const cekToken = require("./cekToken");

// Delete
router.delete("/delete", cekToken, async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.user);
		res.json(deletedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// User Access
router.get("/", cekToken, async (req, res) => {
	const user = await User.findById(req.user);
	res.json({
		displayName: user.displayName,
		id: user._id,
	});
});

// Users Access
router.route('/all').get((req, res) => {
	User.find()
		.then(users => res.json(users))
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;