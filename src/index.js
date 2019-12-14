import store from './store';
import bookmarksApp from './bookmarks-app';
import $ from 'jquery';

const main = () => {
    bookmarksApp.render();
    bookmarksApp.bindEventListeners();
    let newItem = JSON.stringify(
        {
            "id": "brittanyjs",
            "title": "Google",
            "url": "http://google.com",
            "desc": "An indie search engine startup",
            "rating": 4
        }
    );
    fetch('https://thinkful-list-api.herokuapp.com/brittany/bookmarks', {
        'METHOD': 'POST',
        'headers': new Headers({
            'Content-Type': 'application/json'
        }),
        'body': newItem
    }
    )
}


$(main());