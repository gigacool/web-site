const fs = require('fs');

function createFolder(dest){
  try {
    fs.statSync(dest);
  } catch(err){
    if (err.errno === -4058){
      fs.mkdirSync(dest);
      return;
    }
    console.error(err);
  }
}

module.exports = {
  createFolder: createFolder
}
