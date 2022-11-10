const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const user = require("./routes/user-routes");
const post = require("./routes/posts-routes");
const admin = require("./routes/admin-routes");
app.use(
  cors({
    credentials: true,
    origin: `http://localhost:${process.env.CLIENT_PORT}`,
  })
);
app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database Connected")
);

app.use("/funderr", user);
app.use("/funderr", post);
app.use("/funderr", admin);

app.listen(process.env.DEV_PORT, () =>
  console.log(`server is up and running at port: ${process.env.DEV_PORT}`)
);
