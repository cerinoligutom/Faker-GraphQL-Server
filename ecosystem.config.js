module.exports = {
  apps: [
    {
      name: 'Faker REST API',
      script: 'index.js',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      autorestart: true,
      max_restarts: 1,
      min_uptime: '10s',
      watch: ['src/**/*.ts'],
      max_memory_restart: '1G'
    }
  ]
};
