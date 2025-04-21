const controllers = require('./controllers');
//const mid = require('./middleware'); //DomoMakerC

const router = (app) => {
    app.get('/login',/* mid.requiresSecure, mid.requiresLogout, //DomoMakerC*/ controllers.Account.loginPage);
    app.post('/login',/* mid.requiresSecure, mid.requiresLogout, //DomoMakerC*/ controllers.Account.login);

    app.get('/signup',/* mid.requiresSecure, mid.requiresLogout, //DomoMakerC*/ controllers.Account.signupPage);
    app.post('/signup',/* mid.requiresSecure, mid.requiresLogout, //DomoMakerC*/ controllers.Account.signup);

    app.get('/logout',/* mid.requiresLogin, //DomoMakerC*/ controllers.Account.logout);

    app.get('/maker',/* mid.requiresLogin, //DomoMakerC*/ controllers.Domo.makerPage);
    //app.post('/maker',/* mid.requiresLogin, //DomoMakerC*/ controllers.Domo.makeDomo); //DomoMakerB

    app.get('/',/* mid.requiresSecure, mid.requiresLogout, //DomoMakerC*/ controllers.Account.loginPage);
};

module.exports = router;