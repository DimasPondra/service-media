const MediaController = {
    store: async (req, res) => {
        try {
            res.json({
                status: "success",
                message: "successfully upload file.",
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "something went wrong.",
                errors: error,
            });
        }
    },
};

module.exports = MediaController;
