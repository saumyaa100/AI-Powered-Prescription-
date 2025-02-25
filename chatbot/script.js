const msgInput=document.querySelector(".msg-input");
const chatBody=document.querySelector(".chat-body");
const sendMessageButton=document.querySelector("#send-msg");
const fileInput=document.querySelector("#file-input");
const fileUploadWrapper=document.querySelector(".file-upload-wrapper");


const API_KEY="AIzaSyD_c04Rq7s0INVOhFxb7WBF06jEPmlNeZA";
const API_URL=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
const userData={
    message:null,
    file:{
        data:null,
        mime_type:null
    }

}
const createMsgElement=(content,...classes)=>{
   const div=document.createElement("div");
   div.classList.add("message",...classes);
   div.innerHTML=content;
   return div;
}

const generateBotResponse=async(incomingMsgDiv)=>{
    const msgElement=incomingMsgDiv.querySelector(".message-text");
    const requestOptions={
        method:"POST",
        headers:{"Content-Type":" application/json"},
        body:JSON.stringify({
            contents:[{
                parts:[{text:userData.message},...(userData.file.data? [{inline_data:userData.file}]:[])]
            }]
        })

    }
try {
    const response= await fetch(API_URL,requestOptions);
    const data=await response.json();
    if(!response.ok)
        throw new Error(data.error.message);
    // console.log(data);

    const apiresponseText=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();

    msgElement.innerText=apiresponseText;
} catch (error) {
    console.log(error);
    msgElement.innerText=error.message;
    msgElement.style.color="#ff0000";
}
finally{
    userData.file={};
incomingMsgDiv.classList.remove("thinking");
chatBody.scrollTo({top:chatBody.scrollHeight,behaviour:"smooth"});

}
}


const handleOutgoingMsg=(e)=>{
    e.preventDefault();
userData.message=msgInput.value.trim();
msgInput.value="";

    const msgcontent=  `<div class="message-text"></div>
     ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />` :""}`;
 const outgoingMsgDiv=createMsgElement(msgcontent,"user-message");

outgoingMsgDiv.querySelector(".message-text").textContent=userData.message;

 chatBody.appendChild(outgoingMsgDiv);
 chatBody.scrollTo({top:chatBody.scrollHeight,behaviour:"smooth"});
 setTimeout(()=>{
    const msgcontent=  `  <span class="bot-avatar material-symbols-outlined">support_agent</span>
                <div class="message-text">
                   <div class="thinking-indicator">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                   </div>
                </div>`;
    const incomingMsgDiv=createMsgElement(msgcontent,"bot-message","thinking");
       chatBody.appendChild(incomingMsgDiv);
       chatBody.scrollTo({top:chatBody.scrollHeight,behaviour:"smooth"});

       generateBotResponse(incomingMsgDiv);
 },600);
}

msgInput.addEventListener("keydown",(e)=>{
    const userMsg=e.target.value.trim();
    if(e.key=== "Enter" && userMsg){
        // console.log(userMsg);
        handleOutgoingMsg(e);
    }
});
fileInput.addEventListener("change",()=>{
const file=fileInput.files[0];
if(!file)
    return ;
// console.log(file);
const reader=new FileReader();
reader.onload=(e)=>{
    fileUploadWrapper.querySelector("img").src=e.target.result;
    fileUploadWrapper.classList.add("file-uploaded");
const base64String=e.target.result.split(",")[1];


    userData.file={
        data:base64String,
        mime_type:file.type
    }
    // console.log(userData);
    fileInput.value="";
}
reader.readAsDataURL(file);
})
sendMessageButton.addEventListener("click",(e)=>handleOutgoingMsg(e));

document.querySelector("#file-upload").addEventListener("click",()=> fileInput.click());


