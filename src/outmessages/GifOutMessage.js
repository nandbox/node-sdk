const OutMessage = require("./OutMessage");

module.exports = class GifOutMessage extends OutMessage {


    /**
     * @param gifType
     *            it should be photo or video based on the type of this.Gif need to be
     *            send , its default is photo
     *  
     */
    constructor(gifType, gif) {
        super();
        if (gif) {
            switch (gifType) {
                case "Photo":
                    this.method = "sendPhoto";
                    this.photo = gif;
                    break;
                case "Video":
                    this.method = "sendVideo";
                    this.video = gif;
                    break;
                default:
                    this.method = "sendPhoto";
                    this.photo = gif;
            }
        }

    }
}