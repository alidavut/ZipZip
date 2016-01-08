"use strict";

const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

class ZipZip {
  constructor(zipPath) {
    this.path = zipPath;
    this.archive = archiver('zip')
    this.paths = [];
  }

  addFile(filePath, target) {
    if (!target) target = path.basename(filePath);
    this.archive.file(filePath, { name: target });
  }

  addDirectory(dirPath) {
    this.archive.directory(dirPath, '');
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
}

module.exports = ZipZip;
