import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");  // default: cwd() + /views
app.use(logger);
app.use(express.urlencoded({ extended: true }));  // express app이 form의 value를 이해할 수 있게 하고, JS object로 변형시켜줌

app.use(  // session middleware, 웹사이트 방문 시 매번 그 브라우저를 위한 세션 id를 생성해 브라우저에게 보냄
    session({
        secret: "hi",
        resave: true,
        saveUninitialized: true,
    })
);
app.use((req, res, next) => {
    // console.log(res);  // res.locals object 발견
    req.sessionStore.all((error, sessions) => {
        console.log(sessions);
        next();
    });
});
app.use(localsMiddleware);

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;