describe("jQuery Comments Plugin", function () {
    var comments;

    beforeEach(function () {
        setFixtures('<div id="comments"></div>');
        comments = $('#comments');
    });

    it("Should give a nice message when passed in json has no comments", function () {
        comments.jQComments([]);
        expect(comments).not.toContainElement('div.comment');
        expect($('div.comment').size()).toBe(0);
        expect(comments).toContainElement('div.empty');
        expect(comments).toContainText('Be the first one to comment...');
    });

    it("Should add single comment as a div from passed in json", function () {
        comments.jQComments([{comment:"First Comment", user:"Naresh"}]);
        expect(comments).toContainElement('div.comment');
        expect(comments.find('div.comment').size()).toBe(1);
        expect(comments.find('div.comment div.comment-header')).toContainText('Naresh');
        expect(comments.find('div.comment div.comment-body')).toContainText('First Comment');
    });

    it("Should add multiple comment in the same order", function () {
        var data = [{comment: "First Comment", user: "Naresh"}, {comment: "Second Comment", user: "Jack"}];
        comments.jQComments(data);
        expect(comments.find('div.comment').size()).toBe(data.length);
        expect(comments.find('div.comment div.comment-header:first')).toContainText('Naresh');
        expect(comments.find('div.comment div.comment-header:last')).toContainText('Jack');
    });
});

