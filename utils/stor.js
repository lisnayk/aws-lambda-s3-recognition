const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
};
// const mysql = require('serverless-mysql')({config: dbConfig});
/**
 *Store data to database
 */
module.exports.store = (data) => {
    return new Promise(resolve => {
        console.log(data);
        resolve(1);
    });
    // TODO: refactor after getting access to DB
    // return mysql.query(
    //     "INSERT INTO `easyset_device_logs`\
    //         (`device_id`,`pin_id`,`event_type`,`time`,`output`,`extra_info`)\
    //     VALUES (?,?,?,?,?,?);",
    //     [
    //         event.device.id,
    //         extractPinId(event),
    //         event.payload.event_name ?? null,
    //         event.payload.time ?? null,
    //         event.payload.output ?? null,
    //         event.payload.extra_info ?? null,
    //     ]
    // );
}