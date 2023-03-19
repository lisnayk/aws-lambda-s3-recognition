const axios = require("axios");
const FormData = require("form-data");

const PLATE_SERVICE_KEY = process.env.PLATE_SERVICE_KEY

module.exports.getPlateInfo = async (fileStream) => {
    let plate = {
        camera_id: 0,
        filename: '-',
        processing_time: 0,
        results: []
    }
    try {
        let body = new FormData();
        body.append("upload", fileStream);
        body.append("regions", "us-ca"); // Change to your country
        let {data} = await axios.post("https://api.platerecognizer.com/v1/plate-reader/", body, {
            headers: {
                Authorization: "Token " + PLATE_SERVICE_KEY,
            },
        });
        plate = data;
    } catch (e) {
        console.log(e);
    }
    return plate;

}

