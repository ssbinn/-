import "./db";  // db연결이 성공적일 때, model을 import하기 위해 제일 상단에 배치
import "./models/Video"
import "./models/User"
import app from "./server"

const PORT = 4000;

const handleListening = () => console.log(`http://localhost:${PORT}`);

app.listen(PORT, handleListening);