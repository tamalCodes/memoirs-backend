//* We are sending FormData from the frontend to the backend
//* So we are going to use a library called multer to upload the image to MONGO DB
//* This is because the .save() or .push() function is not able to upload the image
//* Multer also uses another library called gridfs which is basically Multer's storage

import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

const storage = new GridFsStorage({
  url: "mongodb+srv://tamaldas69:tamaldas69@cluster0.g8nkn.mongodb.net/memoirs?retryWrites=true&w=majority",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  file: (req, file) => {
    const match = ["image/png", "image/jpg"];

    if (match.indexOf(file.memeType) === -1)
      return `${Date.now()}-blog-${file.originalname}`;

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

export default multer({ storage });
