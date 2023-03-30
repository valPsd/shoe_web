const express = require("express");
const session = require("express-session");
const router = express.Router();
const firebase = require("firebase");
const db = firebase.firestore();
let userID = "";
let shoesDetail = [];

//shoe men style1
router.get(
  "/save/shoemen/style1/:partname/:type/:value",
  function (req, res, next) {
    const { partname, value, type } = req.params;
    // console.log(partname, value);
    let session = req.session;
    session.detailShoe.partname = partname;
    session.detailShoe.type = type;
    session.detailShoe.value = value;
    console.log(session);
    // 1
    if (partname === "attached_heel") {
      res.redirect("/shoe/shoemen/style1/high_top");
    }
    // 2
    else if (partname === "bottom") {
      res.redirect("/user/preview");
    }
    // 3
    else if (partname === "edge") {
      res.redirect("/shoe/shoemen/style1/middle");
    }
    // 4
    else if (partname === "high_top") {
      res.redirect("/shoe/shoemen/style1/eyelet");
    }
    // 5
    else if (partname === "middle") {
      res.redirect("/shoe/shoemen/style1/tongue");
    }
    // 6
    else if (partname === "foot_front") {
      res.redirect("/shoe/shoemen/style1/edge");
    }
    // 7
    else if (partname === "counter_lining") {
      res.redirect("/shoe/shoemen/style1/tongue2");
    }
    // 8
    else if (partname === "eyelet") {
      res.redirect("/shoe/shoemen/style1/counter_lining");
    }
    // 9
    else if (partname === "shoe_lace") {
      res.redirect("/shoe/shoemen/style1/pull_tab");
    }
    // 10
    else if (partname === "tongue") {
      res.redirect("/shoe/shoemen/style1/attached_heel");
    }
    // 11
    else if (partname === "pull_tab") {
      res.redirect("/shoe/shoemen/style1/bottom");
    }
    // 12
    else if (partname === "tongue2") {
      res.redirect("/shoe/shoemen/style1/shoe_lace");
    }
  }
);

//get shoe style
router.get("/:shoe/:style/", function (req, res, next) {
  const { shoe, style } = req.params;

  shoesDetail = [];
  let shoeName, shoePrice;
  db.collection("Products")
      .get()
      .then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            shoesDetail.push(doc.data())
         });

         if (shoe != null && style != null) {
          if (shoe == "shoemen") {
            shoeName = "รองเท้าผู้ชาย"
           }else if (shoe == "shoewomen") {
            shoeName = "รองเท้าผู้หญิง"
           }else {
            shoeName = "รองเท้าเด็ก"
           }
  
           if (style == "style1") {
            shoeName += " แบบที่ 1"
           }else {
            shoeName += " แบบที่ 2"
           }
  
           shoesDetail.forEach(element => {
            if (element.Name == shoeName) {
              shoePrice = element.Price
            }
           });

          let session = req.session;
          session.productName = shoeName;
          session.productPrice = shoePrice;
          session.detailShoe = {
            shoe: shoe,
            style: style,
          };
          console.log(style);
          console.log(session);
          res.redirect("/shoe/choose_leather");
        }
      })
      .catch((error) => {
         console.log("Error getting documents: ", error);
         msg = 'มีข้อผิดพลาดเกิดขึ้น กรุณาลองอีกครั้ง';
         path = 'login';
         res.redirect('/success/' + msg + '/' + path);
      });
});

router.get("/shoemen/style1/attached_heel", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style1/attached_heel", {
    title: "Shoe Men attached heel",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style1/bottom", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style1/bottom", {
    title: "Shoe Men bottom",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style1/edge", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style1/edge", {
    title: "Shoe Men edge",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style1/high_top", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style1/high_top", {
    title: "Shoe Men high top",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style1/middle", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style1/middle", {
    title: "Shoe Men middle",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style1/foot_front", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  console.log(leather);
  res.render("shoeM/style1/foot_front", {
    title: "Shoe Men Foot Front",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style1/counter_lining", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style1/counter_lining", {
    title: "Shoe Men Couter lining",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style1/eyelet", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style1/eyelet", {
    title: "Shoe Men Eyelet",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style1/pull_tab", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style1/pull_tab", {
    title: "Shoe Men Pull tab",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style1/shoe_lace", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style1/shoe_lace", {
    title: "Shoe Men Lace",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style1/tongue", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style1/tongue", {
    title: "Shoe Men Tongue",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style1/tongue2", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style1/tongue2", {
    title: "Shoe Men Tongue",
    userID: userID,
    leather: leather,
  });
});

//shoe men style2
router.get(
  "/save/shoemen/style2/:partname/:type/:value",
  function (req, res, next) {
    const { partname, value, type } = req.params;
    // console.log(partname, value);
    let session = req.session;
    session.detailShoe.partname = partname;
    session.detailShoe.type = type;
    session.detailShoe.value = value;
    console.log(session);
    // 1
    if (partname === "attached_heel") {
      res.redirect("/shoe/shoemen/style2/counter_lining");
    }
    // 2
    else if (partname === "bottom") {
      res.redirect("/user/preview");
    }
    // 3
    else if (partname === "edge") {
      res.redirect("/shoe/shoemen/style2/middle");
    }
    // 4
    else if (partname === "middle") {
      res.redirect("/shoe/shoemen/style2/tongue");
    }
    // 5
    else if (partname === "foot_front") {
      res.redirect("/shoe/shoemen/style2/edge");
    }
    // 6
    else if (partname === "counter_lining") {
      res.redirect("/shoe/shoemen/style2/tongue2");
    }
    // 7
    else if (partname === "shoe_lace") {
      res.redirect("/shoe/shoemen/style2/back");
    }
    // 8
    else if (partname === "tongue") {
      res.redirect("/shoe/shoemen/style2/attached_heel");
    }
    // 9
    else if (partname === "back") {
      res.redirect("/shoe/shoemen/style2/bottom");
    }
    // 10
    else if (partname === "tongue2") {
      res.redirect("/shoe/shoemen/style2/shoe_lace");
    }
  }
);

router.get("/shoemen/style2/foot_front", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style2/foot_front", {
    title: "Shoe Men Foot front",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style2/attached_heel", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style2/attached_heel", {
    title: "Shoe Men Attached heel",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style2/back", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style2/back", {
    title: "Shoe Men Back",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style2/bottom", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style2/bottom", {
    title: "Shoe Men Bottom",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style2/counter_lining", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style2/counter_lining", {
    title: "Shoe Men Conuter lining",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style2/edge", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style2/edge", {
    title: "Shoe Men Edge",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style2/middle", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style2/middle", {
    title: "Shoe Men Middle",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style2/shoe_lace", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style2/shoe_lace", {
    title: "Shoe Men Show lace",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style2/tongue", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style2/tongue", {
    title: "Shoe Men Tongue",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoemen/style2/tongue2", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeM/style2/tongue2", {
    title: "Shoe Men Tongue 2",
    userID: userID,
    leather: leather,
  });
});

//shoe women style1
router.get(
  "/save/shoewomen/style1/:partname/:type/:value",
  function (req, res, next) {
    const { partname, value, type } = req.params;
    // console.log(partname, value);
    let session = req.session;
    session.detailShoe.partname = partname;
    session.detailShoe.type = type;
    session.detailShoe.value = value;
    console.log(session);
    // 1
    if (partname === "middle") {
      res.redirect("/shoe/shoewomen/style1/counter_lining");
    }
    // 2
    else if (partname === "bottom") {
      res.redirect("/user/preview");
    }
    // 3
    else if (partname === "counter_lining") {
      res.redirect("/shoe/shoewomen/style1/eyelet");
    }
    // 4
    else if (partname === "eyelet") {
      res.redirect("/shoe/shoewomen/style1/foot_front");
    }
    // 5
    else if (partname === "foot_front") {
      res.redirect("/shoe/shoewomen/style1/pull_tab");
    }
    // 6
    else if (partname === "pull_tab") {
      res.redirect("/shoe/shoewomen/style1/shoe_lace");
    }
    // 7
    else if (partname === "shoe_lace") {
      res.redirect("/shoe/shoewomen/style1/tongue");
    }
    // 8
    else if (partname === "tongue") {
      res.redirect("/shoe/shoewomen/style1/tongue2");
    }
    // 9
    else if (partname === "tongue2") {
      res.redirect("/shoe/shoewomen/style1/bottom");
    }
  }
);

router.get("/shoewomen/style1/pull_tab", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeW/style1/pull_tab", {
    title: "Shoe Women Pull tab",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoewomen/style1/foot_front", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeW/style1/foot_front", {
    title: "Shoe Women Foot front",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoewomen/style1/bottom", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeW/style1/bottom", {
    title: "Shoe Women Bottom",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoewomen/style1/counter_lining", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeW/style1/counter_lining", {
    title: "Shoe Women Conuter lining",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoewomen/style1/eyelet", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeW/style1/eyelet", {
    title: "Shoe Women Eyelet",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoewomen/style1/middle", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeW/style1/middle", {
    title: "Shoe Women Middle",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoewomen/style1/shoe_lace", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeW/style1/shoe_lace", {
    title: "Shoe Women Shoe lace",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoewomen/style1/tongue", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeW/style1/tongue", {
    title: "Shoe Women Tongue",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoewomen/style1/tongue2", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeW/style1/tongue2", {
    title: "Shoe Women Tongue 2",
    userID: userID,
    leather: leather,
  });
});

//shoe women style2
router.get(
  "/save/shoewomen/style2/:partname/:type/:value",
  function (req, res, next) {
    const { partname, value, type } = req.params;
    // console.log(partname, value);
    let session = req.session;
    session.detailShoe.partname = partname;
    session.detailShoe.type = type;
    session.detailShoe.value = value;
    console.log(session);
    // 1
    if (partname === "middle") {
      res.redirect("/shoe/shoewomen/style2/counter_lining");
    }
    // 2
    else if (partname === "bottom") {
      res.redirect("/user/preview");
    }
    // 3
    else if (partname === "counter_lining") {
      res.redirect("/shoe/shoewomen/style2/pull_tab");
    }
    // 4
    else if (partname === "shoe_lace") {
      res.redirect("/shoe/shoewomen/style2/tongue");
    }
    // 5
    else if (partname === "tongue") {
      res.redirect("/shoe/shoewomen/style2/bottom");
    }
    // 6
    else if (partname === "pull_tab") {
      res.redirect("/shoe/shoewomen/style2/shoe_lace");
    }
  }
);
router.get("/shoewomen/style2/pull_tab", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeW/style2/pull_tab", {
    title: "Shoe Women Pull tab",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoewomen/style2/bottom", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeW/style2/bottom", {
    title: "Shoe Women Bottom",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoewomen/style2/counter_lining", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeW/style2/counter_lining", {
    title: "Shoe Women Conuter lining",
    userID: userID,
    leather: leather,
  });
});

router.get("/shoewomen/style2/middle", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeW/style2/middle", {
    title: "Shoe Women Middle",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoewomen/style2/shoe_lace", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeW/style2/shoe_lace", {
    title: "Shoe Women Shoe lace",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoewomen/style2/tongue", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeW/style2/tongue", {
    title: "Shoe Women Tongue",
    userID: userID,
    leather: leather,
  });
});


//shoe childen style1
router.get(
  "/save/shoekid/style1/:partname/:type/:value",
  function (req, res, next) {
    const { partname, value, type } = req.params;
    // console.log(partname, value);
    let session = req.session;
    session.detailShoe.partname = partname;
    session.detailShoe.type = type;
    session.detailShoe.value = value;
    console.log(session);
    // 1
    if (partname === "middle") {
      res.redirect("/shoe/shoekid/style1/tongue");
    }
    // 2
    else if (partname === "bottom") {
      res.redirect("/user/preview");
    }
    // 3
    else if (partname === "counter_lining") {
      res.redirect("/shoe/shoekid/style1/back");
    }
    // 4
    else if (partname === "eyelet") {
      res.redirect("/shoe/shoekid/style1/attached_heel");
    }
    // 5
    else if (partname === "foot_front") {
      res.redirect("/shoe/shoekid/style1/middle");
    }
    // 6
    else if (partname === "pull_tab") {
      res.redirect("/shoe/shoekid/style1/bottom");
    }
    // 7
    else if (partname === "back") {
      res.redirect("/shoe/shoekid/style1/pull_tab");
    }
    // 8
    else if (partname === "tongue") {
      res.redirect("/shoe/shoekid/style1/eyelet");
    }
    // 9
    else if (partname === "attached_heel") {
      res.redirect("/shoe/shoekid/style1/edge");
    }
     // 10
     else if (partname === "edge") {
      res.redirect("/shoe/shoekid/style1/counter_lining");
    }
  }
);

router.get("/shoekid/style1/pull_tab", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeCh/style1/pull_tab", {
    title: "Shoe kid Pull tab",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoekid/style1/foot_front", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeCh/style1/foot_front", {
    title: "Shoe kid Foot front",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoekid/style1/bottom", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeCh/style1/bottom", {
    title: "Shoe kid Bottom",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoekid/style1/counter_lining", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeCh/style1/counter_lining", {
    title: "Shoe kid Conuter lining",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoekid/style1/eyelet", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeCh/style1/eyelet", {
    title: "Shoe kid Eyelet",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoekid/style1/middle", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeCh/style1/middle", {
    title: "Shoe kid Middle",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoekid/style1/attached_heel", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeCh/style1/attached_heel", {
    title: "Shoe kid Shoe lace",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoekid/style1/tongue", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeCh/style1/tongue", {
    title: "Shoe kid Tongue",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoekid/style1/back", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeCh/style1/back", {
    title: "Shoe kid Back",
    userID: userID,
    leather: leather,
  });
});
router.get("/shoekid/style1/edge", function (req, res, next) {
  const leather = req.session.detailShoe.leather;
  res.render("shoeCh/style1/edge", {
    title: "Shoe kid Back",
    userID: userID,
    leather: leather,
  });
});



//shoe childen style2

//choose matirial
router.get("/choose_leather", function (req, res, next) {
  userID = req.session.user;
  res.render("choose_leather", { title: "Choose Leather", userID: userID });
});

// router.get("/preview", function (req, res, next) {
//   userID = req.session.user;
//   res.render("preview", { title: "Preview Product", userID: userID });
// });

router.get("/save/choose_leather/:leather", function (req, res, next) {
  const { leather } = req.params;
  let session = req.session;
  session.detailShoe.leather = leather;
  const shoe = session.detailShoe.shoe;
  const style = session.detailShoe.style;
  console.log(session);
  if (shoe === "shoemen") {
    res.redirect(`/shoe/${shoe}/${style}/foot_front`);
  } else if (shoe === "shoewomen") {
    res.redirect(`/shoe/${shoe}/${style}/middle`);
  }else if (shoe === "shoekid") {
    res.redirect(`/shoe/${shoe}/${style}/foot_front`);
  }
});

module.exports = router;
