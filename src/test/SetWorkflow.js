"use strict";
const Nand = require("../NandBoxClient");
const NandBoxClient = Nand.NandBoxClient;
const NandBox = require("../NandBox");
const WorkflowCell = require("../data/WorkflowCell");


const TOKEN = "90091783834098773:0:o8P0KrCJWttBRHsOBTMiNTZQ184Z2l"; // replace it with your token


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
        api.sendText(chatId, text); // Sending message back as an Echo
    }

}

// implement other nandbox.Callback() as per your bot need
nCallBack.onReceiveObj = obj => {
    console.log("received object: ", obj);
}

nCallBack.onClose = () => { }
nCallBack.onError = () => { }
nCallBack.onChatMenuCallBack = chatMenuCallback => { 
    const userId = chatMenuCallback.chat.id;
    const screenId = chatMenuCallback.menu_ref;
    const appId = chatMenuCallback.app_id;
    const btnCallback = chatMenuCallback.button_callback;
    console.log("APP ID:-" + appId + "\n" + "USER ID:-" + userId + "\n" + "SCREEN ID:-" + screenId + "\n" + "BUTTON CALLBACK:-" + btnCallback + "\n" )
    var cell = new WorkflowCell({
        cell_id: "button10",
        callback: "button10",
        label: "FROM JS SDK YAY",
        sublabel: "js sdk yay",
        bg_color: "#ff0000",
        label_color: "#ffffff",
        sublabel_color: "#ffffff"
    });

    var cells = [cell];
    api.setWorkflow(userId, screenId, appId, cells,123456789,false);

}
nCallBack.onInlineMessageCallback = inlineMsgCallback => { }
nCallBack.onMessagAckCallback = msgAck => { }
nCallBack.onUserJoinedBot = user => { }
nCallBack.onChatMember = chatMember => { }
nCallBack.onChatAdministrators = chatAdministrators => { }
nCallBack.userStartedBot = user => { }
nCallBack.onMyProfile = user => { }
nCallBack.onUserDetails = user => { }
nCallBack.userStoppedBot = user => { }
nCallBack.userLeftBot = user => { }
nCallBack.permanentUrl = permenantUrl => { }
nCallBack.onChatDetails = chat => { }
nCallBack.onInlineSearh = inlineSearch => { }
nCallBack.onBlackList = blackList => { }
nCallBack.onWhiteList = whiteList => { }

client.connect(TOKEN, nCallBack);