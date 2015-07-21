describe("jQuery Comments Plugin (File Fixture)", function () {
    jasmine.getFixtures().fixturesPath = 'base/spec/javascripts/fixtures';
    var comments;

    beforeEach(function () {
        loadFixtures('comments_fixture.html');
        comments = $('#comments');
    });

    it("Should add comments div from passed in json", function () {
        comments.jQComments({comment:"First Comment", user:"Naresh"});
        expect(comments).toContainElement('div.comment p');
        expect(comments).toContainText('First Comment -- Naresh');
        expect($('.comment').size()).toBe(1);
    });
});

