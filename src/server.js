import express from "express";  // node_modules/express

const PORT = 4000;

const app = express();

app.get("/", (req, res) => { return res.end(); }) // route, route handler(request object, response object)

const handleListening = () => console.log(`http://localhost:${PORT}`);

app.listen(PORT, handleListening); // port num, listening 성공 시 실행할 callback function