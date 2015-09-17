describe("jQuery Comments Plugin", function () {
    var comments;
    var singleCommentJSON;
    var getURL = 'http://localhost/jQComment/comments.php';

    beforeEach(function () {
        singleCommentJSON = {id:1, msg: "First Comment", user: "Naresh", updatedOn: "2014-09-19T15:28:46.493Z"};
        setFixtures('<div id="comments"></div>');
        comments = $('#comments');
        jasmine.Ajax.install();
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    it("Should give a nice message when passed in json has no comments", function () {
        comments.jQComments();
        expect(comments).not.toContainElement('div.comment');
        expect($('div.comment').size()).toBe(0);
        expect(comments).toContainElement('div.empty');
        expect(comments).toContainText('Be the first one to comment...');
    });

    it("Should add single comment as a div from passed in json", function () {
        comments.jQComments({data: [singleCommentJSON]});
        expect(comments).toContainElement('div.comment');
        expect(comments.find('div.comment').size()).toBe(1);
        expect(comments.find('div.comment div.comment-header')).toContainText('Naresh');
        expect(comments.find('div.comment div.comment-body')).toContainText('First Comment');
    });

    it("Should display the most recent comments on top", function () {
        var opts = {
            data: [singleCommentJSON,
                {id:2, msg: "Second Comment", user: "James", updatedOn: "2014-06-19T15:28:46.493Z"},
                {id:3, msg: "Third Comment", user: "Jack", updatedOn: "2014-12-19T15:28:46.493Z"}]
        };
        comments.jQComments(opts);
        expect(comments.find('div.comment').size()).toBe(opts.data.length);
        expect(comments.find('div.comment div.comment-header:first')).toContainText('Jack');
        expect(comments.find('div.comment div.comment-header:last')).toContainText('James');
    });

    it("Should not display private comments to guest user", function () {
        singleCommentJSON.private = true;
        comments.jQComments({data: [singleCommentJSON]});
        expect(comments.find('div.comment').size()).toBe(0);
        expect(comments).toContainText('Be the first one to comment...');
    });

    it("Should not display private comments to public", function () {
        singleCommentJSON.private = true;
        comments.jQComments({data: [singleCommentJSON], loggedInUser: 'Another User'});
        expect(comments.find('div.comment').size()).toBe(0);
        expect(comments).toContainText('Be the first one to comment...');
    });

    it("Should display private comments to author", function () {
        singleCommentJSON.private = true;
        comments.jQComments({data: [singleCommentJSON], loggedInUser: 'Naresh'});
        expect(comments.find('div.comment').size()).toBe(1);
        expect(comments.find('div.comment div.comment-header')).toContainText('Naresh');
    });

    it("Should fetch data from URL and display comments", function () {
        var expectedAjaxResponse = [
            singleCommentJSON,
            {id:2, msg: "Second Comment", user: "James", updatedOn: "2014-06-19T15:28:46.493Z"},
            {id:3, msg: "Third Comment", user: "Jack", updatedOn: "2014-12-19T15:28:46.493Z"}
        ];
        jasmine.Ajax.stubRequest(getURL).andReturn({
            status: 200,
            statusText: 'HTTP/1.1 200 OK',
            contentType: 'application/json;charset=UTF-8',
            responseText: JSON.stringify(expectedAjaxResponse)
        });

        comments.jQComments({url: getURL});

        expect(comments.find('div.comment').size()).toBe(expectedAjaxResponse.length);
        expect(comments.find('div.comment div.comment-header:first')).toContainText('Jack');
        expect(comments.find('div.comment div.comment-header:last')).toContainText('James');
    });

    it("Should try to fetch data from URL and display error message when unsuccessful", function () {
        jasmine.Ajax.stubRequest(getURL).andReturn({
            status: 400,
            statusText: 'HTTP/1.1 400 Bad Request',
            contentType: 'application/json;charset=UTF-8',
            responseText: ''
        });

        comments.jQComments({url: getURL});

        expect($('div.comment').size()).toBe(0);
        expect(comments).toContainElement('div.error');
        expect(comments).toContainText('Failed to fetch comments from URL...');
    });
});