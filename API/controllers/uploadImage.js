class uploadImageClass{
    constructor() {
        this.uploadImg = this.uploadImg.bind(this);
    }
    async uploadImg(req, res, next) {
        try {
            const url = req.protocol + "://" + req.get("host");
            res.status(200).json({ 
                message: "Upload successful!",
                status : 200,
                url : url + "/images/" + req.file.filename,
             });
        } catch (error) {
            return res.status(500).json({
                message: "Error to upload image",
                error: error,
                status: 500
            });
        }
    }
}

var uploadImgCl = new uploadImageClass();
module.exports = uploadImgCl;