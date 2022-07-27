import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");  // default: cwd() + /views
app.use(logger);
app.use(express.urlencoded({ extended: true }));  // express app이 form의 value를 이해할 수 있게 하고, JS object로 변형시켜줌

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;