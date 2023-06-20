import fs from "fs";
import path from "path";

// const directoryPath = "../../../../src/assets";

export const appendJpeg = (dirPath: string) => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error("Error: ", err);
      return;
    }

    files.forEach((file) => {
      const prevPath = path.join(dirPath, file);
      const nextPath = path.join(dirPath, file + ".jpeg");

      fs.rename(prevPath, nextPath, (err) => {
        if (err) {
          console.error("Error renaming file: ", err);
        } else {
          console.log(`Renamed file ${prevPath} to ${nextPath}`);
        }
      });
    });
  });
};

// appendJpeg(directoryPath);