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
nCallBack.onInlineSearh = (inlineSearch) => {};
nCallBack.onCreateChat = (chat) => {};
nCallBack.onWorkflowDetails = (workflowCellDetails) => {};

client.connect(config.Token, nCallBack);
