import store from './store';
import api from './api';

import $ from 'jquery';

//  HTML STRING
const generateButtonsBar = () => {
    return `<section class="main-buttons">
    <button class="btn js-add-new">New</button>
    <form>
        <label for="rating-filter">Filter</label>

        <select name="rating" id="rating-filter">
            <option value="default">Filter</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    </form>
</section>`;
}

function generateBookmark(bookmark) {
    let expandedSection = bookmark.expanded ? (`<div class="main-section hidden">
    <div class="button-rating">
        <a class="visit-site" href="${bookmark.link}">Visit Site</a>
        <span class="rating-expanded">${bookmark.rating}</span>
    </div>

    <p>
        ${bookmark.description}
    </p>
</div>`) : "";


    const generateRating = () => {
        let htmlString = '';
        for (let i = 1; i <= bookmark.rating; i++) {
            htmlString += `<i class="fas fa-star"></i>`
        }
        return htmlString;
    };

    let icon = bookmark.expanded ? `<i class="js-delete-bookmark fas fa-trash-alt"></i>` : `${generateRating()}`;


    return (
        `<li class="js-bookmark-element" data-item-id="${bookmark.id}">
        <div class="title-section">
            <h2>${bookmark.title}</h2>
            <div class="bar-icon">${icon}</div>
        </div>
        ${expandedSection}
        </li>`
    );
}

const generateBookmarksSection = () => {
    return (
        `<ul>
            ${store.bookmarks.filter(bookmark => bookmark.rating >= store.filter).map(bookmark => generateBookmark(bookmark)).join('')}
        </ul>`
    );
}

function generateNewBookmarkForm() {
    return `<form class="add-bookmark-link" method="POST" action="">

    <label for="add-url">Add New Bookmark:</label>
    <input id="add-url" type="url">

</form>`
}

// EVENT HANDLERS
const handleAddNewClicked = function () {
    $('main').on('click', '.js-add-new', e => {
        store.toggleAdding();
        render();
        api.createNewBookmark({
            title: 'A Great Big World',
            url: 'https://www.google.com'
        }).then(newBookmark => {
            store.addItem(bookmark);
            store.toggleAdding();
            render();
        }).catch(e => console.log('Error adding item!'))
    })
}

const handleDeleteItemClicked = function () {
    $('main').on('click', '.js-delete-bookmark', e => {
        const id = getItemIdFromElement(e.currentTarget);
        api.deleteBookmark(id)
            .then(() => {
                console.log('Item deleted!')
                store.findAndDelete(id);
                render();
            })
            .catch(e => {
                console.log('There was an error deleting item!');
            })
    })
}

const handleFilterChange = function () {
    $('main').on('change', '#rating-filter', e => {
        const rating = e.currentTarget.value;
        $(e.currentTarget).val(rating);
        store.filterBookmarksByRating(rating);
        render();
    })
}


const bindEventListeners = () => {
    handleAddNewClicked();
    handleDeleteItemClicked();
    handleFilterChange();
}

// OTHER
const getItemIdFromElement = function (item) {
    return $(item)
        .closest('.js-bookmark-element')
        .data('item-id');
};

// RENDER
const render = () => {
    let html = '';
    if (!store.adding) { // if we are not adding a bookmark...
        html += generateButtonsBar();
        html += generateBookmarksSection();
    } else {
        html += generateNewBookmarkForm();
    }
    $('main').html(html);
}


export default {
    render,
    bindEventListeners
}