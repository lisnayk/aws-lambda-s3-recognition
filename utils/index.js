const Pusher = require("pusher")
const axios = require("axios");
const FormData = require("form-data");

const PLATE_SERVICE_KEY = process.env.PLATE_SERVICE_KEY

module.exports.getPlateInfo = (fileStream) => {
    let body = new FormData();
    body.append("upload", fileStream);
    // Or body.append('upload', base64Image);
    body.append("regions", "us-ca"); // Change to your country
    return axios.post("https://api.platerecognizer.com/v1/plate-reader/", body, {
        headers: {
            Authorization: "Token " + PLATE_SERVICE_KEY,
        },
    })
}

