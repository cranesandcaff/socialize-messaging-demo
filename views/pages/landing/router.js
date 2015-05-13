Router.route("landing", {
    path:"/",
    layoutTemplate:"blankLayout",
    template:"landing",
    onBeforeAction: function () {
        if(Meteor.userId()){
            var currentConversation = Meteor.conversations.findOne();
            if(currentConversation){
                Router.go("conversation", currentConversation);
            }else{
                Router.go("/messaging");
            }
        }else{
            this.next();
        }
    }
});
