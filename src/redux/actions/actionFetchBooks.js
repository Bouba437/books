import { FETCH_BOOKS_LOADING, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_ERROR } from "../constants";
import axios from 'axios';

const fetchBooksLoading = () => {
    return {
        type: FETCH_BOOKS_LOADING
    }
}

const fetchBooksSuccess = data => {
    return {
        type: FETCH_BOOKS_SUCCESS,
        payload: data
    }
}
const fetchBooksError = error => {
    return {
        type: FETCH_BOOKS_ERROR,
        payload: error
    }
}

// const GOOGLE_API_KEY = 'AIzaSyBwauswU3OwUkxHgACZwOKMIEJV_EhxtWk';

export const fetchBooks = title => {
    return dispatch => {
        dispatch(fetchBooksLoading());

        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=20`)
        .then(response => {
            const bookItemsArray = response.data.items
            dispatch(fetchBooksSuccess(bookItemsArray))
        })
        .catch(error => {
            dispatch(fetchBooksError(error.message))
        })
    }
}