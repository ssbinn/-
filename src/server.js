import express from "express";
import logger from "morgan"

const PORT = 4000;
const app = express();


const home = (req, res) => {
    return res.send("hi");
}

const login = (req, res) => {
    return res.send("login");
}

app.use(logger("dev"));
app.get("/", home);
app.get("/login", login);


const handleListening = () => console.log(`http://localhost:${PORT}`);

app.listen(PORT, handleListening);  // port num, listening 성공 시 실행할 callback function