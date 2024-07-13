const errorHandler = require("./middleware/errorHandler");
const express = require("express");
const dbConnect = require("./database/index");
const { PORT } = require("./config/index");
 const cors = require("cors");
 const app = express();
const morgan = require("morgan");

const path = require("path");
app.use(morgan("default"));
const cookieParser = require("cookie-parser");
app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.static(path.resolve(__dirname, "build")));
app.use(cookieParser());

app.use(express.json());
app.use("/", require("./routes/AuthRoute"));
app.use("/products", require("./routes/ProductRoute"));
app.use("/brands", require("./routes/BrandRoute"));
app.use("/categories", require("./routes/CategoryRoute"));
app.use("/cart", require("./routes/CartRoute"));
app.use("/orders", require("./routes/OrderRoute"));
 
app.use(errorHandler);

dbConnect();

app.listen(PORT, console.log(`Backend is running on port: ${PORT}`));
