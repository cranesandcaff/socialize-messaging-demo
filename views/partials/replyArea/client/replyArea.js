Template.replyArea.events({
    'submit form': function (e, template) {
        e.preventDefault();

        var ta = template.$("#body");
        var body = ta.val();

        ta.attr("disabled", "disabled");

        if(template.data){
            template.data.sendMessage(body, function (err) {
                if(!err){
                    ta.val("");
                    Deps.afterFlush(function () {
                        window.scrollEnd($("#messages"));
                    });
                }
                ta.attr("disabled", null);
                $("#body").focus();
            });
        }else{
            var conversation;
            var participants = [];

            _.each(SelectedParticipants.keys, function (val, key) {
                if(val === "true"){
                    participants.push({_id:key});
                }
            });

            if(participants.length > 0){
                conversation = new Conversation().save();
                conversation.addParticipants(participants);
                conversation.sendMessage(body);
                Router.go("conversation", conversation, {replaceState: true});
            }
        }
    },
    'keypress textarea': function (e, template) {
        if(e.keyCode === 13){
            e.preventDefault();
            template.$("form").submit();
        }
    }
});
