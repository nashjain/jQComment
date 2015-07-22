describe("jQuery Comments Plugin (File Fixture)", function () {
    jasmine.getFixtures().fixturesPath = 'base/spec/javascripts/fixtures';
    var comments;

    beforeEach(function () {
        loadFixtures('comments_fixture.html');
        comments = $('#comments');
    });

    it("Should add comments div from passed in json", function () {
        comments.jQComments([{comment:"First Comment", user:"Naresh"}]);
        expect(comments).toContainElement('div.comment');
        expect(comments.find('div.comment').size()).toBe(1);
        expect(comments.find('div.comment div.comment-header')).toContainText('Naresh');
        expect(comments.find('div.comment div.comment-body')).toContainText('First Comment');
    });
});

