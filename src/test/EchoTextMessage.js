"use strict";
const Nand = require("../NandBoxClient");
const NandBoxClient = Nand.NandBoxClient;
const NandBox = require("../NandBox");


const TOKEN = "90091783968456064:0:6V7Tqy34IFv5ms0WHyHnzan83Hrsmn"; // replace it with your token


const config = {
    URI: "wss://d1.nandbox.net:5020/nandbox/api/",
    DownloadServer: "https://d1.nandbox.net:5020/nandbox/download/",
    UploadServer: "https://d1.nandbox.net:5020/nandbox/upload/"
}
var client = NandBoxClient.get(config);



var nandbox = new NandBox();
var nCallBack = nandbox.Callback;
var api = null;

nCallBack.onConnect = (_api) => {
    // it will go here if the bot connected to the server successfuly 

    api = _api;

    console.log("Authenticated");
   
}



nCallBack.onReceive = incomingMsg => {
    console.log("Message Received");

    if (incomingMsg.isTextMsg()) {
        let chatId = incomingMsg.chat.id; // get your chat Id
        let text = incomingMsg.text; // get your text message
        api.sendText(chatId,text,incomingMsg.appId);
    }

}
nCallBack.onWhiteListPattern = obj=>{
    console.log(obj);
    
}
nCallBack.onDeleteBlackList = obj =>{
    console.log(obj);
    
}
nCallBack.onProductDetail = obj =>{
    console.log(obj);
    
}
nCallBack.onDeleteWhiteList = obj =>{
    console.log(obj);
    
}
// implement other nandbox.Callback() as per your bot need
nCallBack.onReceiveObj = obj => {
    console.log("received object: ", obj);
}

nCallBack.onClose = () => { }
nCallBack.onError = () => { }
nCallBack.onChatMenuCallBack = chatMenuCallback => { }
nCallBack.onInlineMessageCallback = inlineMsgCallback => { }
nCallBack.onMessagAckCallback = msgAck => { }
nCallBack.onUserJoinedBot = user => { }
nCallBack.onChatMember = chatMember => { console.log(chatMember);
}
nCallBack.onBlackListPattern = obj => { console.log(obj);
}
nCallBack.onChatAdministrators = chatAdministrators => { console.log(chatAdministrators);
}
nCallBack.userStartedBot = user => { }
nCallBack.onMyProfile = user => {console.log(user);
 }
nCallBack.onUserDetails = user => {console.log(user);
 }
nCallBack.userStoppedBot = user => { }
nCallBack.userLeftBot = user => { }
nCallBack.permanentUrl = permenantUrl => { }
nCallBack.onChatDetails = chat => { 
    console.log(chat);
    
}
nCallBack.onInlineSearh = inlineSearch => { }
nCallBack.onBlackList = blackList => { console.log(blackList);
}
nCallBack.onWhiteList = whiteList => { console.log("hr"); console.log(whiteList);
}

client.connect(TOKEN, nCallBack);