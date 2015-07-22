Comment = function (data) {
    this.user = data.user;
    this.comment = data.comment;
    this.updatedOn = Date.parse(data.updatedOn);
};

Comment.prototype.toHtml = function ($) {
    var header = $("<div>").addClass("comment-header").append(this.user);
    var commentBody = $("<div>").addClass("comment-body").append(this.comment);
    return $("<div>").addClass("comment").append(header).append(commentBody);
};

Comment.prototype.compareTo = function (other) {
    return this.updatedOn - other.updatedOn;
};

Comments = function (data) {
    this.data = data.map(function (elem) {
        return new Comment(elem);
    })
    .sort(function(a, b) {
        return b.compareTo(a);
    });
};

Comments.prototype.toHtml = function ($) {
    if (this.data.length == 0) {
        return $("<div>").addClass("empty").append("Be the first one to comment...");
    }

    var innerHTML = $("<div>");

    this.data.forEach(function (c) {
        innerHTML.append(c.toHtml($));
    });
    return innerHTML.html();
};

(function ($) {
    $.fn.jQComments = function (data) {
        $(this).append((new Comments(data)).toHtml($));
        return this;
    }
})(jQuery);
