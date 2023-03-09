const { log } = require('console');
const express = require('express');
const session = require('express-session');
const router = express.Router();
let userID = ''
//shoe men style1
router.get('/save/shoemen/style1/:partname/:type/:value', function (req, res, next) {
    const { partname, value, type } = req.params
    // console.log(partname, value);
    let session = req.session;
    session.detailShoe.partname = partname;
    session.detailShoe.type = type;
    session.detailShoe.value = value;
    console.log(session);
    // 1
    if (partname === 'attached_heel') {
        res.redirect('/shoe/shoemen/style1/high_top')
    }
    // 2
    else if (partname === 'bottom') {
        res.redirect('/shoe/preview')
    }
    // 3
    else if (partname === 'edge') {
        res.redirect('/shoe/shoemen/style1/middle')
    }
    // 4
    else if (partname === 'high_top') {
        res.redirect('/shoe/shoemen/style1/eyelet')
    }
    // 5
    else if (partname === 'middle') {
        res.redirect('/shoe/shoemen/style1/tongue')
    }
    // 6
    else if (partname === 'foot_front') {
        res.redirect('/shoe/shoemen/style1/edge')
    }
    // 7
    else if (partname === 'counter_lining') {
        res.redirect('/shoe/shoemen/style1/tongue2')
    }
    // 8
    else if (partname === 'eyelet') {
        res.redirect('/shoe/shoemen/style1/counter_lining')
    }
    // 9
    else if (partname === 'shoe_lace') {
        res.redirect('/shoe/shoemen/style1/pull_tab')
    }
    // 10
    else if (partname === 'tongue') {
        res.redirect('/shoe/shoemen/style1/attached_heel')
    }
    // 11
    else if (partname === 'pull_tab') {
        res.redirect('/shoe/shoemen/style1/bottom')
    }
    // 12
    else if (partname === 'tongue2') {
        res.redirect('shoe/shoemen/style1/shoe_lace')
    }

});

//get shoe style
router.get('/:shoe/:style/', function (req, res, next) {
    const { shoe, style } = req.params;

    if (shoe != null && style != null) {
        let session = req.session;
        session.detailShoe = {
            shoe: shoe,
            style: style
        }
        console.log(style)
        console.log(session)
        res.redirect('/shoe/choose_leather')
    }

})

router.get('/shoemen/style1/attached_heel', function (req, res, next) {
    const leather = req.session.detailShoe.leather
    res.render('shoeM/style1/attached_heel', { title: 'Shoe Men attached heel', userID: userID, leather: leather })
});
router.get('/shoemen/style1/bottom', function (req, res, next) {
    const leather = req.session.detailShoe.leather
    res.render('shoeM/style1/bottom', { title: 'Shoe Men bottom', userID: userID, leather: leather })
});
router.get('/shoemen/style1/edge', function (req, res, next) {
    const leather = req.session.detailShoe.leather
    res.render('shoeM/style1/edge', { title: 'Shoe Men edge', userID: userID, leather: leather })
});
router.get('/shoemen/style1/high_top', function (req, res, next) {
    const leather = req.session.detailShoe.leather
    res.render('shoeM/style1/high_top', { title: 'Shoe Men high top', userID: userID, leather: leather })
});
router.get('/shoemen/style1/middle', function (req, res, next) {
    const leather = req.session.detailShoe.leather
    res.render('shoeM/style1/middle', { title: 'Shoe Men middle', userID: userID, leather: leather })
});
router.get('/shoemen/style1/foot_front', function (req, res, next) {
    const leather = req.session.detailShoe.leather
    console.log(leather);
    res.render('shoeM/style1/foot_front', { title: 'Shoe Men Foot Front', userID: userID, leather: leather })
});
router.get('/shoemen/style1/counter_lining', function (req, res, next) {
    const leather = req.session.detailShoe.leather
    res.render('shoeM/style1/counter_lining', { title: 'Shoe Men Couter lining', userID: userID, leather: leather })
});
router.get('/shoemen/style1/eyelet', function (req, res, next) {
    const leather = req.session.detailShoe.leather
    res.render('shoeM/style1/eyelet', { title: 'Shoe Men Eyelet', userID: userID, leather: leather })
});
router.get('/shoemen/style1/pull_tap', function (req, res, next) {
    const leather = req.session.detailShoe.leather
    res.render('shoeM/style1/pull_tap', { title: 'Shoe Men Pull tap', userID: userID, leather: leather })
});
router.get('/shoemen/style1/shoe_lace', function (req, res, next) {
    const leather = req.session.detailShoe.leather
    res.render('shoeM/style1/shoe_lace', { title: 'Shoe Men Lace', userID: userID, leather: leather })
});
router.get('/shoemen/style1/tongue', function (req, res, next) {
    const leather = req.session.detailShoe.leather
    res.render('shoeM/style1/tongue', { title: 'Shoe Men Tongue', userID: userID, leather: leather })
});
//shoe men style2

//shoe women style1
//shoe women style2

//shoe childen style1
//shoe childen style2

//choose matirial
router.get('/choose_leather', function (req, res, next) {
    userID = req.session.user;
    res.render('choose_leather', { title: 'Choose Leather', userID: userID })
})

router.get('/save/choose_leather/:leather', function (req, res, next) {
    const { leather } = req.params
    let session = req.session;
    session.detailShoe.leather = leather
    const shoe = session.detailShoe.shoe
    const style = session.detailShoe.style
    console.log(session);
    res.redirect(`/shoe/${shoe}/${style}/foot_front`)
})
module.exports = router;