const Pusher = require("pusher");

/**
 * makePusherClient
 * @return {Pusher}
 */
function makePusherClient() {
    return new Pusher({
        appId: process.env.PUSHER_APP,
        key: process.env.PUSHER_KEY,
        secret: process.env.PUSHER_SECRET,
        cluster: process.env.PUSHER_CLUSTER,
        useTLS: true
    });
}

/**
 * notify
 * @param payload
 * @return {Promise<Response>}
 */
module.exports.notify = (payload) => {
    const pusher = makePusherClient();
    return pusher.trigger("car-plates", "image-uploaded", {
        message: payload
    });
}