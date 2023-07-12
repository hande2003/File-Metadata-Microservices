let express = require("express");
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "./public/images" });

let app = express();

app.set("view engine", "ejs");

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  let filename = req.file.originalname;
  let fileType = req.file.mimetype;
  let fileSize = req.file.size;
  res.render("result", {
    file: filename,
    type: fileType,
    size: fileSize,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(
    `Your app is listening on port ${port}. Go to http://localhost:${port}`
  );
});
