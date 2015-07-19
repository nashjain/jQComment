jQuery.fn.jQComments = function( data ) {
    return this.each(function() {
        var elem = $("<p>").append(data.comment + " -- " + data.user);
        var commentBody = $("<div>").addClass("comment").append(elem);
        $(this).append(commentBody);
    });
};
