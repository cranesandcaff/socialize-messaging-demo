Package.describe({
    name: "socialize:albums",
    summary: "A package for impmementing social network style photo albums",
    version: "0.1.0",
});

Package.onUse(function(api) {
    api.versionsFrom("1.0.2.1");

    Npm.depends({
        cloudinary: "1.0.11",
        "stream-buffers": "1.0.0"
    });

    api.use([
        "meteor", "mongo", "underscore", "socialize:base-model@0.1.3", "socialize:user-model@0.1.2", "socialize:linkable-model@0.1.0",
        "socialize:likeable@0.1.0", "socialize:commentable@0.1.0", "tmeasday:publish-with-relations@0.2.0",
        "aldeed:simple-schema@1.3.2", "aldeed:collection2@2.3.3", "matb33:collection-hooks@0.7.13",
        "meteorhacks:unblock@1.1.0", "lepozepo:streams@0.2.0", "ejson", "service-configuration"
    ]);

    api.use(["templating", "base64"], "client");

    api.addFiles([
        "uploader/lib/jquery.iframe-transport.js", "uploader/lib/jquery.ui.widget.js", "uploader/lib/jquery.fileupload.js",
        "uploader/lib/jquery.cloudinary.js"
    ], "client");

    api.addFiles([
        "uploader/client/blocks.html", "uploader/client/helpers.js", "uploader/client/controllers.js",
                 "uploader/client/collections.js"
    ], "client");

    api.addFiles("uploader/server/server.js", "server");

    //Add the post-model files
    api.addFiles(["album-model/common/album-model.js", "album-model/common/user-extensions.js"]);
    api.addFiles(["album-model/server/server.js", "album-model/server/publications.js"], "server");

    api.addFiles(["photo-model/common/photo-model.js", "photo-model/common/user-extensions.js"]);
    api.addFiles(["photo-model/server/server.js", "photo-model/server/publications.js"], "server");

    api.export(["Album", "Photo"]);
    api.export("Cloudinary", 'server');
    api.export("_cloudinary", "client");
});
