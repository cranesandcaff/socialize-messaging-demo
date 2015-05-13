/**
 * A model for a comment which can be linked to many other database objects
 * @class Comment
 */
Comment = LinkableModel.extend();

_.extend(Comment.prototype, CommentableModel.prototype, LikeableModel.prototype);

/**
 * The user that made the comment
 * @returns {User} A User instance representing the commenting user.
 */
Comment.prototype.user = function () {
    return Meteor.users.findOne(this.userId);
};

//Specify the type of object since comments are both likeable and commentable i.e. you
//can comment on a comment. Both likeable and commentable objects need to store their
//type so we can find them later.
Comment.prototype._objectType = "comment";

//create the CommentsCollection and set a reference to Comment.prototype._collection so BaseModel knows how to find it
CommentsCollection = Comment.prototype._collection = new Mongo.Collection("comments", {
    transform: function (comment) {
        return new Comment(comment);
    }
});

//attach collection to meteor namespace for easy access
Meteor.comments = CommentsCollection;

//create the schema
var CommentSchema = new SimpleSchema({
    "userId":{
        type:String,
        regEx:SimpleSchema.RegEx.Id,
        autoValue:function () {
            if(this.isInsert && !this.isSet){
                return Meteor.userId();
            }
        },
        optional:true,
        denyUpdate:true
    },
    "date":{
        type:Date,
        autoValue:function() {
            if(this.isInsert){
                return new Date();
            }
        },
        optional:true,
        denyUpdate:true
    },
    "body":{
        type:String
    }
});

//attach the schema
CommentsCollection.attachSchema(CommentSchema);
CommentsCollection.attachSchema(CommentableModel.CommentableSchema);
CommentsCollection.attachSchema(LikeableModel.LikeableSchema);
CommentsCollection.attachSchema(LinkableModel.LinkableSchema);

//register Comment as likeable and commentable
LinkableModel.registerLinkableType(Comment);
