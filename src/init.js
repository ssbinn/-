/* server.js에서 express와 관련된 server의 configuration에 관련된 코드만 처리하기 위해 분리 */

import "./db";  // db연결이 성공적일 때, model import하기위해서 제일 상단에 배치
import "./models/Video"
import app from "./server"

const PORT = 4000;

const handleListening = () => console.log(`http://localhost:${PORT}`);

app.listen(PORT, handleListening);