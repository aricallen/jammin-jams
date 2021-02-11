const { config } = require('dotenv');
const path = require('path');
const fs = require('fs');

const getEnvFileName = () => {
  const { ENVIRONMENT: env } = process.env;
  if (env === 'development' || env === undefined) {
    return '.env';
  }
  return `.env.${env.toString().toLowerCase()}`;
};

const envPath = path.resolve(__dirname, '..', getEnvFileName());
if (fs.existsSync(envPath)) {
  config({ path: envPath });
} else {
  console.log(`${envPath} does not exist. On prod?`);
}

module.exports = {
  // local creds
  PORT: process.env.PORT,
  API_PORT: process.env.API_PORT,
  DATABASE_URL: process.env.DATABASE_URL,

  DB_NAME: process.env.DB_NAME,
  TARGET_ENV: process.env.TARGET_ENV,

  // personal email
  EMAIL_USERNAME: process.env.EMAIL_USERNAME,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_HOST: process.env.EMAIL_HOST,
  DEBUG_EMAIL: process.env.DEBUG_EMAIL,

  // jj
  SECRET_KEY: process.env.SECRET_KEY,
  SECRET_KEY_LENGTH: process.env.SECRET_KEY_LENGTH,
  SESSION_SECRET: process.env.SESSION_SECRET,

  // stripe
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

  // used for stripe success Url
  // differerent in actual prod
  HOST: process.env.HOST,

  // mailchimp
  MAILCHIMP_LIST_ID: process.env.MAILCHIMP_LIST_ID,
  MAILCHIMP_API_HOST: process.env.MAILCHIMP_API_HOST,
  MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,

  // sentry
  SENTRY_URL: process.env.SENTRY_URL,

  // instagram
  INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN,

  BETA_STORE_ACCESS_CODE: process.env.BETA_STORE_ACCESS_CODE,
};
