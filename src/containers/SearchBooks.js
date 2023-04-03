import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { fetchBooks } from '../redux/actions/actionFetchBooks';
import { addBook } from '../redux/actions/actionAddBooks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const SearchBooks = () => {

    const [title, setTitle] = useState('');

    const state = useSelector(state => state.search);
    const dispatch = useDispatch();

    console.log(state);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(fetchBooks(title))
    }

    const handleSave = (title, author) => {
        const bookToSave = { title: title, author: author }
        dispatch(addBook(bookToSave))
        toast.info('Livre enrégistré', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    const displayFetchedBooks = state.isloading ? (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>  
        </div>
    )
    : state.error !== '' ? (
        <p>{state.error}</p>
    )
    :
    (
        state.fetchedBooks.map(data => {
            return (
                <div className="card mb-2" key={data.id}>
                    <div className="card-header">
                        <h5 className="mb-0">
                            <button 
                                className="btn btn-link collapsed"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${data.id}`}
                                aria-expanded="false"
                            >
                                { data.volumeInfo.title }
                            </button>
                        </h5>
                    </div>
                    <div id={ data.id } className="collapse" data-parent="#accordion">
                        <div className="card-body">
                            {
                                data.volumeInfo.hasOwnProperty('imageLinks') &&
                                <img src={ data.volumeInfo.imageLinks.thumbnail } alt={ data.volumeInfo.title } />
                            }

                            <br />
                            <h4 className="card-title">Titre: { data.volumeInfo.title }</h4>
                            <h5 className="card-title">Auteurs: { data.volumeInfo.authors }</h5>
                            <p className="card-text">Description: { data.volumeInfo.description }</p>
                            <a 
                                className="btn btn-outline-secondary" 
                                href={ data.volumeInfo.previewLink } 
                                target="_blank" 
                                rel="noopener noreferrer"
                            > 
                                Plus d'infos                               
                            </a>
                            <button 
                                className="btn btn-outline-secondary ms-3"
                                onClick={() => handleSave(data.volumeInfo.title, data.volumeInfo.authors)}
                            >Enregistrer</button>
                        </div>
                    </div>
                </div>
            )
        })        
    )

    return (
        <main role="main">
            <div className="bg-light p-5 rounded-lg m-3">
                <div className="container text-center">
                    <h1 className="display-4">BOOKS</h1>
                    <p>Indiquez le sujet du livre à rechercher sur Goopgle API</p>

                    <form 
                        className="d-flex flex-row align-items-center flex-wrap justify-content-center"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-3">
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Quoi rechercher ?"
                                required
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <button 
                                className="btn btn-outline-secondary ms-3"
                            >Rechercher</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="container" style={{ minHeight: '200px' }}>
                <div id="accordion">
                    { displayFetchedBooks }
                </div>
            </div>
        </main>
    )
}

export default SearchBooks