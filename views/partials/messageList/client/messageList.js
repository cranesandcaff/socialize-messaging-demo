Template.messageList.created = function () {
    /*jshint -W120 */

    var self = Template.messageList.currentInstance = this;
    var state = Iron.controller().state;

    self.limit = 10;
    self.totalMessages = 0;
    self.page = state.set("page", 0);

    self.autorun(function () {

        var numPages = state.get("page");
        var currentConversation = Router.current().params._id;
        var skip;

        if(currentConversation){
            state.set("loading", true);
        }else{
            state.set("ready", true);
        }

        for(var page = 0; page <= numPages; page++){
            skip = page * self.limit;

            self.subscribe('messagesFor', currentConversation, {limit:self.limit, skip:skip}, function () {
                state.set("loading", false);
                state.set("ready", true);

                var messageCount = Meteor.conversations.findOne(currentConversation).messages().count();

                if(messageCount > self.limit && messageCount - self.totalMessages < self.limit){
                    state.set("done", true);
                }else{
                    self.totalMessages = messageCount;
                }

                if(self.scrollHeight){
                    var container = $("#messages");
                    var newPosition = container.prop("scrollHeight") - self.scrollHeight;
                    container.prop({scrollTop:newPosition});

                    self.scrollHeight = 0;
                }
            });
        }

    });

    $(window).on("resize", function() {
        window.scrollEnd(self.$("#messages"));
    });
};

Template.messageList.destroyed = function() {
    $(window).off("resize");
};

Template.messageList.helpers({
    ready: function() {
        var state = Iron.controller().state;
        return state.get("ready");
    },
    done: function() {
        var state = Iron.controller().state;
        var limit = Template.instance().limit;
        var currentRoute = Router.current();
        var messageCount = currentRoute.data && currentRoute.data().messages().count();

        return messageCount < limit || state.get("done");
    }
});

Template.messageList.events({
    'click #loadPreviousMessages': function(event, template) {
        var messageContainer = $("#messages");
        var state = Iron.controller().state;

        if(messageContainer.scrollTop() === 0){
            template.scrollHeight = messageContainer.prop("scrollHeight");

            var currentPage = state.get("page");

            state.set("page", currentPage+1);
        }
    }
});
