Album = BaseModel.extend();

Album.prototype.user = function(){
    return Meteor.users.findOne(this.userId);
};

Album.prototype.cover = function(options){
    var coverImage = PhotosCollection.findOne({'albumId':this._id}, {sort:{date:-1}});

    if(coverImage){
        return coverImage.url(options);
    }else{
        return new Photo({publicId:Album.defaultAlbumCover}).url(options);
    }
};

Album.prototype.setPrivacyLevel = function(level) {
    this.update({$set:{privacy:level}});
};




AlbumsCollection = Album.prototype._collection = new Meteor.Collection('albums', {
    transform:function(document){
        return new Album(document);
    }
});

Meteor.albums = AlbumsCollection;

var AlbumSchema = new SimpleSchema({
    "userId":{
        type:String,
        regEx:SimpleSchema.RegEx.Id,
        autoValue:function () {
            if(this.isInsert){
                return Meteor.userId();
            }
        },
        denyUpdate:true
    },
    "date":{
        type:Date,
        autoValue:function() {
            if(this.isInsert){
                return new Date();
            }
        },
        denyUpdate:true
    },
    albumName:{
        type:String,
        max:50
    },
    "type":{
        type:String,
        defaultValue: "standard"
    },
    privacy:{
        type:Number,
        defaultValue:0
    },
    photoCount:{
        type:Number,
        defaultValue:0
    }
});

AlbumsCollection.attachSchema(AlbumSchema);
