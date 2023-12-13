require("dotenv").config();
const { APP_URL } = process.env;
const fs = require("fs");
const path = require("path");
const Media = require("../models/Media");
const { validationResult } = require("express-validator");

const MediaController = {
    index: async (req, res) => {
        const medias = await Media.findAll({
            attributes: ["id", "name", "location"],
        });

        const data = await Promise.all(
            medias.map(async (media) => {
                return {
                    id: media.id,
                    url: APP_URL + "/uploads/" + media.location + "/" + media.name,
                };
            })
        );

        return res.json({
            status: "success",
            message: "Successfully load data.",
            data: data,
        });
    },
    store: async (req, res) => {
        try {
            let files = req.files;

            // Check files
            if (files == undefined || files.length == 0) {
                return res.status(422).json({
                    status: "error",
                    message: "Unprocessable Entity.",
                    errors: [
                        {
                            message: "Files is required.",
                        },
                    ],
                });
            }

            let { directory } = req.body;

            // Check validation (body: directory)
            const errors = validationResult(req);
            const errorMessage = await Promise.all(
                errors.array().map(async (err) => {
                    return {
                        message: err.msg,
                    };
                })
            );
            if (!errors.isEmpty()) {
                // Remove files in temp because the directory is not defined
                if (files.length != 0) {
                    await Promise.all(
                        files.map(async (file) => {
                            fs.unlink(file.path, (err) => {
                                if (err) {
                                    return res.status(500).json({
                                        status: "error",
                                        message: "Something went wrong.",
                                        errors: err.message,
                                    });
                                }
                            });
                        })
                    );
                }

                return res.status(422).json({
                    status: "error",
                    message: "Unprocessable Entity.",
                    errors: errorMessage,
                });
            }

            const dynamicDirectoryPath = path.join(__dirname, `../../public/uploads/${directory}`);
            fs.mkdirSync(dynamicDirectoryPath, { recursive: true });

            const data = await Promise.all(
                files.map(async (file) => {
                    // Move file from temp to dynamic directory
                    const sourcePath = file.path;
                    const targetPath = path.join(dynamicDirectoryPath, file.filename);

                    fs.renameSync(sourcePath, targetPath);

                    // Save data
                    let media = await Media.create({ name: file.filename, location: directory });

                    return {
                        id: media.id,
                        url: APP_URL + "/uploads/" + media.location + "/" + media.name,
                    };
                })
            );

            return res.json({
                status: "success",
                message: "Successfully upload file.",
                data: data,
            });
        } catch (err) {
            return res.status(500).json({
                status: "error",
                message: "Something went wrong.",
                errors: err.message,
            });
        }
    },
    delete: async (req, res) => {
        try {
            const media = await Media.findByPk(req.params.id);

            if (!media) {
                return res.status(404).json({
                    status: "error",
                    message: "Media not found.",
                });
            }

            const targetPath = path.join(__dirname, `../../public/uploads/${media.location}/${media.name}`);
            fs.unlink(targetPath, (err) => {
                if (err) {
                    return res.status(500).json({
                        status: "error",
                        message: "Something went wrong.",
                        errors: err.message,
                    });
                }
            });

            await media.destroy();

            return res.json({
                status: "success",
                message: "Media successfully deleted.",
            });
        } catch (err) {
            return res.status(500).json({
                status: "error",
                message: "Something went wrong.",
                errors: err.message,
            });
        }
    },
};

module.exports = MediaController;
