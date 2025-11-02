const express = require("express");
require("dotenv").config();
const cors = require("cors");
const weatherRoute = require("./routes/weather");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/weather", weatherRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
