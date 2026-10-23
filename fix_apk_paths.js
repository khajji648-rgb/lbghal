const fs = require('fs');
const path = require('path');

const apkPath = path.join(__dirname, 'build_temp', 'base.apk');
let buf = fs.readFileSync(apkPath);
let count = 0;

for (let i = 0; i < buf.length - 7; i++) {
  // Check for "assets\" (0x61, 0x73, 0x73, 0x65, 0x74, 0x73, 0x5C)
  if (buf[i] === 0x61 && buf[i+1] === 0x73 && buf[i+2] === 0x73 && buf[i+3] === 0x65 && buf[i+4] === 0x74 && buf[i+5] === 0x73 && buf[i+6] === 0x5C) {
    buf[i+6] = 0x2F; // replace \ with /
    count++;
  }
}

fs.writeFileSync(apkPath, buf);
console.log('Successfully normalized backslashes in APK entries:', count);
