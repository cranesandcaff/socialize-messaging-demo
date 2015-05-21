window.scrollEnd = function (container){
    container.prop({scrollTop:container.prop("scrollHeight")});
};

Feedback.profiles = {
    "newMessage": {
        sound: "https://soundkit.io/samples/Affirmative.mp3",
    }
}

Template.message.rendered = function () {


    var state = Iron.controller().state;
    var messageContainer = $("#messages");
    var scrollHeight = messageContainer.prop("scrollHeight");
    var innerHeight = messageContainer.innerHeight();
    var scrollTop = messageContainer.scrollTop();
    var difference = scrollHeight - scrollTop - innerHeight;
    var scrolled = state.get("scrolled");

    if(scrollHeight > innerHeight){
        var message = Meteor.messages.findOne({conversationId:this.data.conversationId}, {sort:{date:-1}});
        var messageId = message && message._id;

        if(this.data._id === messageId){
            if(!scrolled || difference <= 10){
                if(scrolled && message && message.userId){
                    Feedback.provide("newMessage");
                }

                state.set("scrolled", true);
                window.scrollEnd(messageContainer);
            }
        }
    }

};
