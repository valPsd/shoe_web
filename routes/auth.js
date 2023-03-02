const express = require('express');
const router = express.Router();
let userID = '';

router.get('/', function (req, res, next) {
   userID = req.session.user;
   res.render('index', { title: 'Home', userID: userID });
});

router.get('/login', function (req, res, next) {
   res.render('login', { title: 'Login' });
});

router.get('/register', function (req, res, next) {
   res.render('register', { title: 'Register' });
});

router.get('/shoes/:shoeType', function (req, res, next) {
   const shoeType = req.params.shoeType;
   let type = "";
   if (shoeType == "men") {
      type = "รองเท้าผู้ชาย"
   }
   else if (shoeType == "women") {
      type = "รองเท้าผู้หญิง"
   }
   else {
      type = "รองเท้าเด็ก"
   }
   res.render('chooseShoe', { title: type, userID: userID });
});

router.get('/logout', function (req, res, next) {
   req.session.user = '';
   userID = '';
   res.redirect('/');
});

router.post('/login', function (req,res){
   const {email, password} = req.body;
   const user = {username: "Jane Doe"}
   req.session.user = user;
   res.redirect('/');
})

router.post('/register', function (req,res){
   const {name, email, birthDate, address, password} = req.body;
   msg = 'ลงทะเบียนเสร็จสิ้น กรุณาล็อคอินอีกครั้ง';
   path = 'login';
   res.redirect('/success/' + msg + '/' + path);
})

router.get('/success/:msg/:path', async (req, res, next) => {
   console.log("Welcome");
   const { msg, path } = req.params
   res.render('success', { success: msg, path: path });
})

module.exports = router;
