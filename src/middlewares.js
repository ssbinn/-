export const localsMiddleware = (req, res, next) => {
    // console.log(req.session); 

    res.locals.siteName = "송글";
    res.locals.loggedIn = Boolean(req.session.loggedIn);  // 로그인 된 유저라면 true, 그렇지 않으면 false
    res.locals.loggedInUser = req.session.user;


    console.log(res.locals);

    next();
}