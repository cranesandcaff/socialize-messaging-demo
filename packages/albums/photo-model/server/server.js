PhotosCollection.allow({
    update: function(userId, photo){
        return photo.checkOwnership();
    },
    remove: function(userId, photo) {
        return photo.checkOwnership();
    }
});

PhotosCollection.after.remove(function (userId, photo) {
    cloudinary_delete(photo.publicId);
});
