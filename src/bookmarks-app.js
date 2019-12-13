import store from './store';
import $ from 'jquery';

//  HTML STRING
const generateButtonsBar = () => {
    return `<section class="main-buttons">
    <button class="btn add-new">New</button>
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

    let icon = bookmark.expanded ? `<i class="fas fa-trash-alt"></i>` : `${generateRating()}`;


    return (
        `<li class="bookmark">
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


// EVENT HANDLERS



const bindEventListeners = () => {

}

// RENDER
const render = () => {
    let html = '';
    if (!store.adding) { // if we are not adding a bookmark...
        html += generateButtonsBar();
        html += generateBookmarksSection();
    }
    $('main').html(html);
}


export default {
    render,
    bindEventListeners
}