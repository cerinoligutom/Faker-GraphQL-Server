require('dotenv').config();

export const env = {
  HOST: process.env.HOST || '0.0.0.0',
  PORT: 80,
  isProduction: process.env.NODE_ENV === 'production'
};
