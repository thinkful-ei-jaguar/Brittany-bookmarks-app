import store from './store';
import api from './api';

import $ from 'jquery';

//  HTML STRING
const generateButtonsBar = () => {
    return `<section class="main-buttons">
    <button class="btn js-add-new">New</button>
    <button class="btn filter-by">Filter By (dropdown)</button>
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
            ${store.bookmarks.map(bookmark => generateBookmark(bookmark)).join('')}
        </ul>`
    );
}

function generateNewBookmarkForm() {
    // HTML to generate the add new bookmark form
    console.log(`"generateNewBookmarkForm" called!`);
    return `<h2>ADD NEW FORM</h2>`
}

// EVENT HANDLERS
function handleAddNewClicked() {
    $('main').on('click', '.js-add-new', e => {
        store.adding = true;
        render();
    })
}

const handleDeleteItemClicked = function () {
    $('main').on('click', '.js-delete-bookmark', e => {
        const id = getItemIdFromElement(e.currentTarget);
        api.deleteItem(id)
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




const bindEventListeners = () => {
    handleAddNewClicked();
    handleDeleteItemClicked();
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