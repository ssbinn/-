export const localsMiddleware = (req, res, next) => {
    console.log(req.session);  // session middleware 다음에 localMiddleware가 오기 때문에 가능한 것 (server.js)

    res.locals.siteName = "송글";
    // 유저의 로그인 상태 구분을 위한 변수 추가 예정 
    next();
}