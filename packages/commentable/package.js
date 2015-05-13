Package.describe({
    name: "socialize:commentable",
    summary: "A package implementing social commenting",
    version: "0.1.0",
});

Package.onUse(function(api) {
    api.versionsFrom("1.0.2.1");

    api.use([
        "meteor", "mongo", "underscore", "socialize:base-model@0.1.3", "socialize:linkable-model@0.1.0", "socialize:likeable@0.1.0",
        "tmeasday:publish-with-relations@0.2.0", "aldeed:simple-schema@1.3.2", "aldeed:collection2@2.3.3",
        "matb33:collection-hooks@0.7.13", "meteorhacks:unblock@1.1.0"
    ]);

    //Add the friend-model files
    api.addFiles("common/commentable-model.js");
    api.addFiles("common/comment-model.js");
    api.addFiles("server/server.js", "server");


    api.export(["CommentableModel", "Comment"]);
});
