const chatWindow = document.getElementById("chat-window");
const messageInput = document.getElementById("message-input");
// const messageTune = document.getElementById("message-tune");
const sendMessageButton = document.getElementById("send-message-btn");


const bc = new BroadcastChannel("channel_1");

function generateMessageTemplate(message, isFromSelf){
    const div = document.createElement("div");
    div.className = "message";
    if(isFromSelf) div.className = "message from-self";
    const p = document.createElement("p");
    p.innerText = message;
    div.append(p);
    return div;
}

function sendMessage(){
    const messageTune = document.getElementById("message-tune");
    const message = messageInput.value;
    if(!message.trim().length){
        messageInput.classList.add("error");
        messageInput.addEventListener("animationend", function(){
            messageInput.classList.remove("error");
        }, {once: true})
        return;
    }
    bc.postMessage(message);
    const template = generateMessageTemplate(message, true);
    chatWindow.append(template);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    messageInput.value = "";
    messageTune.play();
}

sendMessageButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", function(e){
    if(e.code == "Enter"){
        sendMessage();
    }
});


bc.onmessage = (event) => {
    console.log(event);
    const messageTune = document.getElementById("message-tune");
    const template = generateMessageTemplate(event.data, false);
    chatWindow.append(template);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    messageTune.play();
};

// var bc = new BroadcastChannel('gator_channel');

// (()=>{
//   const title = document.getElementById('title');
//   const nameField = document.getElementById('name-field');
//   const setTitle = (userName) => {
//     title.innerHTML = 'Hey ' + userName;
//   }

//   bc.onmessage = (messageEvent) => {
//     console.log(messageEvent)
//     // If our broadcast message is 'update_title' then get the new title from localStorage
//     if (messageEvent.data === 'update_title') {
//       // localStorage is domain specific so when it changes in one window it changes in the other
//       setTitle(localStorage.getItem('title'));
//     }
//   }

//   // When the page loads check if the title is in our localStorage
//   if (localStorage.getItem('title')) {
//     setTitle(localStorage.getItem('title'));
//   } else {
//     setTitle('please tell us your name');
//   }

//   nameField.onchange = (e) => {
//     const inputValue = e.target.value;
//     // In the localStorage we set title to the user's input
//     localStorage.setItem('title', inputValue);
//     // Update the title on the current page 
//     setTitle(inputValue);
//     // Tell the other pages to update the title
//     bc.postMessage('update_title');
//   }
// })()

console.log("Script is running");