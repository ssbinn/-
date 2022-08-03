export const localsMiddleware = (req, res, next) => {
    // console.log(req.session);  // session middleware 다음에 localMiddleware가 오기 때문에 가능한 것 (server.js)

    res.locals.siteName = "송글";
    res.locals.loggedIn = Boolean(req.session.loggedIn);  // 로그인 된 유저라면 true, 그렇지 않으면 false
    res.locals.loggedInUser = req.session.user;


    console.log(res.locals);

    next();
}