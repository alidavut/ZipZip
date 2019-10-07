"use strict";

const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

class ZipZip {
  constructor(zipPath) {
    this.path = zipPath;
    this.archive = archiver('zip');
    this.paths = [];
  }

  addFile(filePath, target) {
    if (!target) target = path.basename(filePath);
    this.archive.file(filePath, { name: target });
  }

  addDirectory(dirPath, target) {
    if (!target) target = '';
    this.archive.directory(dirPath, target);
  }

  build() {
    return new Promise((resolve, reject) => {
      const out = fs.createWriteStream(this.path);
      out.on('close', resolve);
      this.archive.on('error', reject);
      this.archive.pipe(out);
      this.archive.finalize();
    });
  }

  extract(dir, options = {}) {
    var zip = new AdmZip(this.path);

    return new Promise((resolve, reject) => {
      zip.extractAllToAsync(dir, options.overwrite, err => {
        if(err) return reject(err);
        resolve();
      });
    });
  }
}



module.exports = ZipZip;