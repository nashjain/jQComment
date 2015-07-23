//Comment Model
Comment = function (data) {
    this.user = data.user;
    this.comment = data.comment;
    this.updatedOn = Date.parse(data.updatedOn);
    this.private = data.private || false;
};

Comment.prototype.compareTo = function (other) {
    return this.updatedOn - other.updatedOn;
};

//Comments Model
Comments = function (data) {
    this.data = data.map(function (elem) {
        return new Comment(elem);
    }).sort(function (a, b) {
        return b.compareTo(a);
    });
};

Comments.prototype.authorised = function (loggedInUser) {
    return this.data.filter(function (c) {
        return loggedInUser === c.user || !c.private;
    });
};

//Comments View
function CommentsView() {
}

CommentsView.prototype._msgHtml = function (className, msg, $) {
    return $('<div>').addClass(className).append(msg);
};

CommentsView.prototype._emptyComment = function ($) {
    return this._msgHtml('empty', 'Be the first one to comment...', $);
};

CommentsView.prototype._errorHtml = function ($) {
    return this._msgHtml('error', 'Failed to fetch comments from URL...', $);
};

CommentsView.prototype._toCommentHtml = function (c, $) {
    var header = $('<div>').addClass('comment-header').append(c.user);
    var commentBody = $('<div>').addClass('comment-body').append(c.comment);
    return $('<div>').addClass('comment').append(header).append(commentBody);
};

CommentsView.prototype._toHtml = function (data, loggedInUser, $) {
    var cs = new Comments(data);
    var comments = cs.authorised(loggedInUser);
    if (comments.length == 0)
        return this._emptyComment($);

    var self = this;
    var innerHTML = $('<div>');
    comments.forEach(function (c) {
        innerHTML.append(self._toCommentHtml(c, $));
    });
    return innerHTML.html();
};

CommentsView.prototype._fetchComments = function (url, loggedInUser, $, callback) {
    var self = this;
    $.getJSON(url)
        .done(function (data) {
            callback(self._toHtml(data, loggedInUser, $));
        })
        .fail(function () {
            callback(self._errorHtml($));
        });
};

CommentsView.prototype.applyComments = function (opts, $, callback) {
    if (opts.url)
        this._fetchComments(opts.url, opts.loggedInUser, $, callback);
    else
        callback(this._toHtml(opts.data, opts.loggedInUser, $));
};

(function ($) {
    $.fn.jQComments = function (options) {
        var defaults = {
            data: [],
            url: undefined,
            loggedInUser: undefined
        };
        var opts = $.extend(defaults, options);
        var container = $(this);
        var cv = new CommentsView();
        cv.applyComments(opts, $, function (content) {
            container.append(content);
        });
        return this;
    }
})(jQuery);
