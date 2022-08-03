import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");  // default: cwd() + /views
app.use(logger);
app.use(express.urlencoded({ extended: true }));  // express app이 form의 value를 이해할 수 있게 하고, JS object로 변형시켜줌

app.use(  // 브라우저에서 웹사이트를 방문할 때마다, 그 브라우저를 위한 세션 id를 생성해 브라우저에게 보낸다.
    session({
        secret: "hi",  // 세션 id 쿠키에 sign 하는 데 사용됨 ?
        resave: true,  // 요청하는 동안 세션이 세션 저장소에 다시 저장되도록 ?
        saveUninitialized: true,  // 초기화되지 않은 세션을 저장소에 강제 저장 ?
    })
);
// app.use((req, res, next) => {
//     console.log(req.headers);  // cookie 확인
//     next();
// });
app.use((req, res, next) => {
    req.sessionStore.all((error, sessions) => {
        console.log(sessions);  // 서버가 기억하고 있는 세션을 볼 수 있음
        next();
    });
});

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;