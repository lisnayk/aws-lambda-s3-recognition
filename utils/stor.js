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
    console.log(data);
    let res = await mysql.query(
        "INSERT INTO `car_plate_logs` (`device_id`, `picture`, `time`, `plate`, `vehicle`) VALUES(?,?,?,?,?);",
        [
            data.device_id,
            data.picture,
            data.time,
            data.plate,
            data.vehicle
        ]
    );
    await mysql.end();
    return res;
}