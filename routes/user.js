const express = require('express');
const router = express.Router();
const firebase = require("firebase");
const firebaseAdmin = require('firebase-admin');
const db = firebase.firestore();
let userID = '';
let cartList = [];
let cartIDList = [];
let orderList = [];
let orderIdList = [];
let total = 0;

const storage = firebaseAdmin.storage();
const bucket = storage.bucket();

const multer = require("multer");
const upload = multer({
   storage: multer.memoryStorage(),
   limits: {
      fileSize: 5 * 1024 * 1024,
   }
});

router.get('/history', function (req, res, next) {
   userID = req.session.user;
   orderList = [];
   orderIdList = [];

   db.collection("Orders")
      .get()
      .then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            if (doc.data().UID == userID.userUid) {
               orderList.push(doc.data());
               orderIdList.push(doc.id);
            }
         });
         
         // let showOrder = orderList[0];
         // for (let i = 0; i < orderList.length; i++) {
         //    const date = new Date(orderList[i].Date, orderList[i].Time);
         //    const dateTemp = new Date(showOrder.Date, showOrder.Time);
         //    if (date > dateTemp) {
         //       showOrder = orderList[i];
         //    }
         // }
         res.render('history', { title: 'History', userID: userID, orderList: orderList });
      })
      .catch((error) => {
         console.log("Error getting documents: ", error);
         msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
         path = 'login';
         res.redirect('/success/' + msg + '/' + path);
      });
});

router.get('/status', function (req, res, next) {
   userID = req.session.user;
   orderList = [];
   orderIdList = [];

   db.collection("Orders")
      .get()
      .then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            if (doc.data().UID == userID.userUid && doc.data().Status != "จัดส่งเรียบร้อย") {
               orderList.push(doc.data());
               orderIdList.push(doc.id);
            }
         });
         
         let showOrder = orderList[0];
         for (let i = 0; i < orderList.length; i++) {
            const date = new Date(orderList[i].Date, orderList[i].Time);
            const dateTemp = new Date(showOrder.Date, showOrder.Time);
            if (date > dateTemp) {
               showOrder = orderList[i];
            }
         }
         res.render('orderStatus', { title: 'Order Status', userID: userID, showOrder: showOrder });
      })
      .catch((error) => {
         console.log("Error getting documents: ", error);
         msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
         path = 'login';
         res.redirect('/success/' + msg + '/' + path);
      });
});

router.get('/yourDesign', function (req, res, next) {
   userID = req.session.user;
   orderList = [];
   orderIdList = [];

   db.collection("Orders")
      .get()
      .then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            if (doc.data().UID == userID.userUid) {
               orderList.push(doc.data());
               orderIdList.push(doc.id);
            }
         });
         res.render('designed', { title: 'Your Design', userID: userID, orderList: orderList });
      })
      .catch((error) => {
         console.log("Error getting documents: ", error);
         msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
         path = 'login';
         res.redirect('/success/' + msg + '/' + path);
      });
});

router.get('/shoes/:shoeType', function (req, res, next) {
   userID = req.session.user;
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
   req.session.shoeType = type;
   res.render('chooseShoe', { title: type, userID: userID });
});

router.get('/cart', function (req, res, next) {
   userID = req.session.user;
   cartList = [];
   cartIDList = [];
   total = 0;
   db.collection("Carts")
      .get()
      .then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            if (doc.data().UID == userID.userUid) {
               cartList.push(doc.data());
               total += (parseInt(doc.data().Price) + parseInt(doc.data().LeatherPrice) + parseInt(doc.data().ColorPrice));
               cartIDList.push(doc.id);
            }
         });
         res.render('cart', { title: 'Your Cart', userID: userID, cartList: cartList, cartIDList: cartIDList, total: total });
      })
      .catch((error) => {
         console.log("Error getting documents: ", error);
         msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
         path = 'login';
         res.redirect('/success/' + msg + '/' + path);
      });
});

router.post('/deleteCart/:docID', function (req, res, next) {
   const docID = req.params.docID;
   db.collection("Carts").doc(docID).delete().then(() => {
      msg = 'ทำการลบสินค้าออกจากตะกร้าสำเร็จ';
      path = 'user cart';
      res.redirect('/success/' + msg + '/' + path);
   }).catch((error) => {
      console.error("Error removing document: ", error);
      msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
      path = 'user cart';
      res.redirect('/success/' + msg + '/' + path);
   });
});

router.get('/checkout', function (req, res, next) {
   userID = req.session.user;
   res.render('checkout', { title: 'Checkout', userID: userID, total: total });
});

router.post('/saveOrder', upload.single("slip"), async function (req, res, next) {
   let { address, inputAddress } = req.body;
   userID = req.session.user;
   const folder = 'Slips';
   const fileName = `${folder}/${Date.now()}`;
   const fileUpload = bucket.file(fileName);
   const newName = fileUpload.name.replace('/', '%2F');
   const blobStream = fileUpload.createWriteStream({
      metadata: {
         contentType: req.file.mimetype
      }
   });
   blobStream.on('error', (err) => {
      console.log(err);
   })
   blobStream.on('finish', async () => {
      const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${newName}?alt=media&token=7801580f-40aa-4cc9-ba92-681777d3a309`;
      console.log("Upload Successfully!")
      if (address == "old") {
         db.collection("users").doc(userID.userUid).get().then((doc) => {
            if (doc.exists) {
               inputAddress = doc.data().address;
            } else {
               console.log("No such document!");
               msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
               path = 'admin shoes';
               res.redirect('/success/' + msg + '/' + path);
            }
         }).catch((error) => {
            console.log("Error getting document:", error);
            msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
            path = 'admin shoes';
            res.redirect('/success/' + msg + '/' + path);
         });
      }
      const orderNum = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let currentDate = `${day}-${month}-${year}`;
      var time = date.getHours() + ":" + date.getMinutes();
      const usersDb = db.collection('Orders');
      for (let i = 0; i < cartList.length; i++) {
         let totaltemp = (parseInt(cartList[i].Price) + parseInt(cartList[i].LeatherPrice) + parseInt(cartList[i].ColorPrice));
         await usersDb.add({
            OrderNumber: orderNum,
            Price: totaltemp,
            ProductName: cartList[i].Name,
            Slip: downloadURL,
            Status: "รับยอดแล้ว",
            TrackingNumber: "",
            Address: inputAddress,
            UID: userID.userUid,
            Date: currentDate,
            Time: time,
            Image: cartList[i].Image,
         }).catch(function (error) {
            console.log('Error creating new doc:', error);
            msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
            path = 'admin shoes';
            res.redirect('/success/' + msg + '/' + path);
         });

         db.collection("Carts").doc(cartIDList[i]).delete().catch((error) => {
            console.error("Error removing document: ", error);
            msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
            path = 'user cart';
            res.redirect('/success/' + msg + '/' + path);
         });
      }
      const msg = 'ทำการสั่งซื้อสำเร็จ สามารถเช็คสถานะการจัดส่งได้ที่หน้าหลัก';
      const path = ' ';
      res.redirect('/success/' + msg + '/' + path);
   })
   blobStream.end(req.file.buffer);
});

router.post("/addTocart", upload.single("shoeImg"), async function (req, res, next) {
   const { size } = req.body;
   userID = req.session.user;
   const session = req.session;
   const usersDb = db.collection('Carts');

   const folder = 'Modify';
   const fileName = `${folder}/${Date.now()}`;
   const fileUpload = bucket.file(fileName);
   const newName = fileUpload.name.replace('/', '%2F');
   const blobStream = fileUpload.createWriteStream({
      metadata: {
         contentType: req.file.mimetype
      }
   });
   blobStream.on('error', (err) => {
      console.log(err);
   })
   blobStream.on('finish', async () => {
      const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${newName}?alt=media&token=7801580f-40aa-4cc9-ba92-681777d3a309`;
      console.log("Upload Successfully!")

      await usersDb.add({
         ColorCount: 10,
         ColorPrice: 2000,
         Image: downloadURL,
         LeatherCount: 10,
         LeatherPrice: 1500,
         Name: session.productName,
         Price: session.productPrice,
         Size: size,
         UID: userID.userUid,
      }).catch(function (error) {
         console.log('Error creating new doc:', error);
         msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
         path = 'admin shoes';
         res.redirect('/success/' + msg + '/' + path);
      });

      msg = 'เพิ่มสินค้าลงตะกร้าสำเร็จ';
      path = 'user cart';
      res.redirect('/success/' + msg + '/' + path);
   })
   blobStream.end(req.file.buffer);
});

router.get("/preview", function (req, res, next) {
   userID = req.session.user;
   let session = req.session;
   const shoe = session.detailShoe.partname;
   // const style = session.detailShoe.style;
   console.log(shoe);
   res.render("preview", { title: "Preview Product", userID: userID, shoe : shoe, style: style });
 });

 //men2
 router.get("/preview-men2", function (req, res, next) {
   userID = req.session.user;
   // let session = req.session;
   // const shoe = session.detailShoe.shoe;
   // const style = session.detailShoe.style;
   // console.log(shoe, style);
   // const picNum = 'shoe2_full'
   // const { shoe, style } = req.params
   res.render("preview2", { title: "Preview Product", userID: userID,  });
 });

 //women1
 router.get("/preview-women1", function (req, res, next) {
   userID = req.session.user;
   let session = req.session;
   const shoe = session.detailShoe.shoe;
   const style = session.detailShoe.style;
   console.log(shoe, style);
   // const picNum = 'shoe2_full'
   // const { shoe, style } = req.params
   res.render("preview3", { title: "Preview Product", userID: userID, shoe : shoe, style: style });
 });

 //women2
 router.get("/preview-women2", function (req, res, next) {
   userID = req.session.user;
   let session = req.session;
   const shoe = session.detailShoe.shoe;
   const style = session.detailShoe.style;
   console.log(shoe, style);
   // const picNum = 'shoe2_full'
   // const { shoe, style } = req.params
   res.render("preview4", { title: "Preview Product", userID: userID, shoe : shoe, style: style });
 });

 //kid1
 router.get("/preview-kid", function (req, res, next) {
   userID = req.session.user;
   let session = req.session;
   const shoe = session.detailShoe.shoe;
   const style = session.detailShoe.style;
   console.log(shoe, style);
   // const picNum = 'shoe2_full'
   // const { shoe, style } = req.params
   res.render("preview5", { title: "Preview Product", userID: userID, shoe : shoe, style: style });
 });

module.exports = router;
