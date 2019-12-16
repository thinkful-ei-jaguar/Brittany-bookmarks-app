// JUST NEED TO FIGURE OUT WHY MY LIST API IS NOT WORKING AND HOW TO HANDLE PERSISTENCE WHICH I STRUGGLE WITH :( )



import store from './store';
import api from './api';

import $ from 'jquery';

//  HTML STRING
const generateButtonsBar = () => {
    return `<section class="main-buttons">
    <form>
    <fieldset>
    <button class="btn js-add-new">New</button>
        <label for="rating-filter">Filter</label>

        <select name="rating" id="rating-filter">
            <option value="0">--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

        </fieldset>
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
    if ($('#rating-filter').val() === 'default') {
        return `<ul>
        ${store.bookmarks.map(bookmark => generateBookmark(bookmark)).join('')}
    </ul>`
    } else {
        return (
            `<ul>
                ${store.bookmarks.filter(bookmark => bookmark.rating >= store.filter).map(bookmark => generateBookmark(bookmark)).join('')}
            </ul>`
        );
    }
}

function generateNewBookmarkForm() {
    return `
    <form class="add-new-form" method="POST">
    <fieldset>
        <legend>Add New Bookmark</legend>


        <label for="add-url">Link:</label>
        <input required id="add-url" type="url">

        <label for="add-title">Title:</label>
        <input required id="add-title" type="text">

        <label for="add-desc">Description:</label>
        <textarea name="add-desc" id="add-desc" cols="30" rows="10" placeholder="Add Description (optional)"></textarea>

        <label for="add-rating">Rating:</label>
        <select name="add-rating" id="add-rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

        <div class="form-buttons">
            <button class="btn cancel-btn js-cancel-btn">Cancel</button>
            <button class="btn submit-btn" type="submit">Submit</button>
        </div>

    </fieldset>
</form>`
}

// EVENT HANDLERS
const handleAddNewClicked = function () {
    $('main').on('click', '.js-add-new', e => {
        store.toggleAdding();
        render();
    })
}

const handleDeleteItemClicked = function () {
    $('main').on('click', '.js-delete-bookmark', e => {
        const id = getItemIdFromElement(e.currentTarget);
        api.deleteBookmark(id)
            .then(res => res.json())
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
        store.filterBookmarksByRating(rating);
        render();
    })
}

const handleNewFormSubmit = function () {
    $('main').on('submit', '.add-new-form', e => {
        e.preventDefault();
        const newUrl = $('#add-url').val();
        const newTitle = $('#add-title').val();
        const newDesc = $('#add-desc').val();
        const newRating = $('#add-rating').val();

        api.createNewBookmark({
            title: newTitle,
            url: newUrl,
            desc: newDesc,
            rating: newRating,
            expanded: false
        })
            .then(res => res.json())
            .then(bookmark => {
                console.log(`Bookmark created: ${bookmark}`);
                store.addBookmark(bookmark);
                store.toggleAdding();
                render();
            })
            .catch(e => console.log(`There was an error! ${e.message}`))
    })
}


// handle expanded clicked
const handleExpandedClicked = function () {
    $('main').on('click', '.title-section', e => {
        console.log(`"handleExpandedCLicked" ran!`);
        const id = getItemIdFromElement(e.currentTarget);
        store.toggleExpanded(id);
        render();
    })
}

const handleCancelClicked = function () {
    $('main').on('click', '.js-cancel-btn', e => {
        store.toggleAdding();
        render();
    })
}

const bindEventListeners = () => {
    handleAddNewClicked();
    handleDeleteItemClicked();
    handleFilterChange();
    handleNewFormSubmit();
    handleExpandedClicked();
    handleCancelClicked();
}

// OTHER
const getItemIdFromElement = function (item) {
    return $(item)
        .closest('.js-bookmark-element')
        .data('item-id');
};

// RENDER
const render = () => {
    // // ** NEED TO PULL DATA FROM API
    // api.fetchBookmarks()
    //     .then(bookmarks => {
    //         store.
    //     })
    console.log(`store.bookmarks: ${store.bookmarks}`);
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