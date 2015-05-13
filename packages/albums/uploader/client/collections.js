_cloudinary = new Mongo.Collection(null);
var _cloudinary_stream = new Meteor.Stream("c_stream");

_cloudinary_stream.on("upload", function (data, options) {
  _cloudinary.update(options.db_id, {$set:data});
});
