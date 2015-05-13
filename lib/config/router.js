Router.configure({
    layoutTemplate: 'applicationLayout'
});

Router.onBeforeAction(function() {
    if (!Meteor.userId()) {
        this.redirect("/");
    }
    this.next();
},
{
    except:["landing"]
});
