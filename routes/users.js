const router = require('express').Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Buat JWT Token (jwt.sign)
const createJWT = (email, userId, role, kodeAgent, duration) => {
   const payload = {
      email,
      userId,
	  role,
	  kodeAgent,
      duration
   };
   return jwt.sign(payload, process.env.TOKEN_SECRET, {
     expiresIn: duration,
   });
};

// Verifikasi token 
router.post("/verifikasiToken", async (req, res) => {
	console.log('Trying to verify token...')
	const token = req.header( "x-auth-token");
	
	// IsEmpty?
	if (!token) { 
		console.log('no token!');
		return res.json(false);
	}
	
	// IsExpired?
	jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
		if(err) {
			  err = {
				name: 'TokenExpiredError',
				message: 'jwt expired'
			  }
			  console.log('Token is expired!');
			  console.log(err);
			  return res.json(false) 
		  }
		})
	
	// IsUnverified?
	const verified = jwt.verify(token, process.env.TOKEN_SECRET);
	if (!verified) { 
		console.log('unverified');
		return res.json(false) 
	};
	
	// IsThereUser?
	const user = await User.findById(verified.userId);
	if (!user) {
		console.log('no user!');
		return res.json(false);
	}
	return res.json(true);
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
				 user.role,
				 user.kode_agent,
				 3600
			   );
			   jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
				 if (err) {
					res.status(500).json({ errors: err });
				 }
				 if (decoded) {
					console.log('Creating token...');
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
	let { email, password, passwordCheck, role, kodeAgent } = req.body;
	
	console.log(req.body);
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
	if (!passwordCheck) {
		errors.push({ passwordCheck: "required" });
	}
	if (password != passwordCheck) {
		errors.push({ password: "mismatch" });
	}
	if (!role) {
		errors.push({ role: "required" });
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
		   email: email,
		   password: password,
		   role: role,
		   kode_agent: kodeAgent
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

// User Access (Tahap kedua setelah /verifikasiToken)
router.get("/", cekToken, async (req, res) => {
	const user = await User.findById(req.user);
	console.log('ID: '+req.user);
	
	res.json({
		email: user.email,
		id: user._id,
		role: user.role,
		kodeAgent: user.kode_agent
	});
});

// Delete

router.delete("/:id", async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		res.json(deletedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Access All Users Data
router.route('/all').get((req, res) => {
	User.find()
		.then(users => res.json(users))
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;