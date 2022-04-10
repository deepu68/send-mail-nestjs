export const Config = () => ({
  nodeConfiguration: {
    port: Number(process.env.PORT) || 3000,
  },
  database: {
    type: process.env.DB_TYPE || 'postgres',
    masterHost: process.env.DB_HOST || 'localhost',
    slaveHost: process.env.DB_HOST_READ || process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'rudeep',
    database: process.env.DB_NAME || 'postgres',
    schema: process.env.DB_SCHEMA || 'public',
    synchronize: ((process.env.DB_SYNCHRONIZATION == 'true') as boolean) || false,
    retryAttempts: 10,
    retryDelay: 3000,
    keepConnectionAlive: false,
  },
  mailerOtpions: {
    smtp_port: Number(process.env.SMTP_PORT) || 587,
    smtp_host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
    smtp_user: process.env.SMTP_USER || 'apikey',
    smtp_password: process.env.SMTP_PASSWORD,
    sender_email: process.env.SENDER_EMAIL,
  },
});

export { Config as default }