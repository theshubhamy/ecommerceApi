import path from 'path';
import fs from 'fs';

export const clearImage = filePath => {
  //defining absolute path of current WORKDIR
  const __dirname = path.resolve();
  filePath = path.join(__dirname, filePath);
  fs.unlink(filePath, err => console.log(err));
};
