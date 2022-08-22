export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "송글";
    res.locals.loggedIn = Boolean(req.session.loggedIn);  // 로그인 된 유저라면 true, 그렇지 않으면 false
    res.locals.loggedInUser = req.session.user || {}; // req.session.user가 undefined 일 수 있기 때문에 빈 object 코드 추가 - view에서 loggedInUser에 접근하려 하는데 로그인되어 있지 않으면 생기는 에러 해결

    next();
}


// 로그인하지 않은 사용자가 "/users/edit" 같이 보호하려는 페이지에 접속을 시도하는 경우 등을 막기위해 필요 
export const loggedInOnlyMiddleware = (req, res, next) => {
    if (req.session.loggedIn === true) {
        next();  // user가 로그인되어 있다면 요청을 계속하게 함
    } else {
        return res.redirect("/");
    }
}


// 로그인 한 사용자가 "/login" 같은 페이지에 접속을 시도하는 경우 등을 막기위해 필요 
export const publicOnlyMiddleware = (req, res, next) => {
    if (req.session.loggedIn !== true) {
        next();
    } else {
        return res.redirect("/");
    }
}