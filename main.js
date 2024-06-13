"use strict";
const NandBox = require("./src/NandBox");
const Nand = require("./src/NandBoxClient");
const NandBoxClient = Nand.NandBoxClient;

const Logger = require("./src/util/Logger");

const config = require("./config.json");

var client = NandBoxClient.get(config);
var nandbox = new NandBox();
var nCallBack = nandbox.Callback;
var api = null;

nCallBack.onConnect = (_api) => {
  // it will go here if the bot connected to the server successfuly
  api = _api;
  console.log("Authenticated");
  Logger.logger.info("Authenticated");
  // const ref = Math.floor(Math.random() * 10000000000000);
  // api.createChat("Group",0,"test",ref.toString());
  // api.setWorkflowAction("90089585528697919","scrn#1","scrn#2",Math.floor(Math.random()*10000000000000));
};

nCallBack.onReceive = (incomingMsg) => {
  console.log("Message Received", JSON.stringify(incomingMsg));
  Logger.logger.info("Message Received");

  if (incomingMsg.isTextMsg()) {
    let chatId = incomingMsg.chat.id; // get your chat Id
    let text = incomingMsg.text; // get your text message
    api.sendText(chatId, text); // Sending message back as an Echo
  }
};

// implement other nandbox.Callback() as per your bot need
nCallBack.onReceiveObj = (obj) => {
  console.log("received object: ", obj);
  Logger.logger.info("received object: " + JSON.stringify(obj));
};

nCallBack.onClose = () => {
  Logger.logger.info("ONCLOSE");
};
nCallBack.onError = () => {
  Logger.logger.error("ONERROR");
};
nCallBack.onChatMenuCallBack = (chatMenuCallback) => {
  console.log("Inside onChatMenuCallBack");
  //   console.log("chatMenuCallback: ", chatMenuCallback);
  const userId = chatMenuCallback.chat.id;
  console.log("userId: ", userId);
  const screenId = chatMenuCallback.menu_ref;
  console.log("screenId: ", screenId);
  const cellId = chatMenuCallback.button_callback;
  console.log("cellId: ", cellId);
  var buttons_data = chatMenuCallback.button_data;
  console.log("chatMenuCallback values: ", buttons_data);
  console.log(" type button_data: ", typeof buttons_data);
  let obj = {};
  obj.button_callback = "button20";
  obj.button_id = "";
  let random = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;
  obj.button_value = random + "testing JS implementation";
  obj.button_description = "testing JS implementation description";
  obj.button_db = 1;
  buttons_data.push(obj);
  console.log("buttons data values: ", buttons_data);
  api.sendCellText(
    userId,
    screenId,
    cellId,
    JSON.stringify(buttons_data),
    99555555220
  );
};
nCallBack.onInlineMessageCallback = (inlineMsgCallback) => {};
nCallBack.onMessagAckCallback = (msgAck) => {};
nCallBack.onUserJoinedBot = (user) => {};
nCallBack.onChatMember = (chatMember) => {};
nCallBack.onChatAdministrators = (chatAdministrators) => {};
nCallBack.userStartedBot = (user) => {};
nCallBack.onMyProfile = (user) => {};
nCallBack.onUserDetails = (user) => {};
nCallBack.userStoppedBot = (user) => {};
nCallBack.userLeftBot = (user) => {};
nCallBack.permanentUrl = (permenantUrl) => {};
nCallBack.onChatDetails = (chat) => {};
nCallBack.onInlineSearch = (inlineSearch) => {};
nCallBack.onCreateChat = (chat) => {};
nCallBack.onWorkflowDetails = (workflowCellDetails) => {
  console.log("workflowCellDetails: ", JSON.stringify(workflowCellDetails));
  const workflowCellObj = JSON.parse(JSON.stringify(workflowCellDetails));
  const workflowCell = workflowCellObj.workflowCell;
  const userId = workflowCellObj.user_id;
  const screenId = workflowCellObj.screen_id;
  const vappId = workflowCellObj.vapp_id;
  workflowCell.forEach((element) => {
    const value = JSON.parse(JSON.stringify(element.value));
    const v = value[0].option_id;
    if (v === "ID - 6mse3q6jd") {
      api.setWorkflowAction(
        userId,
        screenId,
        "menu3",
        vappId,
        Math.floor(Math.random() * 1000000000)
      );
    }
  });
};
client.connect(config.Token, nCallBack);
