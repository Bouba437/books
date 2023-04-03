import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducerAddBooks from './reducers/reducerAddBooks';
import thunk from 'redux-thunk';
import reducerFetchedBooks from './reducers/reducerFetchBooks';

const rootReducer = combineReducers({
    library: reducerAddBooks,
    search: reducerFetchedBooks
})



const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;