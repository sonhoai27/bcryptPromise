let express = require('express')
let router = express.Router()
let parser = require('body-parser').urlencoded({ extended: false })
const {DangNhap, queryDB} = require('./configDB/db.js')
router.get('/', (req, res) => {
    res.render('signup/index')
})

router.post('/',  parser, (req, res) => {
    const { Email, Password } = req.body;
    // console.log(username, password);
    // res.send('XONG');
    DangNhap(Email, Password)
	// .then(kq => console.log(kq))
	.then(kq =>{
		res.redirect('/')
		console.log("OK");
		})
	.catch(err => res.send(err))
});
module.exports = router
