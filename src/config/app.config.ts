export default () => ({
  environment: process.env.NODE_ENV,
  database: {
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
  },
});
