import fs from "fs";
import path from "path";

// const uri = "../public/temporal";
export const deleteTemporalImages = (dirPath: string) => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error("Error: ", err);
      return;
    }

    files.forEach((file) => {
      const nextPath = path.join(dirPath, file);
      fs.unlink(nextPath, (err) => {
        if (err) {
          console.error("Error deleting file: ", err);
        } else {
          console.log(`Deleted file ${nextPath}`);
        }
      });
    });
  });
};
