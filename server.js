const app = require("./app");

app.get("/", (req, res) => {
  res.send("Hello, VOXA! in Digitopia");
});

const PORT = process.env.PORT || 27017;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
