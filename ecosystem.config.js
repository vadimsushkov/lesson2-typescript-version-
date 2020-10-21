module.exports = {
  apps : [{
    name: "lesson2",
    script: './src/server/index.ts',
    watch: true,
    ignore_watch: ['node_modules', '.idea'],
    env: {
      NODE_ENV: 'development',
      max_memory_restart: '600M',
      instances: 1,
      exec_mode: "cluster",
    },
    env_production: {
      NODE_ENV: 'production',
      instances: 2,
      exec_mode: "cluster",
    }
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
