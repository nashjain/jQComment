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
        comments.jQComments([{comment:"First Comment", user:"Naresh", updatedOn: "2014-12-19T15:28:46.493Z"}]);
        expect(comments).toContainElement('div.comment');
        expect(comments.find('div.comment').size()).toBe(1);
        expect(comments.find('div.comment div.comment-header')).toContainText('Naresh');
        expect(comments.find('div.comment div.comment-body')).toContainText('First Comment');
    });

    it("Should add multiple comment in the same order", function () {
        var data = [{comment: "First Comment", user: "Naresh", updatedOn: "2014-12-19T15:28:46.493Z"}, {comment: "Second Comment", user: "Jack", updatedOn: "2014-06-19T15:28:46.493Z"}];
        comments.jQComments(data);
        expect(comments.find('div.comment').size()).toBe(data.length);
        expect(comments.find('div.comment div.comment-header:first')).toContainText('Naresh');
        expect(comments.find('div.comment div.comment-header:last')).toContainText('Jack');
    });

    it("Should display the most recent comments on top", function () {
        var data = [{comment: "First Comment", user: "Naresh", updatedOn: "2014-09-19T15:28:46.493Z"}, {comment: "Second Comment", user: "James", updatedOn: "2014-06-19T15:28:46.493Z"}, {comment: "Third Comment", user: "Jack", updatedOn: "2014-12-19T15:28:46.493Z"}];
        comments.jQComments(data);
        expect(comments.find('div.comment').size()).toBe(data.length);
        expect(comments.find('div.comment div.comment-header:first')).toContainText('Jack');
        expect(comments.find('div.comment div.comment-header:last')).toContainText('James');
    });
});

