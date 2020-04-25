const IncomingForm = require("formidable").IncomingForm;
const fs = require("fs");
var path = require("path");

module.exports = function upload(req, res) {
  var form = new IncomingForm();
  var curTime = new Date();
  var curTime2 = curTime.getTime();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, "../server/uploads");

  form.on("file", (field, file) => {
    var fileName = curTime2 + "__" + file.name;
    fs.rename(file.path, path.join(form.uploadDir, fileName), function (err) {
      if (!err) {
        return res.send(fileName);
      }
    });
    console.log(fileName);
  });

  // log any errors that occur
  form.on("error", function (err) {
    console.log("An error has occured: \n" + err);
  });
  // parse the incoming request containing the form data
  form.parse(req);
};
