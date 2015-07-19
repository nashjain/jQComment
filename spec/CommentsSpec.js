describe("jQuery Comments Plugin", function () {
    var comments;
    beforeEach(function () {
        setFixtures('<div id="comments"></div>');
        comments = $('#comments');
    });

    it("Should add comments div from passed in json", function () {
        comments.jQComments({comment:"First Comment", user:"Naresh"});
        expect(comments).toContainHtml('<div class="comment"><p>First Comment -- Naresh</p></div>');
    });
});
