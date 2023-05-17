const sharp = require("sharp");
const md5 = require("md5");
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const CROP_WIDTH = parseInt(process.env.IMAGE_SERVICE_CROP_WIDTH ?? 200);
const PUBLIC_BUCKET = process.env.IMAGE_SERVICE_PUBLIC_BUCKET ?? "bm-car-plates";
const PLATES_PATH = process.env.IMAGE_SERVICE_PLATES_PATH ?? "images/";
/**
 * saveThumbnail
 * @param originImage
 * @param srcName
 * @return {Promise<string>}
 */
module.exports.saveThumbnail = async (originImage, srcName) => {
    const typeMatch = srcName.match(/\.([^.]*)$/);
    if (!typeMatch) {
        throw new Error("Could not determine the image type.");
    }
    const imageType = typeMatch[1].toLowerCase();
    if (imageType !== "jpg" && imageType !== "png") {
        throw new Error(`Unsupported image type: ${imageType}`);
    }
    let buffer = await sharp(originImage.Body).resize(CROP_WIDTH).toBuffer();
    let destKey = PLATES_PATH + md5(Math.random() + new Date().toLocaleDateString()) + "." + imageType;
    const destparams = {
        Bucket: PUBLIC_BUCKET,
        Key: destKey,
        Body: buffer,
        ContentType: "image",
        //ACL: 'public-read'
    };
    await s3.putObject(destparams).promise();
    return destKey;
}