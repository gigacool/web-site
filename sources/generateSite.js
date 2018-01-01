const fs = require('fs');
const fsUtils = require('./fsUtils');

const path = require('path');
const Handlebars = require('Handlebars');


const pageTemplate = Handlebars.compile(fs.readFileSync(__dirname + '/templates/mainContainer.hbs', 'utf-8'));
const ROOT = __dirname + '/pages';
const TARGET_ROOT = path.resolve(__dirname, '../docs');

function compileWebPage(base, options = {root:ROOT, target:TARGET_ROOT}){
  const dest = path.dirname(path.resolve(options.target, path.relative(ROOT, base)));
  const filename = path.resolve(dest, path.basename(base, '.hbs') + '.html');
  try {
    const content = fs.readFileSync(path.resolve(base), 'utf-8');
    let meta = {
      title:"Nihao Issy"
    }
    const result = pageTemplate({
      title:meta.title,
      content:content
    });
    fs.writeFileSync(filename, result, 'utf-8');
  }
  catch(error){
    console.log(error);
  }

}


function compileWebSite(base, options = {root:ROOT, target:TARGET_ROOT}, result = []){
    if (!fs.statSync(base).isDirectory()){
      console.log(base)
      compileWebPage(base ,options)
      return result;
    }
    fsUtils.createFolder(path.resolve('../docs', path.relative(options.root, base)));
    result.push(path.relative(options.root, base));
    fs.readdirSync(base)
    .forEach((file)=>{
      const folder = path.resolve(base, file);
      compileWebSite(folder, options, result);
    });
    return result;
}

// compileWebSite(ROOT, {});

module.exports = function() {
  let {source, target} = this.data;
  if (!source) {
    source = ROOT;
  }
  if (!target){
    target = TARGET_ROOT;
  }
  compileWebSite(ROOT, {root:ROOT, target:TARGET_ROOT});
  // compileWebSite(ROOT);
}
