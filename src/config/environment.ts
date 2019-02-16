export const env = {
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT ? +process.env.PORT : 9990,
  isProduction: process.env.NODE_ENV === 'production'
};
