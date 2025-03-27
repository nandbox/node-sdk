"use strict";
require("@babel/polyfill");
const NandBox = require("./NandBox");
const User = require("./data/User");
const Chat = require("./data/Chat");
const ChatMenuCallback = require("./inmessages/ChatMenuCallback");
const ChatAdministrators = require("./inmessages/ChatAdministrators");
const PermanentUrl = require("./inmessages/PermanentUrl");
const InlineMessageCallback = require("./inmessages/InlineMessageCallback");
const InlineSearch = require("./inmessages/InlineSearch");
const ChatMember = require("./inmessages/ChatMember");
const TextOutMessage = require("./outmessages/TextOutMessage");
const PhotoOutMessage = require("./outmessages/PhotoOutMessage");
const ContactOutMessage = require("./outmessages/ContactOutMessage");
const AudioOutMessage = require("./outmessages/AudioOutMessage");
const VoiceOutMessage = require("./outmessages/VoiceOutMessage");
const VideoOutMessage = require("./outmessages/VideoOutMessage");
const TextCellOutMessage = require("./outmessages/cell/TextCellOutMessage");
const PhotoCellOutMessage = require("./outmessages/cell/PhotoCellOutMessage");
const VideoCellOutMessage = require("./outmessages/cell/VideoCellOutMessage");
const DocumentOutMessage = require("./outmessages/DocumentOutMessage");
const LocationOutMessage = require("./outmessages/LocationOutMessage");
const UpdateOutMessage = require("./outmessages/UpdateOutMessage");
const GetChatMemberOutMessage = require("./outmessages/GetChatMemberOutMessage");
const AddChatMemberOutMessage = require("./outmessages/AddChatMemberOutMessage");
const AddChatAdminMemberOutMessage = require("./outmessages/AddChatAdminMemberOutMessage");
const GetUserOutMessage = require("./outmessages/GetUserOutMessage");
const GetChatOutMessage = require("./outmessages/GetChatOutMessage");
const GetChatAdministratorsOutMessage = require("./outmessages/GetChatAdministratorsOutMessage");
const BanChatMemberOutMessage = require("./outmessages/BanChatMemberOutMessage");
const UnbanChatMember = require("./outmessages/UnbanChatMember");
const RemoveChatMemberOutMessage = require("./outmessages/RemoveChatMemberOutMessage");
const RecallOutMessage = require("./outmessages/RecallOutMessage");
const SetMyProfileOutMessage = require("./outmessages/SetMyProfileOutMessage");
const SetChatOutMessage = require("./outmessages/SetChatOutMessage");
const GetMyProfiles = require("./outmessages/GetMyProfiles");
const GeneratePermanentUrl = require("./outmessages/GeneratePermanentUrl");
const SetWorkflowOutMessage = require("./outmessages/SetWorkflowOutMessage");
const SetWorkflowActionOutMessage = require("./outmessages/SetWorkflowActionOutMessage");
const Utils = require("./util/Utility");
const Id = Utils.Id;
const Data = require("./data/Data");
const WhiteListUser = require("./data/WhiteListUser");
const BlackList = require("./inmessages/BlackList");
const WhiteList = require("./inmessages/WhiteList");
const AddBlackListOutMessage = require("./outmessages/AddBlackListOutMessage");
const AddBlackListPatternsOutMessage = require("./outmessages/AddBlackListPatternsOutMessage");
const AddWhiteListOutMessage = require("./outmessages/AddWhiteListOutMessage");
const AddWhiteListPatternsOutMessage = require("./outmessages/AddWhiteListPatternsOutMessage");
const DeleteBlackListOutMessage = require("./outmessages/DeleteBlackListOutMessage");
const DeleteBlackListPatternsOutMessage = require("./outmessages/DeleteBlackListPatternsOutMessage");
const DeleteWhiteListOutMessage = require("./outmessages/DeleteWhiteListOutMessage");
const DeleteWhiteListPatternsOutMessage = require("./outmessages/DeleteWhiteListPatternsOutMessage");
const GetBlackListOutMessage = require("./outmessages/GetBlackListOutMessage");
const GetWhiteListOutMessage = require("./outmessages/GetWhiteListOutMessage");
const IncomingMessage = require("./inmessages/IncomingMessage");
const MessageAck = require("./inmessages/MessageAck");
const WebSocket = require("ws");
const Logger = require("./util/Logger");
const process = require("process");
const WorkflowDetails = require("./inmessages/workflowDetails");
const CreateChatOutMessage = require("./outmessages/CreateChatOutMessage");
const ProductItem = require("./data/ProductItem");
const GetProductItemOutMessage = require("./outmessages/GetProductItemOutMessage");
const GetProductItemResponse = require("./inmessages/GetProductItemResponse");
const CollectionProduct = require("./data/CollectionProduct");
const ListCollectionItemOutMessage = require("./outmessages/ListCollectionItemOutMessage");
const ListCollectionItemResponse = require("./inmessages/ListCollectionItemResponse");
const GetCollectionProductResponse = require("./inmessages/GetCollectionProductResponse");
const GetCollectionProductOutMessage = require("./outmessages/GetCollectionProductOutMessage");
const AddWhitelistPatternsOutMessage = require("./outmessages/AddWhiteListPatternsOutMessage");
const AddBlacklistPatternsOutMessage = require("./outmessages/AddBlackListPatternsOutMessage");
const WhiteList_ak = require("./inmessages/WhiteList_ak");
const BlackListPattern = require("./inmessages/Pattern");
const Pattern = require("./inmessages/Pattern");

var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

var nandboxClient = null;
var BOT_ID = null;
let uri = null;
let closingCounter = 0;
class NandBoxClient {
  constructor(URI) {
    uri = URI;
    this.session = null;
  }

  static get(config) {
    if (!nandboxClient) {
      init(config);
    }
    return nandboxClient;
  }

  connect(token, callback) {
    this.callback = callback;
    this.session = new InternalWebSocket(uri, token, callback);
    this.session.setWSCallbacks();
  }
}

let tNandBox = new NandBox();
let api = tNandBox.Api;

class InternalWebSocket {
  constructor(uri, token, callback) {
    this.ws = new WebSocket(uri);
    this.uri = uri;
    this.authenticated = false;
    this.token = token;
    this.callback = callback;
    this.NO_OF_RETRIES_IF_CONN_CLOSED = 30;
    this.on = {
      close: async (status) => {
        Logger.logger.info("INTERNAL: ONCLOSE");
        Logger.logger.info("StatusCode = " + status.code);
        Logger.logger.info("Reason : " + status.reason);
        Logger.logger.info("Status: " + JSON.stringify(status));

        let current_datetime = new Date();
        let formatted_date =
          current_datetime.getFullYear() +
          "/" +
          (current_datetime.getMonth() + 1) +
          "/" +
          current_datetime.getDate() +
          " " +
          current_datetime.getHours() +
          ":" +
          current_datetime.getMinutes() +
          ":" +
          current_datetime.getSeconds();

        Logger.logger.info(formatted_date);

        this.authenticated = false;

        clearInterval(this.pingpongvar);

        this.callback.onClose();

        if (
          (status.code == 1000 ||
            status.code == 1006 ||
            status.code == 1001 ||
            status.code == 1005) &&
          closingCounter < this.NO_OF_RETRIES_IF_CONN_CLOSED
        ) {
          try {
            console.log("Please wait 30 seconds for Reconnecting ");
            Logger.logger.info("Please wait 30 seconds for Reconnecting");
            await sleep(30000);

            closingCounter++;
            Logger.logger.info(
              "Conenction Closing counter is: " + closingCounter
            );
          } catch (e1) {
            Logger.logger.error(e1);
          }

          this.stopWebSocketClient();
          try {
            this.reconnectWebSocketClient();
          } catch (e) {
            Logger.logger.error(e);
          }
        } else {
          Logger.logger.info("End nandbox client");
          process.exit(0);
        }
      },
      open: () => {
        Logger.logger.info("INTERNAL: ONCONNECT");

        let authObject = {};
        authObject.method = "TOKEN_AUTH";
        authObject.token = this.token;
        authObject.rem = true;
        let strAuthObj = JSON.stringify(authObject);

        this.pingpong();

        Logger.logger.info(strAuthObj);
        this.send(strAuthObj);
        setApiMethods(this, api);
      },
      error: (error) => {
        Logger.logger.error("ONERROR: " + JSON.stringify(error));
        console.log("ONERROR: " + JSON.stringify(error));

      },
      message: (msg) => {
        //reset pinging
        clearInterval(this.pingpongvar);
        this.pingpong();

        let user;
        this.lastMessage = new Date().getUTCMilliseconds();
        Logger.logger.info("INTERNAL: ONMESSAGE");
        let obj = msg.data;
        Logger.logger.info(new Date() + " >>>>>>>>> Update Obj : " + obj);
        obj = JSON.parse(obj);
        let method = obj.method;
        Logger.logger.info(JSON.stringify(obj));
        if (method) {
          Logger.logger.info("method: " + method);
          console.log("method: " + method);
          switch (method) {
            case "TOKEN_AUTH_OK":
              Logger.logger.info("authenticated!");
              console.log("authenticated!");
              this.authenticated = true;
              BOT_ID = obj.ID;
              Logger.logger.info("====> Your Bot Id is : " + BOT_ID);
              Logger.logger.info("====> Your Bot Name is : " + obj.name);
              console.log("====> Your Bot Id is : " + BOT_ID);
              console.log("====> Your Bot Name is : " + obj.name);

              this.callback.onConnect(api, obj);

              return;
            case "message":
              let incomingMessage = new IncomingMessage(obj);
              this.callback.onReceive(incomingMessage);
              return;
            case "chatMenuCallback":
              let chatMenuCallback = new ChatMenuCallback(obj);
              this.callback.onChatMenuCallBack(chatMenuCallback);
              return;
            case "inlineMessageCallback":
              let inlineMsgCallback = new InlineMessageCallback(obj);
              this.callback.onInlineMessageCallback(inlineMsgCallback);
              return;
            case "inlineSearch":
              let inlineSearch = new InlineSearch(obj);
              this.callback.onInlineSearch(inlineSearch);
              return;
            case "messageAck":
              let msgAck = new MessageAck(obj);
              this.callback.onMessagAckCallback(msgAck);
              return;
            case "userJoinedBot":
              user = new User(obj.user);
              this.callback.onUserJoinedBot(user);
              return;
            case "chatMember":
              let chatMember = new ChatMember(obj);
              this.callback.onChatMember(chatMember);
              return;
            case "createChatAck":
              let chatObject = new Chat(obj.chat);
              chatObject.reference = obj.reference;
              this.callback.onCreateChat(chatObject);
              return;
            case "myProfile":
              user = new User(obj.user);
              this.callback.onMyProfile(user);
              return;
            case "userDetails":
              user = new User(obj.user);
              this.callback.onUserDetails(user);
              return;
            case "chatDetails":
              let chat = new Chat(obj.chat);
              this.callback.onChatDetails(chat);
              return;
            case 'getProductItemResponse':
              let productItem = new ProductItem(obj);
              this.callback.onProductDetail(productItem);
              return;
            case "listCollectionItemResponse":

              let listProductItemResponse = new ListCollectionItemResponse(obj);

              this.callback.listCollectionItemResponse(listProductItemResponse.Categories);
            case 'getCollectionProductResponse':
              let collectionProduct = new GetCollectionProductResponse(obj.data);
              this.callback.onCollectionProduct(collectionProduct.collectionProducts);
              return;
            case "chatAdministrators":
              let chatAdministrators = new ChatAdministrators(obj);
              this.callback.onChatAdministrators(chatAdministrators);
              return;
            case "userStartedBot":
              user = new User(obj.user);
              this.callback.userStartedBot(user);
              return;
            case "userStoppedBot":
              user = new User(obj.user);
              this.callback.userStoppedBot(user);
              return;
            case "userLeftBot":
              user = new User(obj.user);
              this.callback.userLeftBot(user);
              return;
            case "userLeftBot":
              let permenantURL = new PermanentUrl(obj);
              this.callback.permanentUrl(permenantURL);
              return;
            case "addBlacklistPatterns_ack":
              let blackListPattern = new Pattern(obj);
              this.callback.onBlackListPattern(blackListPattern);
              return;
            case "addWhitelistPatterns_ack":
              let whiteListPattern = new Pattern(obj);
              this.callback.onWhiteListPattern(whiteListPattern);
              return;
            case "removeFromBlacklist_ack":
              let BlackListAk = new WhiteList_ak(obj);
              this.callback.onDeleteBlackList(BlackListAk);
              return;
            case "addToBlacklist_ack":
            case "getBlacklistUsersResponse":
            case "blacklist":
              let blackList = new BlackList(obj);
              this.callback.onBlackList(blackList);
              return;
            case "removeFromWhitelist_ack":
              let whiteListAk = new WhiteList_ak(obj);
              this.callback.onDeleteWhiteList(whiteListAk);
              return;
            case "addToWhitelist_ack":
            case "whitelist":
            case "getWhitelistUsersResponse":
              let whiteList = new WhiteList(obj);
              this.callback.onWhiteList(whiteList);
              return;
            case "workflowCell":
              let workflowDetails = new WorkflowDetails(obj);
              this.callback.onWorkflowDetails(workflowDetails);
              return;
            default:
              this.callback.onReceiveObj(JSON.stringify(obj));
              return;
          }
        } else {
          let error = obj.error;
          Logger.logger.error("Error: " + error);
          console.log("Error: " + error);

        }
      },
    };
  }

  pingpong() {
    this.pingpongvar = setInterval(() => {
      let obj = {};
      obj.method = "PING";
      let ping = JSON.stringify(obj);
      Logger.logger.info(ping);
      console.log(ping);
      this.send(ping);
    }, 30000);
  }

  reconnectWebSocketClient() {
    Logger.logger.info("Creating new webSocketClient");
    this.ws = new WebSocket(this.uri);
    this.setWSCallbacks();
    this.pingpong();
    Logger.logger.info("webSocketClient started");
  }

  sendAuthToken(token) {
    let authObject = {};
    authObject.method = "TOKEN_AUTH";
    authObject.token = token;
    authObject.rem = true;
    let strAuthObj = JSON.stringify(authObject);
    Logger.logger.info(strAuthObj);
    this.send(strAuthObj);
  }
  send(s) {
    try {
      if (this.ws) {
        console.log(s);

        this.ws.send(s);
      }
    } catch (e) {
      Logger.logger.error(new Error().stack);
      Logger.logger.error(e);
    }
  }

  stopWebSocketClient() {
    Logger.logger.info("Stopping Websocket");
    try {
      this.ws.close();
    } catch (e) {
      Logger.logger.error("Exception: " + e + " while closing websocket");
    }
  }

  setWSCallbacks() {
    this.ws.onopen = () => {
      this.on.open();
    };
    this.ws.onclose = (status) => {
      this.on.close(status);
    };

    this.ws.onerror = (error) => {
      this.on.error(error);
    };

    this.ws.onmessage = (msg) => {
      this.on.message(msg);
    };
  }
}

let init = (config) => {
  if (nandboxClient) return;
  nandboxClient = new NandBoxClient(config.URI);
};

function setApiMethods(internalWS, api) {
  api.send = (message) => {
    Logger.logger.info(new Date() + ">>>>>> Sending Message :" + message);
    internalWS.send(message);
  };

  api.prepareOutMessage = (
    message,
    chatId,
    reference,
    replyToMessageId,
    toUserId,
    webPagePreview,
    disableNotification,
    caption,
    chatSettings,
    tab,
    appId
  ) => {
    message.chat_id = chatId;
    message.reference = reference;

    if (toUserId) message.to_user_id = toUserId;
    if (replyToMessageId) message.reply_to_message_id = replyToMessageId;
    if (webPagePreview) message.web_page_preview = webPagePreview;
    if (disableNotification) message.disable_notification = disableNotification;
    if (caption) message.caption = caption;
    if (chatSettings) message.chat_settings = chatSettings;
    if (tab) message.tab = tab;
    if (appId) message.app_id = appId;
  };

  api.sendText = (
    chatId,
    text,
    reference,
    replyToMessageId,
    toUserId,
    webPagePreview,
    disableNotification,
    chatSettings,
    bgColor,
    tab,
    appId
  ) => {
    if (
      chatId &&
      text &&
      !reference &&
      !replyToMessageId &&
      !toUserId &&
      !webPagePreview &&
      !disableNotification &&
      !chatSettings &&
      !bgColor &&
      !tab
    ) {
      const reference = Id();

      api.sendText(
        chatId,
        text,
        reference,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        appId
      );
      return reference;
    } else if (
      chatId &&
      text &&
      reference &&
      !bgColor &&
      !replyToMessageId &&
      !toUserId &&
      !webPagePreview &&
      !disableNotification &&
      !chatSettings &&
      !tab
    ) {
      let message = new TextOutMessage();
      api.prepareOutMessage(
        message,
        chatId,
        reference,
        replyToMessageId,
        toUserId,
        webPagePreview,
        disableNotification,
        null,
        chatSettings,
        tab,
        appId
      );
      message.method = "sendMessage";
      message.text = text;
      message.reference = reference;
      api.send(JSON.stringify(message.toJsonObject()));
    } else {
      let message = new TextOutMessage();
      api.prepareOutMessage(
        message,
        chatId,
        reference,
        replyToMessageId,
        toUserId,
        webPagePreview,
        disableNotification,
        null,
        chatSettings,
        tab,
        appId
      );
      message.method = "sendMessage";
      message.text = text;
      message.bg_color = bgColor;
      api.send(JSON.stringify(message.toJsonObject()));
    }
  };

  api.sendTextWithBackground = (chatId, text, bgColor, appId) => {
    const reference = Id();
    api.sendText(
      chatId,
      text,
      reference,
      null,
      null,
      null,
      null,
      null,
      bgColor,
      null,
      appId
    );
    return reference;
  };

  api.sendPhoto = (
    chatId,
    photoFileId,
    reference,
    replyToMessageId,
    toUserId,
    webPagePreview,
    disableNotification,
    caption,
    chatSettings,
    tab,
    appId
  ) => {
    if (
      chatId &&
      photoFileId &&
      caption &&
      !reference &&
      !replyToMessageId &&
      !toUserId &&
      !webPagePreview &&
      !disableNotification &&
      !chatSettings &&
      !tab
    ) {
      const reference = Id();
      api.sendPhoto(
        chatId,
        photoFileId,
        reference,
        null,
        null,
        null,
        null,
        caption,
        null,
        null,
        appId
      );
    } else {
      let message = new PhotoOutMessage();
      api.prepareOutMessage(
        message,
        chatId,
        reference,
        replyToMessageId,
        toUserId,
        webPagePreview,
        disableNotification,
        caption,
        chatSettings,
        tab,
        appId
      );
      message.method = "sendPhoto";
      message.photo = photoFileId;
      message.reference = reference;
      api.send(JSON.stringify(message.toJsonObject()));
    }
  };

  api.sendContact = (
    chatId,
    phoneNumber,
    name,
    reference,
    replyToMessageId,
    toUserId,
    webPagePreview,
    disableNotification,
    chatSettings,
    tab,
    appId
  ) => {
    if (
      chatId &&
      phoneNumber &&
      name &&
      !reference &&
      !replyToMessageId &&
      !toUserId &&
      !webPagePreview &&
      !disableNotification &&
      !chatSettings &&
      !tab
    ) {
      const reference = Id();
      api.sendContact(
        chatId,
        phoneNumber,
        name,
        reference,
        null,
        null,
        null,
        null,
        null,
        null,
        appId
      );
    } else {
      let contactOutMessage = new ContactOutMessage();
      api.prepareOutMessage(
        contactOutMessage,
        chatId,
        reference,
        replyToMessageId,
        toUserId,
        webPagePreview,
        disableNotification,
        null,
        chatSettings,
        tab,
        appId
      );

      contactOutMessage.method = "sendContact";
      contactOutMessage.phone_number = phoneNumber;
      contactOutMessage.name = name;
      contactOutMessage.reference = reference;
      api.send(JSON.stringify(contactOutMessage.toJsonObject()));
    }
  };

  api.sendVideo = (
    chatId,
    videoFileId,
    reference,
    replyToMessageId,
    toUserId,
    webPagePreview,
    disableNotification,
    caption,
    chatSettings,
    tab,
    appId
  ) => {
    if (
      chatId &&
      videoFileId &&
      caption &&
      !reference &&
      !replyToMessageId &&
      !toUserId &&
      !webPagePreview &&
      !disableNotification &&
      !chatSettings &&
      !tab
    ) {
      const reference = Id();
      api.sendVideo(
        chatId,
        videoFileId,
        reference,
        null,
        null,
        null,
        null,
        caption,
        null,
        null,
        appId
      );
    } else {
      let message = new VideoOutMessage();
      api.prepareOutMessage(
        message,
        chatId,
        reference,
        replyToMessageId,
        toUserId,
        webPagePreview,
        disableNotification,
        caption,
        chatSettings,
        tab,
        appId
      );
      message.method = "sendVideo";
      message.video = videoFileId;
      message.reference = reference;
      api.send(JSON.stringify(message.toJsonObject()));
    }
  };

  api.sendAudio = (
    chatId,
    audioFileId,
    reference,
    replyToMessageId,
    toUserId,
    webPagePreview,
    disableNotification,
    caption,
    performer,
    title,
    chatSettings,
    tab,
    appId
  ) => {
    if (
      chatId &&
      audioFileId &&
      caption &&
      !reference &&
      !replyToMessageId &&
      !toUserId &&
      !webPagePreview &&
      !disableNotification &&
      !performer &&
      !title &&
      !chatSettings &&
      !tab
    ) {
      const reference = Id();
      api.sendAudio(
        chatId,
        audioFileId,
        reference,
        null,
        null,
        null,
        null,
        caption,
        null,
        null,
        null,
        null,
        appId
      );
    } else {
      let message = new AudioOutMessage();
      api.prepareOutMessage(
        message,
        chatId,
        reference,
        replyToMessageId,
        toUserId,
        webPagePreview,
        disableNotification,
        caption,
        chatSettings,
        tab,
        appId
      );
      message.method = "sendAudio";
      message.performer = performer;
      message.title = title;
      message.audio = audioFileId;
      message.reference = reference;
      api.send(JSON.stringify(message.toJsonObject()));
    }
  };

  api.sendVoice = (
    chatId,
    voiceFileId,
    reference,
    replyToMessageId,
    toUserId,
    webPagePreview,
    disableNotification,
    caption,
    size,
    chatSettings,
    tab,
    appId
  ) => {
    if (
      chatId &&
      voiceFileId &&
      caption &&
      !reference &&
      !replyToMessageId &&
      !toUserId &&
      !webPagePreview &&
      !disableNotification &&
      !size &&
      !chatSettings &&
      !tab
    ) {
      const reference = Id();
      api.sendVoice(
        chatId,
        voiceFileId,
        reference,
        null,
        null,
        null,
        null,
        caption,
        null,
        null,
        null,
        appId
      );
    } else {
      let message = new VoiceOutMessage();
      api.prepareOutMessage(
        message,
        chatId,
        reference,
        replyToMessageId,
        toUserId,
        webPagePreview,
        disableNotification,
        caption,
        chatSettings,
        tab,
        appId
      );
      message.method = "sendVoice";
      message.size = size;
      message.voice = voiceFileId;
      message.reference = reference;
      api.send(JSON.stringify(message.toJsonObject()));
    }
  };

  api.sendDocument = (
    chatId,
    documentFileId,
    reference,
    replyToMessageId,
    toUserId,
    webPagePreview,
    disableNotification,
    caption,
    name,
    size,
    chatSettings,
    tab,
    appId
  ) => {
    if (
      chatId &&
      documentFileId &&
      caption &&
      !reference &&
      !replyToMessageId &&
      !toUserId &&
      !webPagePreview &&
      !disableNotification &&
      !name &&
      !size &&
      !chatSettings &&
      !tab
    ) {
      const reference = Id();
      api.sendDocument(
        chatId,
        documentFileId,
        reference,
        null,
        null,
        null,
        null,
        caption,
        null,
        null,
        null,
        null,
        appId
      );
    } else {
      let message = new DocumentOutMessage();
      api.prepareOutMessage(
        message,
        chatId,
        reference,
        replyToMessageId,
        toUserId,
        webPagePreview,
        disableNotification,
        caption,
        chatSettings,
        tab,
        appId
      );
      message.method = "sendDocument";
      message.document = documentFileId;
      message.name = name;
      message.size = size;
      message.reference = reference;
      api.send(JSON.stringify(message.toJsonObject()));
    }
  };

  api.sendlocation = (
    chatId,
    latitude,
    longitude,
    reference,
    replyToMessageId,
    toUserId,
    webPagePreview,
    disableNotification,
    name,
    details,
    chatSettings,
    tab,
    appId
  ) => {
    if (
      chatId &&
      latitude &&
      longitude &&
      !reference &&
      !replyToMessageId &&
      !toUserId &&
      !webPagePreview &&
      !disableNotification &&
      !name &&
      !details &&
      !chatSettings &&
      !tab
    ) {
      const reference = Id();
      api.sendlocation(
        chatId,
        latitude,
        longitude,
        reference,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        appId
      );
    } else {
      let message = new LocationOutMessage();
      api.prepareOutMessage(
        message,
        chatId,
        reference,
        replyToMessageId,
        toUserId,
        webPagePreview,
        disableNotification,
        null,
        chatSettings,
        tab,
        appId
      );
      message.method = "sendLocation";
      message.name = name;
      message.details = details;
      message.reference = reference;
      api.send(JSON.stringify(message.toJsonObject()));
    }
  };

  api.sendGIF = (
    chatId,
    gif,
    reference,
    replyToMessageId,
    toUserId,
    webPagePreview,
    disableNotification,
    caption,
    chatSettings,
    tab,
    appId
  ) => {
    if (
      chatId &&
      gif &&
      caption &&
      !reference &&
      !replyToMessageId &&
      !toUserId &&
      !webPagePreview &&
      !disableNotification &&
      !chatSettings &&
      !tab
    ) {
      const reference = Id();
      api.sendPhoto(
        chatId,
        gif,
        reference,
        null,
        null,
        null,
        null,
        caption,
        null,
        null,
        appId
      );
    } else {
      let message = new PhotoOutMessage();
      api.prepareOutMessage(
        message,
        chatId,
        reference,
        replyToMessageId,
        toUserId,
        webPagePreview,
        disableNotification,
        caption,
        chatSettings,
        tab,
        appId
      );
      message.method = "sendPhoto";
      message.photo = gif;
      message.reference = reference;
      api.send(JSON.stringify(message.toJsonObject()));
    }
  };

  api.sendGIFVideo = (
    chatId,
    gif,
    reference,
    replyToMessageId,
    toUserId,
    webPagePreview,
    disableNotification,
    caption,
    chatSettings,
    tab,
    appId
  ) => {
    if (
      chatId &&
      gif &&
      caption &&
      !reference &&
      !replyToMessageId &&
      !toUserId &&
      !webPagePreview &&
      !disableNotification &&
      !chatSettings &&
      !tab
    ) {
      api.sendVideo(
        chatId,
        gif,
        reference,
        null,
        null,
        null,
        null,
        caption,
        null,
        null,
        appId
      );
    } else {
      let message = new VideoOutMessage();
      api.prepareOutMessage(
        message,
        chatId,
        reference,
        replyToMessageId,
        toUserId,
        webPagePreview,
        disableNotification,
        caption,
        chatSettings,
        tab,
        appId
      );
      message.method = "sendVideo";
      message.video = gif;
      message.reference = reference;
      api.send(JSON.stringify(message.toJsonObject()));
    }
  };

  api.updateMessage = (messageId, text, caption, toUserId, chatId, tab, appId) => {
    let updateMessage = new UpdateOutMessage();

    updateMessage.message_id = messageId;
    updateMessage.text = text;
    updateMessage.caption = caption;
    updateMessage.toUser_id = toUserId;
    updateMessage.chat_id = chatId;
    updateMessage.tab = tab;
    updateMessage.appId = appId

    api.send(JSON.stringify(updateMessage.toJsonObject()));
  };

  api.updateTextMsg = (messageId, text, toUserId, tab, appId) => {
    updateMessage(messageId, text, null, toUserId, null, tab, appId);
  };

  api.updateMediaCaption = (messageId, caption, toUserId, tab, appId) => {
    updateMessage(messageId, null, caption, toUserId, null, tab, appId);
  };

  api.updateChatMsg = (messageId, text, chatId, tab, appId) => {
    updateMessage(messageId, text, null, null, chatId, tab, appId);
  };

  api.updateChatMediaCaption = (messageId, caption, chatId, appId) => {
    updateMessage(messageId, null, caption, null, chatId, appId);
  };

  api.getChatMember = (chatId, userId, appId, reference) => {
    let getChatMemberOutMessage = new GetChatMemberOutMessage();
    getChatMemberOutMessage.chat_id = chatId;
    getChatMemberOutMessage.user_id = userId;
    getChatMemberOutMessage.appId = appId
    getChatMemberOutMessage.reference = reference;
    api.send(JSON.stringify(getChatMemberOutMessage.toJsonObject()));
  };

  api.addChatMember = (chatId, userId, appId) => {
    let addChatMemberOutMessage = new AddChatMemberOutMessage();
    addChatMemberOutMessage.chat_id = chatId;
    addChatMemberOutMessage.user_id = userId;
    addChatMemberOutMessage.appId = appId
    api.send(JSON.stringify(addChatMemberOutMessage.toJsonObject()));
  };

  api.addChatAdminMember = (chatId, userId, appId) => {
    let addChatAdminMemberOutMessage = new AddChatAdminMemberOutMessage();
    addChatAdminMemberOutMessage.chat_id = chatId;
    addChatAdminMemberOutMessage.user_id = userId;
    addChatAdminMemberOutMessage.appId = appId;
    api.send(JSON.stringify(addChatAdminMemberOutMessage.toJsonObject()));
  };

  api.getUser = (userId, appId, reference) => {
    let getUserOutMessage = new GetUserOutMessage();
    getUserOutMessage.user_id = userId;
    getUserOutMessage.appId = appId;
    getUserOutMessage.reference = reference;
    api.send(JSON.stringify(getUserOutMessage.toJsonObject()));
  };

  api.getChat = (chatId, appId, reference) => {
    let chatOutMessage = new GetChatOutMessage();
    chatOutMessage.chat_id = chatId;
    chatOutMessage.appId = appId;
    chatOutMessage.reference = reference;
    api.send(JSON.stringify(chatOutMessage.toJsonObject()));
  };

  api.getChatAdministrators = (chatId, appId, reference) => {
    let getChatAdministratorsOutMessage = new GetChatAdministratorsOutMessage();
    getChatAdministratorsOutMessage.chat_id = chatId;
    getChatAdministratorsOutMessage.appId = appId
    getChatAdministratorsOutMessage.reference = reference;
    api.send(JSON.stringify(getChatAdministratorsOutMessage.toJsonObject()));
  };

  api.banChatMember = (chatId, userId, appId, reference) => {
    let banChatMemberOutMessage = new BanChatMemberOutMessage();
    banChatMemberOutMessage.chat_id = chatId;
    banChatMemberOutMessage.user_id = userId;
    banChatMemberOutMessage.appId = appId
    banChatMemberOutMessage.reference = reference;
    api.send(JSON.stringify(banChatMemberOutMessage.toJsonObject()));
  };
  api.addBlackList = (users, appId, reference) => {
    let addBlackListOutMessage = new AddBlackListOutMessage();
    addBlackListOutMessage.users = users;
    addBlackListOutMessage.appId = appId
    addBlackListOutMessage.reference = reference;
    api.send(JSON.stringify(addBlackListOutMessage.toJsonObject()));
  };

  api.addWhiteList = (users, appId, reference) => {
    let addWhiteistOutMessage = new AddWhiteListOutMessage();
    addWhiteistOutMessage.reference = reference;
    addWhiteistOutMessage.users = users;
    addWhiteistOutMessage.appId = appId
    api.send(JSON.stringify(addWhiteistOutMessage.toJsonObject()));
  };

  api.deleteBlackList = (users, appId, reference) => {
    let deleteBlackListOutMessage = new DeleteBlackListOutMessage();
    deleteBlackListOutMessage.reference = reference;
    deleteBlackListOutMessage.users = users;
    deleteBlackListOutMessage.appId = appId
    api.send(JSON.stringify(deleteBlackListOutMessage.toJsonObject()));
  };

  api.deleteWhiteList = (users, appId, reference) => {
    let deleteWhiteListOutMessage = new DeleteWhiteListOutMessage();
    deleteWhiteListOutMessage.reference = reference;
    deleteWhiteListOutMessage.users = users;
    deleteWhiteListOutMessage.appId = appId
    api.send(JSON.stringify(deleteWhiteListOutMessage.toJsonObject()));
  };

  api.deleteBlackListPatterns = (chatId, pattern, appId) => {
    let deleteBlackListPatterns = new DeleteBlackListPatternsOutMessage();
    deleteBlackListPatterns.chat_id = chatId;
    deleteBlackListPatterns.pattern = pattern;
    deleteBlackListPatterns.appId = appId
    api.send(JSON.stringify(deleteBlackListPatterns.toJsonObject()));
  };

  api.deleteWhiteListPatterns = (chatId, pattern, appId) => {
    let deleteWhiteListPatterns = new DeleteWhiteListPatternsOutMessage();
    deleteWhiteListPatterns.chat_id = chatId;
    deleteWhiteListPatterns.pattern = pattern;
    deleteWhiteListPatterns.appId = appId
    api.send(JSON.stringify(deleteWhiteListPatterns.toJsonObject()));
  };

  api.addBlacklistPatterns = (chatId, data, appId, reference) => {
    let addBlacklistPatternsOutMessage = new AddBlacklistPatternsOutMessage();
    addBlacklistPatternsOutMessage.chat_id = chatId;
    addBlacklistPatternsOutMessage.reference = reference;
    addBlacklistPatternsOutMessage.data = data;
    addBlacklistPatternsOutMessage.appId = appId
    api.send(JSON.stringify(addBlacklistPatternsOutMessage.toJsonObject()));
  };
  api.addWhitelistPatterns = (chatId, data, appId, reference) => {
    let addWhitelistPatternsOutMessage = new AddWhitelistPatternsOutMessage();
    addWhitelistPatternsOutMessage.chat_id = chatId;
    addWhitelistPatternsOutMessage.data = data;
    addWhitelistPatternsOutMessage.appId = appId
    addWhitelistPatternsOutMessage.reference = reference
    api.send(JSON.stringify(addWhitelistPatternsOutMessage.toJsonObject()));
  };

  api.unbanChatMember = (chatId, userId, appId, reference) => {
    let unbanChatMember = new UnbanChatMember();
    unbanChatMember.chat_id = chatId;
    unbanChatMember.user_id = userId;
    unbanChatMember.appId = appId
    unbanChatMember.reference = reference;
    api.send(JSON.stringify(unbanChatMember.toJsonObject()));
  };

  api.removeChatMember = (chatId, userId, appId, reference) => {
    let removeChatMemberOutMessage = new RemoveChatMemberOutMessage();
    removeChatMemberOutMessage.chat_id = chatId;
    removeChatMemberOutMessage.user_id = userId;
    removeChatMemberOutMessage.appId = appId
    removeChatMemberOutMessage.reference = reference;
    api.send(JSON.stringify(removeChatMemberOutMessage.toJsonObject()));
  };

  api.recallMessage = (chatId, messageId, toUserId, reference, appId) => {
    let recallOutMessage = new RecallOutMessage();
    recallOutMessage.chat_id = chatId;
    recallOutMessage.message_id = messageId;
    recallOutMessage.to_user_id = toUserId;
    recallOutMessage.reference = reference;
    recallOutMessage.appId = appId
    api.send(JSON.stringify(recallOutMessage.toJsonObject()));
  };

  api.setMyProfile = (user, reference) => {
    let setMyProfileOutMessage = new SetMyProfileOutMessage();
    setMyProfileOutMessage.user = user;
    setMyProfileOutMessage.reference = reference;
    api.send(JSON.stringify(setMyProfileOutMessage.toJsonObject()));
  };

  api.setChat = (chat, appId, reference) => {
    let setChatOutMessage = new SetChatOutMessage();
    setChatOutMessage.chat = chat;
    setChatOutMessage.appId = appId
    setChatOutMessage.reference = reference;
    api.send(JSON.stringify(setChatOutMessage.toJsonObject()));
  };

  api.getMyProfiles = (reference) => {
    let getMyProfiles = new GetMyProfiles();
    getMyProfiles.reference = reference;
    api.send(JSON.stringify(getMyProfiles));
  };

  api.generatePermanentUrl = (file, param1) => {
    let generatePermanentUrl = new GeneratePermanentUrl();
    generatePermanentUrl.file = file;
    generatePermanentUrl.param1 = param1;
    api.send(JSON.stringify(generatePermanentUrl));
  };
  api.getProductDetail = (productId, appId,reference) => {
    let getProductItem = new GetProductItemOutMessage();
    getProductItem.id = productId;
    getProductItem.reference=reference;
    getProductItem.appId = appId
    api.send(JSON.stringify(getProductItem.toJsonObject()));
  }
  api.listCollectionItem = (appId) => {
    let listCollectionItem = new ListCollectionItemOutMessage();
    listCollectionItem.appId = appId
    api.send(JSON.stringify(listCollectionItem.toJsonObject()));
  }
  api.getCollectionProduct = (collectionId, appId) => {
    let getCollectionProduct = new GetCollectionProductOutMessage();
    getCollectionProduct.id = collectionId;
    getCollectionProduct.appId = appId
    api.send(JSON.stringify(getCollectionProduct.toJsonObject()));
  }
  api.getBlackList = (appId, reference) => {
    let getBlackListOutMessage = new GetBlackListOutMessage();
    getBlackListOutMessage.reference = reference;
    getBlackListOutMessage.appId = appId
    api.send(JSON.stringify(getBlackListOutMessage.toJsonObject()));
  };

  api.getWhiteList = (appId, reference) => {
    let getWhiteListOutMessage = new GetWhiteListOutMessage();
    getWhiteListOutMessage.appId = appId
    getWhiteListOutMessage.reference = reference;
    api.send(JSON.stringify(getWhiteListOutMessage.toJsonObject()));
  };

  api.sendCellText = (userId, screenId, cellId, text, reference, appId) => {
    let textMsg = new TextCellOutMessage();
    textMsg.user_id = userId;
    textMsg.screen_id = screenId;
    textMsg.cell_id = cellId;
    textMsg.text = text;
    textMsg.reference = reference;
    textMsg.appId = appId
    api.send(JSON.stringify(textMsg.toJsonObject()));
  };

  api.sendCellPhoto = (userId, screenId, cellId, photoFileId, reference, appId) => {
    let photoMsg = new PhotoCellOutMessage();
    photoMsg.user_id = userId;
    photoMsg.screen_id = screenId;
    photoMsg.cell_id = cellId;
    photoMsg.photo = photoFileId;
    photoMsg.reference = reference;
    photoMsg.appId = appId
    api.send(JSON.stringify(photoMsg.toJsonObject()));
  };

  api.sendCellVideo = (userId, screenId, cellId, videoFileId, reference, appId) => {
    let videoMsg = new VideoCellOutMessage();
    videoMsg.user_id = userId;
    videoMsg.screen_id = screenId;
    videoMsg.cell_id = cellId;
    videoMsg.video = videoFileId;
    videoMsg.reference = reference;
    videoMsg.appId = appId
    api.send(JSON.stringify(videoMsg.toJsonObject()));
  };

  api.setWorkflow = (userId, screenId, appId, workflowCells, reference, disableNotification) => {
    let workflowMsg = new SetWorkflowOutMessage();
    workflowMsg.user_id = userId;
    workflowMsg.screen_id = screenId;
    workflowMsg.app_id = appId;
    workflowMsg.workflow_cell = workflowCells;
    workflowMsg.reference = reference;
    workflowMsg.disable_notification = disableNotification;
    workflowMsg.appId = appId
    api.send(JSON.stringify(workflowMsg.toJsonObject()));
  };

  api.setWorkflowAction = (userId, screenId, nextScreen, vappId, reference, appId) => {
    let workflowActionMsg = new SetWorkflowActionOutMessage();
    workflowActionMsg.user_id = userId;
    workflowActionMsg.screen_id = screenId;
    workflowActionMsg.next_screen = nextScreen;
    workflowActionMsg.vapp_id = vappId;
    workflowActionMsg.reference = reference;
    workflowActionMsg.appId = appId
    api.send(JSON.stringify(workflowActionMsg.toJsonObject()));
  };

  api.createChat = (chatType, isPublic, title, reference, appId) => {
    let createChatOutMessage = new CreateChatOutMessage();
    createChatOutMessage.type = chatType;
    createChatOutMessage.isPublic = isPublic;
    createChatOutMessage.title = title;
    createChatOutMessage.reference = reference;
    createChatOutMessage.appId = appId;
    api.send(JSON.stringify(createChatOutMessage.toJsonObject()));
  };
}

module.exports = {
  NandBoxClient: NandBoxClient,
};
