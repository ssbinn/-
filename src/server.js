import express from "express";

const PORT = 4000;
const app = express();

const logger = (req, res, next) => {  // middleware
    console.log(`${req.method} ${req.url}`)
    next();
}

const privateMid = (req, res, next) => {
    const url = req.url;
    if (url === "/protected") {
        return res.send("<h1>Not Allowed<h1>");  // middleware가 controller가 된 예제, /protected 페이지로 가자 middleware가 프로세스를 중단시키고 메시지를 보냄 - handleHome이나 handleProtected로 실행이 지속되지 않음
    }
    console.log("Allowed")
    next(); // url이 /protected가 아니라면 다음 함수 호출
}

const handleHome = (req, res) => {  // finalware
    return res.end();
}

const handleProtected = (req, res) => {
    return res.send("private lounge.");
}

app.use(logger);  // logger middleware를 application 전체에 어떤 URL에서도 사용 가능하도록
app.use(privateMid);
app.get("/", handleHome);
app.get("/protected", handleProtected);


const handleListening = () => console.log(`http://localhost:${PORT}`);

app.listen(PORT, handleListening);  // port num, listening 성공 시 실행할 callback function