AlbumsCollection.allow({
    insert: function() {
        return true;
    },
    update: function(userId, album) {
        return album.checkOwnership();
    },
    remove: function(userId, album) {
        return album.checkOwnership();
    }
});
