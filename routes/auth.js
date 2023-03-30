const express = require('express');
const router = express.Router();
const firebase = require('firebase-admin');
let userID = '';

const firebaseClient = require("firebase");
const firebaseConfig = {
   apiKey: "AIzaSyDhnvPMhtqbi3Q8h88c1t6vOZ58yjuTK0c",
   authDomain: "kutsu-web.firebaseapp.com",
   projectId: "kutsu-web",
   storageBucket: "kutsu-web.appspot.com",
   messagingSenderId: "374295225814",
   appId: "1:374295225814:web:829db27ccef6fc13cb3077",
   measurementId: "G-CZ0QYKH3NB"
};
firebaseClient.initializeApp(firebaseConfig);

var serviceAccount = require("../services/kutsu-web-firebase-admin.json");

// const {
//    FIREBASE_PROJECT_ID = serviceAccount.project_id,
//    FIREBASE_PRIVATE_KEY = serviceAccount.private_key,
//    FIREBASE_CLIENT_EMAIL = serviceAccount.client_email,
// } = process.env

// firebase.initializeApp({
//    credential: firebase.credential.cert({
//       projectId: FIREBASE_PROJECT_ID,
//       clientEmail: FIREBASE_CLIENT_EMAIL,
//       privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//    }),
//    storageBucket: "kutsu-web.appspot.com",
// })

firebase.initializeApp({
   credential: firebase.credential.cert(serviceAccount),
   storageBucket: "kutsu-web.appspot.com",
})
const db = firebaseClient.firestore();

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

router.get('/logout', function (req, res, next) {
   firebaseClient.auth().signOut().then(function () {
      req.session.user = '';
      userID = '';
      res.redirect('/');
   }, function (error) {
      console.error('Sign Out Error', error);
      msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
      path = '';
      res.redirect('/success/' + msg + '/' + path);
   });
});

router.post('/login', function (req, res) {
   const { email, password } = req.body;
   if (email == 'admin@kutsu.com' && password == 'admin12345') {
      const user = { username: "admin" }
      req.session.admin = user;
      res.redirect('/admin/status');
   } else {
      firebaseClient.auth().signInWithEmailAndPassword(email, password)
         .then(loggedUser => {
            const user = {
               username: loggedUser.user?.displayName,
               userUid: loggedUser.user?.uid
            }
            req.session.user = user;
            res.redirect('/');
         }
         ).catch(function (error) {
            console.log('Error login user:', error);
            msg = 'อีเมล์หรือรหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง';
            path = 'login';
            res.redirect('/success/' + msg + '/' + path);
         });
   }
})

router.post('/register', function (req, res) {
   const { name, email, birthDate, address, password } = req.body;
   firebaseClient.auth().createUserWithEmailAndPassword(email, password)
      .then(async userRecord => {
         console.log('Successfully created new user:', userRecord.user.uid);
         userRecord.user.displayName = name;
         const usersDb = db.collection('users');
         await usersDb.doc(userRecord.user.uid).set({
            birthDate: birthDate,
            address: address
         }).then(function () {
            msg = 'ลงทะเบียนเสร็จสิ้น กรุณาล็อคอินอีกครั้ง';
            path = 'login';
            res.redirect('/success/' + msg + '/' + path);
         }).catch(function (error) {
            console.log('Error creating new user:', error);
            msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
            path = 'register';
            res.redirect('/success/' + msg + '/' + path);
         });
      })
      .catch(function (error) {
         console.log('Error creating new user:', error);
         msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
         path = 'register';
         res.redirect('/success/' + msg + '/' + path);
      });
})

router.get('/success/:msg/:path', async (req, res, next) => {
   const { msg, path } = req.params
   res.render('success', { success: msg, path: path });
})

module.exports = router;