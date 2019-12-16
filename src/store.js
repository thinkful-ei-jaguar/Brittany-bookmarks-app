export default {
    bookmarks: [
        {
            id: 'x56w',
            title: 'Title 1',
            rating: 3,
            url: 'http://www.title1.com',
            description: 'lorem ipsum dolor sit',
            expanded: true
        },
        {
            id: '6ffw',
            title: 'Title 2',
            rating: 5,
            url: 'http://www.title2.com',
            description: 'dolorum tempore deserunt',
            expanded: false
        },
    ],
    adding: false,
    error: null,
    filter: 0,
    findAndDelete: function (id) {
        this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
    },
    addBookmark: function (bookmark) {
        console.log(`Adding bookmark to store...`);
        this.bookmarks.push(bookmark);
    },
    filterBookmarksByRating: function (rating) {
        this.filter = rating;
    },
    toggleAdding: function () {
        this.adding = !this.adding;
    },
    toggleExpanded: function (id) {
        const bookmark = this.bookmarks.find(bookmark => bookmark.id === id);
        bookmark.expanded = !bookmark.expanded;
    }
}

