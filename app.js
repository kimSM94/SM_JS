const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app)
// nodemon 저장할때마다 자동으로 수정해줌

const socketIO = require("socket.io");

// 시간 불러오기위해
const moment = require("moment");

const io = socketIO(server);

//위치를 정호가히 지정해주는거라고 생각하면 된다.
app.use(express.static(path.join(__dirname, "src")));

// 지정된 포트를 사용하고 아니면 5000번 포트를 사용하겠다.
const PORT = process.env.PORT || 5000;

io.on("connection", (socket)=>{
         //console.log('연결이 됐다.')
         //socket.on("채팅아이디",())
         socket.on("chatting",(data)=>{
            const {name, msg} = data;
            io.emit("chatting",{
               name, //:name 생략,
               msg,
               time : moment(new Date()).format("h:ss A")
            })
         })
 })

// app.listen(포트,명령)
server.listen(PORT,() => console.log(`server is running ${PORT}`));