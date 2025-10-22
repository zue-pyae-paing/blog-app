import muilter from "multer";
import path from "path";

const storage = muilter.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file) {
    return cb(new Error("No file uploaded"));
  }
  const allowedTypes = /jpeg|jpg|png|gif|mp3|wav|m4a|mp4|mov|avi|mkv/;
  const extname = path.extname(file.originalname).toLocaleLowerCase();
  const mimeType = file.mimetype;
  if (allowedTypes.test(extname) && allowedTypes.test(mimeType)) {
    console.log(extname, mimeType, "upload middlware");
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const uplode = muilter({ storage, fileFilter });
export default uplode;
