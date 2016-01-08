ZipZip
======

ZipZip enables you to create zip files easily in Node.js.

## Usage

```
npm install zipzip --save
```

#### An example usage:

```javascript
const ZipZip = require('zipzip');

// create ZipZip instance
const zip = new ZipZip(__dirname + '/archive.zip');

// add a directory completely
zip.addDirectory(__dirname + '/assets');

// add a custom file
zip.addFile(__dirname + '/index.html');

// add a custom file with different target
zip.addFile(__dirname + '/app.js', '/assets/app.js');

// build the zip file
zip.build().then(() => console.log('Zip file has been created'));
```
