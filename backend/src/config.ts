export default {
  database: {
    host: process.env.DATABASE_HOST,
    port: 3306,
    user: "xiaodong",
    database: "codenav",
    password: process.env.DATABASE_PASSWORD,
    timezone: "+08:00"
  }
};