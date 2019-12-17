import store from './store';
import bookmarksApp from './bookmarks-app';
import $ from 'jquery';

const main = () => {
    bookmarksApp.start();
    // bookmarksApp.render();
    // bookmarksApp.bindEventListeners();
}


$(main());