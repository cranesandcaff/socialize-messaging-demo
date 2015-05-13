Meteor.publish(null, function(){
    var cursors =  [
        Meteor.users.find(this.userId, {fields:{avatarId:true, membership:true}}),
    ];

    var participant = Meteor.participants.findOne({userId:this.userId}, {sort:{date:-1}, fields:{conversationId:true}});
    if(participant){
        cursors.push(Meteor.conversations.find(participant.conversationId));
    }
    return cursors;
}, {is_auto:true});
