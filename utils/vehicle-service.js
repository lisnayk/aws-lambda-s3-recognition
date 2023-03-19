const axios = require("axios");

const API_KEY = process.env.VEHICLE_SERVICE_KEY;
const API_URL = process.env.VEHICLE_SERVICE_URL ?? 'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles';

module.exports.getVehicleInfo = async (registrationNumber) => {
    let res = {};
    try {
        let {data} = await axios.post(API_URL, {
            registrationNumber
        }, {
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            },
        });
        res = data;
    } catch (err) {
        console.log(err);
    }
    return res;
}