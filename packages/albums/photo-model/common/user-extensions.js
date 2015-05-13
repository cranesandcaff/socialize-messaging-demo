/**
 * Gets the url to the users avatar
 * @method avatar
 * @returns {String} The URL to the
 */
User.prototype.avatarUrl = function (options) {
    var publicId = this.avatarId || User.defaultAvatar;

    return new Photo({publicId:publicId}).url(options);
};
