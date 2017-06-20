const marked = require('marked');
const fs = require('fs');
const path = require('path');

const Handlebars = require('Handlebars');

const pageTemplate = Handlebars.compile(fs.readFileSync('./templates/index.hbs', 'utf-8'));

console.log(pageTemplate)

const root = __dirname + '/../content/';

function tab(depth){
  let tabs = '';
  for(let i=0; i<depth; i++){
    tabs += '  ';
  }
  return tabs;
}

function headers(root){
  const results = fs.readdirSync(root)
  .filter((file)=>{
    const folder = path.resolve(root, file);
    return fs.statSync(folder).isDirectory();
  });
  return results;
}


function processFile(base, options){
  const dest = path.dirname(path.resolve('../docs',path.relative(root, base)));
  const filename = path.resolve(dest, path.basename(base, '.md') + '.html');
  console.log('from', base, 'to', filename);

  fs.readFile(base, 'utf-8', (err, content)=>{
    if (err){
      console.log(err);
    }
    let metadata = /(---((.|\n|\r)*)---)/gm.exec(content);
    let meta = {
      title:"Cédric Hartland's web site"
    }
    if (metadata){
      console.log(metadata);
      meta = metadata[2].trim().split('\n').reduce((reducer, item)=>{
         const vars = item.split(':');
         reducer[vars[0].trim()] = vars[1].trim();
         return reducer;
      }, {});
      console.log(JSON.stringify(meta, null, 2));
      content = content.replace(metadata[0], '');
    }
    const result = pageTemplate({
      title:meta.title,
      content:marked(content),
      headers:options.headers
    });
    fs.writeFile(filename, result, 'utf-8');

  })
}

function createFolder(dest){
  try {
    fs.statSync(dest);
  } catch(err){
    if (err.code === 'ENOENT'){
      fs.mkdirSync(dest);
    }
  }
}

function processFiles(base, options, result = []){
    if (!fs.statSync(base).isDirectory()){
      processFile(base ,options)
      return result;
    }
    createFolder(path.resolve('../docs',path.relative(root, base)));
    result.push(path.relative(root, base));
    fs.readdirSync(base)
    .forEach((file)=>{
      const folder = path.resolve(base, file);
      processFiles(folder, options, result);
    });
    return result;
}

let options = {
  headers: headers(root)
}

let list = processFiles(root, options);

console.log(JSON.stringify(list, null, 2));

console.log('headers', JSON.stringify(headers(root), null, 2));


// let map = crawlFolder(root);
//
// console.log(JSON.stringify(map, null, 2));
