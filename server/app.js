const express = require("express");
const cookieParser = require("cookie-parser");
const connectWithDatabase = require("./config/db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv").config();
const tesseract = require("tesseract.js");
const fs = require("fs");
const app = express();

// connect with DB
connectWithDatabase();

// swagger documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cookieParser());

const user = require("./routes/user");
const project = require("./routes/project");
const projectUpdate = require("./routes/projectUpdate");

app.use("/api/v1", user);
app.use("/api/v1", project);
app.use("/api/v1", projectUpdate);



// app.post("/api/v1/ocr", async (req, res) => {
//   try {
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).json({ message: "No files were uploaded." });
//     }

//     const file = req.files.file;
//     const filePath = "/tmp/" + file.name;

//     file.mv(filePath, async (err) => {
//       if (err) {
//         return res.status(500).json({ message: "Error uploading file." });
//       }

//       const result = await performOCR(filePath);
//       fs.unlinkSync(filePath); // Remove the temporary file

//       res.json({ result });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

async function performOCR(filePath) {
  const {
    data: { text },
  } = await tesseract.recognize(filePath, {
    lang: "eng",
  });

  return text;
}

module.exports = app;
