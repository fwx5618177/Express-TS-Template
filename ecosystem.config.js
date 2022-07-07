/**
 * @description pm2 configuration file.
 * @example
 *  production mode: pm2 start ecosystem.config.js -- production
 *  development mode: pm2 start ecosystem.config.js -- dev
 */

module.exports = {
  apps : [{
    name: 'prod',
    script: 'dist/server.js',
    exec_mode: 'cluster', // 'cluster' or 'fork'
    instances: 2,
    instance_var: 'INSTANCE_ID', // NODE_APP_INSTANCE的环境变量，用于标注不同进程
    autorestart: true, // auto restart if process crash
    watch: false, // files change automatic restart
    ignore_watch: ['node_modules', 'logs'], // ignore files change
    max_memory_restart: '1G',  // restart if process use more than 1G memory
    merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
    output: './logs/pm2_access.log',  // pm2 log file
    error: './logs/pm2_access.log', // pm2 error log file
    env: {
      PORT: 3000,
      NODE_ENV: 'production',
    },
  },
  {
    name: 'dev',
    script: 'ts-node',
    args: '-r tsconfig-paths/register --transpile-only src/server.ts',
    exec_mode: 'cluster', // 'cluster' or 'fork'
    instance_var: 'INSTANCE_ID', // instance variable
    instances: 2, // pm2 instance count
    autorestart: true, // auto restart if process crash
    watch: false, // files change automatic restart
    ignore_watch: ['node_modules', 'logs'], // ignore files change
    max_memory_restart: '1G', // restart if process use more than 1G memory
    merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
    output: './logs/pm2_access.log', // pm2 log file
    error: './logs/pm2_access.log', // pm2 error log file
    env: {
      // environment variable
      PORT: 3000,
      NODE_ENV: 'development',
    },
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --only prod',
      'pre-setup': ''
    }
  }
};
