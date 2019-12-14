const BASE_URL = 'https://thinkful-list-api.herokuapp.com/brittany/bookmarks';

// handle errors where an e is not thrown 
const listApiFetch = (...args) => { // The rest parameter syntax allows us to represent an indefinite number of arguments as an array.
    let error = null;
    fetch(...args)
        .then(res => {
            if (!res.ok) {
                error = { code: res.status } // define our error
            }
            return res.json(); // regardless if err or not, return res.json()
        })
        .then(data => {
            if (error) {
                error.message = data.message;
                return Promise.reject(error);
            }
            return data;
        })
}

const deleteItem = id => {
    return listApiFetch(`${BASE_URL}/${id}`, {
        'method': 'DELETE',
        'headers': new Headers({
            'Content-Type': 'application/json'
        })
    });
}

export default {
    deleteItem
}