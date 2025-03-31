const router = require("express").Router()
const upload = require("../middlewares/lib/upload")

const auth = require("./auth.routes")

router.use(auth)

router.post("/upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        return res.status(200).json({ message: "Files uploaded successfully", files: req.savedIgames })
    })
})


module.exports = router