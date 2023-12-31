export default () => ({
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 42069,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    dbname: process.env.POSTGRES_DBNAME,
    sync: Boolean(process.env.POSTGRES_SYNC || false),
  },
  defaultClient: {
    token: process.env.DEFAULT_CLIENT_TOKEN,
    clientId: process.env.DEFAULT_CLIENT_ID,
    clientSecret: process.env.DEFAULT_CLIENT_SECRET,
    intents: parseInt(process.env.DEFAULT_CLIENT_INTENTS, 10) || 3276799, // default to all intents
  },
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT, 10) || 3000,
});
