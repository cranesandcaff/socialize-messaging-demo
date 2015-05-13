window.scrollEnd = function (container){
    container.prop({scrollTop:container.prop("scrollHeight")});
};

Template.message.rendered = function () {


    var state = Iron.controller().state;
    var messageContainer = $("#messages");
    var scrollHeight = messageContainer.prop("scrollHeight");
    var innerHeight = messageContainer.innerHeight();
    var scrollTop = messageContainer.scrollTop();
    var difference = scrollHeight - scrollTop - innerHeight;

    if(scrollHeight > innerHeight){
        if(!state.get("scrolled") || difference <= 10){

//                if(CurrentConversationInstance.scrolled){
//                    window.newMessageSound.play();
//                }

            state.set("scrolled", true);
            window.scrollEnd(messageContainer);
        }
    }

};
