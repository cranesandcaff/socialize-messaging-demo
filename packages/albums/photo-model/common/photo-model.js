Photo = CommentableModel.extend();

Photo.prototype.url = function (options) {
    if(options){
        options = options.hash || options;
    }else{
        options = {};
    }
    return $.cloudinary.url(this.publicId, options);
};

Photo.prototype._objectType = "photo";

PhotosCollection = Photo.prototype._collection = new Meteor.Collection('photos', {
    transform:function(document){
        return new Photo(document);
    }
});

Meteor.photos = PhotosCollection;

//var PhotoSchema = new SimpleSchema({
//
//});
//
//PhotosCollection.attachSchema(PhotoSchema);
