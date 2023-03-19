const sharp = require("sharp");

const CROP_WIDTH = process.env.IMAGE_SERVICE_CROP_WIDTH ?? 200;
const PUBLIC_BUCKET = process.env.IMAGE_SERVICE_PUBLIC_BUCKET ?? "bm-car-plates";
const PLATES_PATH = process.env.IMAGE_SERVICE_PLATES_PATH ?? "images/";

module.exports.saveThumbnail = async (originImage) => {
    var buffer = await sharp(originImage.Body).resize(CROP_WIDTH).toBuffer();
    const destparams = {
        Bucket: PUBLIC_BUCKET,
        Key: PLATES_PATH + md5(Math.random() + new Date().toLocaleDateString()),
        Body: buffer,
        ContentType: "image",
        ACL: 'public-read'
    };
    return await s3.putObject(destparams).promise();

}