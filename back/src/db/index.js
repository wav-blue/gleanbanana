import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.DATABASE_NAME,
  // 다중 쿼리를 사용하기 위한 설정
  multipleStatements: true,
  enableKeepAlive: true,
});

db.connect(function (err) {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }

  console.log("Connected to database.");
});

module.exports = db;
