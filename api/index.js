const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/Auth");
const cartRoutes = require("./routes/Cart");
const usersRoutes = require("./routes/User");
const productsRoutes = require("./routes/Products");


const app = express()
dotenv.config()
const dbOptions = {useNewUrlParser:true, useUnifiedTopology:true}
mongoose
    .connect(process.env.MONGO_URL, dbOptions)
    .then(() => console.log("Connected!!!"))
    .catch((err) => {console.log("Not connected!")})

    const corsOptions = {
        origin:'http://localhost:4000',
        credentials: true,
        optionSuccessStatus: 200,
      }
app.use(express.json())
app.use(cors())
app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/products", productsRoutes)
app.use("/api/cart", cartRoutes) 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage }).single('file')
app.post('/api/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});