// 자바 스크립트 오류 최소화
"use strict"

const socket = io();

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

// 엔터키
chatInput.addEventListener("keypress", (event)=>{
    if(event.keyCode ===13){
        send()
        chatInput.value =""
    }
})

function send(){
    const param ={
        name : nickname.value,
        msg : chatInput.value
    };
    socket.emit("chatting", param);
}

sendButton.addEventListener("click", send)


// 채팅받을때
socket.on("chatting",(data)=>{
    const {name, msg, time} =data;
    const item = new LiModel(name, msg, time);
    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight)
})

function LiModel(name, msg, time){
    this.name= name;
    this.msg=msg;
    this.time = time;

    this.makeLi =()=>{
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received")
        const dom =`<span class="profile">
        <span class = "user">${this.name}</span>
        <img class ="image" src="https://placeimg.com/50/50/any" alt="any">
    </span>
    <span class ="message">${this.msg}</span>
    <span class = "time">${this.time}</span>`;
    li.innerHTML= dom;
    chatList.appendChild(li);
    }
}