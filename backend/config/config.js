const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    DATABASE_NAME : Joi.string().required().description('Database name'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    GOOGLE_CLIENT_ID: Joi.string().description('Google client id for web application'),
    GOOGLE_MY_BUSINESS_API_KEY: Joi.string().description('Google my business api key'),
    GOOGLE_CLIENT_SECRET: Joi.string().description('Google client secret for web application'),
    GOOGLE_CALLBACK_URL: Joi.string().description('Google callback url for web application'),
    STRIPE_SECRET_KEY: Joi.string().description('Stripe secret key'),
    STRIPE_PUBLIC_KEY: Joi.string().description('Stripe public key'),
    USER_MAIL: Joi.string().description('User mail'),
    USER_PASSWORD: Joi.string().description('User password'),
    NODEMAIL_GMAIL_KEY: Joi.string().description('Node mail gmail key'),
    NODEMAIL_GMAIL_SECRET: Joi.string().description('Node mail gmail secret'),
    NODEMAIL_GMAIL_REFRESH: Joi.string().description('Node mail gmail refresh token'),
    REDIS_URL: Joi.string().description('Redis url'),
    REDIS_PORT: Joi.number().description('Redis port'),
    REDIS_PASSWORD: Joi.string().description('Redis password'),
    REDIS_HOST: Joi.string().description('Redis host'),
    OPENAI_KEY: Joi.string().description('OpenAI key'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);


if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName : envVars.DATABASE_NAME
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  gmail: {
    user: envVars.USER_MAIL,
    pass: envVars.USER_PASSWORD,
    key: envVars.NODEMAIL_GMAIL_KEY,
    secret: envVars.NODEMAIL_GMAIL_SECRET,
    refreshToken: envVars.NODEMAIL_GMAIL_REFRESH,
  },
  google: {
    clientId: envVars.GOOGLE_CLIENT_ID,
    clientSecret: envVars.GOOGLE_CLIENT_SECRET,
    callbackUrl: envVars.GOOGLE_CALLBACK_URL,
    gmb_api_key: envVars.GOOGLE_MY_BUSINESS_API_KEY,
  },
  stripe: {
    secretKey: envVars.STRIPE_SECRET_KEY,
    publicKey: envVars.STRIPE_PUBLIC_KEY,
  },
  redis: {
    url: envVars.REDIS_URL,
    port: envVars.REDIS_PORT,
    password: envVars.REDIS_PASSWORD,
    host: envVars.REDIS_HOST,
  },
  openAIKey: envVars.OPENAI_KEY,
};