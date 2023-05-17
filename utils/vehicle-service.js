const axios = require("axios");

const API_KEY = process.env.VEHICLE_SERVICE_KEY;
const API_URL = process.env.VEHICLE_SERVICE_URL ?? 'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles';

module.exports.getVehicleInfo = async (registrationNumber) => {
    let res = {
        "registrationNumber": registrationNumber,
        "taxStatus": "",
        "taxDueDate": "",
        "motStatus": "",
        "make": "",
        "yearOfManufacture": 0,
        "engineCapacity": 0,
        "co2Emissions": 0,
        "fuelType": "",
        "markedForExport": false,
        "colour": "",
        "typeApproval": "",
        "revenueWeight": 0,
        "dateOfLastV5CIssued": "",
        "motExpiryDate": "",
        "wheelplan": "",
        "monthOfFirstRegistration": ""
    };
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