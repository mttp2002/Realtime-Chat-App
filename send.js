const obj = {
    mID: document.querySelector("#my-id"),
    fID: document.querySelector("#f-id"),
    conBtn: document.querySelector("#conn"),
    msg: document.querySelector("#message"),
    send: document.querySelector("#send"),
    Cdisplay: document.querySelector(".chatBox"),
};

var conn = new Peer();
var Aconn = undefined;

conn.on("open", (id) =>{
    obj.mID.value = id;
});

conn.on("connection", (NAConn) => {
    if(Aconn != undefined) Aconn.close();
    obj.fID.value = NAConn.peer;
    Aconn = NAConn;
    Aconn.on("data", displayFriendMSG);
})

obj.conBtn.addEventListener("click", () => {
    if(obj.fID.value.length > 0) {
        if(Aconn != undefined) Aconn.close();
        Aconn = conn.connect(obj.fID.value);
        Aconn.on("data", displayFriendMSG);
    }
});

obj.send.addEventListener("click", () => {
    if(Aconn != undefined){
        if(obj.msg.value.length > 0) {
            sendData(obj.msg.value);
            displayMyMSG();
            obj.msg.value = "";
        }
    }
})

function displayMyMSG(){
    obj.Cdisplay.insertAdjacentHTML("beforeend", `
    <div class="message my_message">
        <div>
            <div class="content-my-message">
                <p>${obj.msg.value}</p>
            </div>
        </div>
    </div>
    `)
}

function displayFriendMSG(data){
    obj.Cdisplay.insertAdjacentHTML("beforeend", `
    <div class="message friend_message">
        <div>
            <div class="content-friend-message">
                <p>${data}</p>
            </div>
        </div>
    </div>
    `)
}

function sendData(data){
    if(Aconn != undefined){
        Aconn.send(data);
    }
}