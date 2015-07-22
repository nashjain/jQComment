Comment = function (data) {
    this.user = data.user;
    this.comment = data.comment;
};

Comment.prototype.toHtml = function ($) {
    var header = $("<div>").addClass("comment-header").append(this.user);
    var commentBody = $("<div>").addClass("comment-body").append(this.comment);
    return $("<div>").addClass("comment").append(header).append(commentBody);
};

Comments = function (data) {
    this.data = data;
};

Comments.prototype.toHtml = function ($) {
    if (this.data.length == 0) {
        return $("<div>").addClass("empty").append("Be the first one to comment...");
    }

    var innerHTML = $("<div>");
    $(this.data).each(function () {
        innerHTML.append((new Comment(this)).toHtml($));
    });
    return innerHTML.html();
};

(function ($) {
    $.fn.jQComments = function (data) {
        $(this).append((new Comments(data)).toHtml($));
        return this;
    }
})(jQuery);
