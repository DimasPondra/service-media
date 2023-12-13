const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dynamicFolder = req.body.directory || "temp";
        const uploadPath = path.join(__dirname, `../public/uploads/${dynamicFolder}`);

        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const extention = file.originalname.split(".")[file.originalname.split(".").length - 1];
        const filename = Date.now() + "." + extention;

        cb(null, filename);
    },
});
const upload = multer({ storage: storage });

const mediaController = require("../app/controllers/MediaController");
const validationStore = require("../app/validators/StoreMediaValidator");

/* GET media listing. */
router.get("/", mediaController.index);
router.post("/", upload.array("files"), validationStore, mediaController.store);

module.exports = router;
