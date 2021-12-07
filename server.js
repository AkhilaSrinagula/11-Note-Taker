const express = require("express");


const app = express();
const PORT = process.env.PORT || 3001; 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const apiRoutes = require("./routes/apiRoutes");
app.use(apiRoutes);

const htmlRoutes = require("./routes/htmlRoutes");
app.use(htmlRoutes);

app.listen(PORT, function () {
    console.log("App is listening on PORT ", PORT);
  });