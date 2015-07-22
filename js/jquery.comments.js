Comment = function (data) {
    this.user = data.user;
    this.comment = data.comment;
    this.updatedOn = Date.parse(data.updatedOn);
    this.private = data.private || false;
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

Comments.prototype.toHtml = function ($, loggedInUser) {
    var authorisedComments =  this.data.filter(function (c) {
        return loggedInUser === c.user || !c.private;
    });

    if (authorisedComments.length == 0) {
        return $("<div>").addClass("empty").append("Be the first one to comment...");
    }

    var innerHTML = $("<div>");

    authorisedComments.forEach(function (c) {
            innerHTML.append(c.toHtml($));
    });
    return innerHTML.html();
};

(function ($) {
    $.fn.jQComments = function (options) {
        var defaults = {
            data: [],
            loggedInUser: undefined
        };

        var opts = $.extend( defaults, options );

        $(this).append((new Comments(opts.data)).toHtml($, opts.loggedInUser));
        return this;
    }
})(jQuery);
