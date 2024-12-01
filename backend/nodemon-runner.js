const fs = require('fs');
const nodemon = require('nodemon');

nodemon({
    script: 'index.js',
    stdout: true // important: this tells nodemon not to output to console
  })
  .on('start', function () {
    console.log('App has started');
  })
  .on('quit', function () {
    console.log('App has quit');
    process.exit();
  })
  .on('restart', function (files) {
    console.log('App restarted due to: ', files);
  })
  .on('log', function (logMessage) {
    const bf =  Buffer.of(JSON.stringify(logMessage));
    fs.appendFileSync(
        'server.log',
        logMessage.message
    );
  });