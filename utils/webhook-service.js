const axios = require("axios");


const WEBHOOK_KEY = process.env.WEBHOOK_KEY
const WEBHOOK_URL = process.env.WEBHOOK_URL


module.exports.callWebhook = async (payload) => {
    try {
        let {data} = await axios.post(WEBHOOK_URL + `?secret-key=${WEBHOOK_KEY}`, payload);
        console.log("Webhook called successfully");
    } catch (e) {
        console.log("Webhook call error");
        console.log(e);
        return false;
    }
    return true;

}

