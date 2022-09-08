module.exports = {
    // database: process.env.DATABASE,
    // username: process.env.DATABASE_USERNAME,
    // password: process.env.DATABASE_PASSWORD,
    // hostname: process.env.DATABASE_HOST,
    // host: process.env.DATABASE_HOST,
    // port: process.env.DATABASE_PORT || 5432,
    url: process.env.DATABASE_URI,
    // url: "postgres://fusyjmytgyjyfi:736f46839d9ebd6f74ba36662c839b86fd8d3b149a8564fd564e27a0fc598d03@ec2-107-22-122-106.compute-1.amazonaws.com:5432/d1cqobc0ehkskg",
    use_env_variable: "DB_CONNECTION_STRING",
    dialect: 'postgres',
    // logging: false,
    dialectOptions: {
        ssl: {
        require: true,
        rejectUnauthorized: false
        }
    },
    define: {
        underscored: true
    }
};