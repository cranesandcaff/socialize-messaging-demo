Router.route("messaging", {
    path:"/messaging",
    template:"messaging",
    subscriptions: function() {
        Meteor.subscribe("conversations");
    }
});

Router.route("conversation", {
    path:"/messaging/:_id",
    template:"messaging",
    data: function () {
        return Meteor.conversations.findOne(this.params._id);
    },
    yieldTemplates:{
        messageList:{to:"messageArea"}
    },
    subscriptions: function(){
        this.state.set("scrolled", false);
        this.state.set("done", false);
        this.state.set("loading", false);
        this.state.set("ready", false);
        this.state.set("page", 0);

        Meteor.subscribe("conversations");
        Meteor.subscribe("viewingConversation", this.params._id);
    }
});
