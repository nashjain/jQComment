describe("jQuery Comments Plugin", function () {
    var comments;

    beforeEach(function () {
        setFixtures('<div id="comments"></div>');
        comments = $('#comments');
    });

    it("Should add comments div from passed in json", function () {
        comments.jQComments({comment:"First Comment", user:"Naresh"});
        expect(comments).toContainElement('div.comment p');
        expect(comments).toContainText('First Comment -- Naresh');
        expect($('.comment').size()).toBe(1);
    });
});

