const getIndexPage = (req, res) => {
    res.render('index', {
        page_name: 'home'
    });
}
const getAboutPage = (req, res) => {
    res.render('about', {
        page_name: 'about'
    });
}
const getContactPage = (req, res) => {
    res.render('contact', {
        page_name: "contact"
    });
}

const getRegisterPage = (req, res) => {
    res.render('register', {
        page_name: 'register'
    });
}
const getLoginPage = (req, res) => {
    res.render('login', {
        page_name: 'login'
    });
}


const getLogout = (req, res) => {
    res.cookie('jwt', " ", {
        maxAge: 1
    });
    res.redirect('/');
}
module.exports = {
    getIndexPage,
    getAboutPage,
    getContactPage,
    getRegisterPage,
    getLoginPage,
    getLogout
}