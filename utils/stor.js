const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
};
const mysql = require('serverless-mysql')({config: dbConfig});
/**
 *
 * @param data
 * @return {*}
 */
module.exports.store = async (data) => {
    const deviceId = extractDeviceId(data.device_id);
    const buildingId = await getBuildingIdByDeviceId(deviceId)
    console.log("Store data log:" , data, deviceId, buildingId);
    let res = await mysql.query(
        "INSERT INTO `parking_camera_logs` (`device_id`, `building_id`,`picture`, `time`, `plate`, `vehicle`) VALUES(?,?,?,?,?,?);",
        [
            deviceId,
            buildingId,
            data.picture,
            data.time,
            data.plate,
            data.vehicle
        ]
    );
    await mysql.end();
    return res;
}

/**
 * getBuildingIdByDeviceId
 * @param deviceId
 * @return {Promise<unknown>}
 */
async function getBuildingIdByDeviceId(deviceId) {
    const res = await mysql.query("SELECT `building_id` FROM `building_dev_permissions` WHERE `device_id`=?;",
        [
            deviceId
        ]
    );
    if (res.length > 0) {
        return res[0].building_id;
    }
    return null;
}

/**
 * extractDeviceId
 * @param srcFileName
 * @return {string}
 */
function extractDeviceId(srcFileName) {
    const deviceId = srcFileName.split("_").shift();
    if (deviceId) return deviceId;
    return srcFileName;
}