Template.stream_upload.events({
  'change input[type=file]': function (e, helper) {

    var options = {context: this};

    if (helper.data && _.has(helper.data, "callback")) {
      options.callback = helper.data.callback;
    }

    var files = e.currentTarget.files;

    _.each(files, function (file) {
      var reader = new FileReader;

      reader.onload = function () {
        var file_data = new Uint8Array(reader.result);
        var dataUri = "data:"+file.type+";base64,"+Base64.encode(file_data);
        options.db_id = _cloudinary.insert({dataUri:dataUri, name:file.name});
        Meteor.call("cloudinary_upload_stream", file_data, options, function (err, res) {
          if (err) {
            _cloudinary.remove(options.db_id);
            console.log(err);
          }
        });
      };


      reader.readAsArrayBuffer(file);

    });
  }
});
