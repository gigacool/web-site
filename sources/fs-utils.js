const fs = require('fs');
const path = require('path');

module.exports = {
  createFolderSync: function(dest) {
    try {
      fs.statSync(dest);
    } catch(err){
      if (err.code === 'ENOENT'){
        fs.mkdirSync(dest);
      }
    }
  }

};
