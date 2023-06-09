const notifyService = require("./utils/notify-service");
const plateService = require("./utils/plate-service");
const webhookService = require("./utils/webhook-service");
const AWS = require('aws-sdk');
const {getVehicleInfo} = require("./utils/vehicle-service");
const {store} = require("./utils/stor");
const {saveThumbnail} = require("./utils/image-service");
const Buffer = require('buffer').Buffer;
const s3 = new AWS.S3();


module.exports.handler = async (event) => {
    if (event.Records[0].s3.object.size <= 0) {
        return;
    }
    const srcBucket = event.Records[0].s3.bucket.name;
    const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));

    let vehicle = {};
    try {
        validateImage(srcKey);
        let originImage = await s3.getObject({Bucket: srcBucket, Key: srcKey}).promise();
        let plate = await plateService.getPlateInfo(Buffer.from(originImage.Body).toString('base64'));
        if (plate.results.length > 0) {
            console.log("Car plate was recognized successfully:" + plate.results[0].plate);
            vehicle = await getVehicleInfo(plate.results[0].plate);
            if (Object.keys(vehicle).length > 0) {
                console.log("getVehicleInfo was got successfully!");
            } else {
                console.log("getVehicleInfo was not got successfully!");
            }
            let s3Thumbnail = await saveThumbnail(originImage, srcKey);
            const payload = {
                device_id: srcKey,
                time: new Date().toISOString(),
                picture: s3Thumbnail,
                plate: JSON.stringify(plate),
                vehicle: JSON.stringify(vehicle)
            }
            await store(payload);
            await webhookService.callWebhook(payload)
            console.log("Car info was stored successfully!");
        } else {
            console.log("Plate was not recognized!");
        }
        await notifyService.notify({...event.Records[0].s3, plate, vehicle});
    } catch (error) {
        console.log(error);
    }
    return {
        status: 200
    }
}

/**
 * validateImage
 * @param srcKey
 */
function validateImage(srcKey) {
    // Infer the image type from the file suffix.
    const typeMatch = srcKey.match(/\.([^.]*)$/);
    if (!typeMatch) {
        throw new Error("Could not determine the image type.");
    }
    // Check that the image type is supported
    const imageType = typeMatch[1].toLowerCase();
    if (imageType !== "jpg" && imageType !== "png") {
        throw new Error(`Unsupported image type: ${imageType}`);
    }
}
