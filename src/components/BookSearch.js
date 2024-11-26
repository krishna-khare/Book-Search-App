// src/components/BookSearch.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePublicationDateChange = (e) => {
    setPublicationDate(e.target.value);
  };

  const toggleBookmark = (book) => {
    const isBookmarked = bookmarks.some((b) => b.id === book.id);

    if (isBookmarked) {
      // Remove from bookmarks
      setBookmarks((prevBookmarks) => prevBookmarks.filter((b) => b.id !== book.id));
    } else {
      // Add to bookmarks
      setBookmarks((prevBookmarks) => [...prevBookmarks, book]);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}${category ? `&filter=subject:${category}` : ''}${publicationDate ? `&filter=publishedDate:${publicationDate}` : ''}`
        );
        setBooks(response.data.items);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [query, category, publicationDate]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const isModalClicked = e.target.classList.contains('modal-overlay');
      const isInputFieldClicked = e.target.tagName === 'INPUT';

      if (isModalOpen && isModalClicked && !isInputFieldClicked) {
        handleCloseModal();
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div className="container">
      <h1>Search for your Books</h1>
      <div className="box">
        <input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-80 p-3 border rounded-md focus:outline-none focus:border-primary text-sm"
        />
      </div>

      <div className="box">
        <label className="block text-white text-sm font-bold mb-2">
          Category
        </label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-80 p-2 border rounded-md focus:outline-none focus:border-primary text-sm"
        >
          <option value="">All Categories</option>
          <option value="fiction">Fiction</option>
          <option value="history">History</option>
          {/* Add more category options as needed */}
        </select>
      </div>

      <div className="box">
        <label className="block text-white text-sm font-bold mb-2">
          Publication Date
        </label>
        <input
          type="text"
          placeholder="YYYY-MM-DD"
          value={publicationDate}
          onChange={handlePublicationDateChange}
          className="w-80 p-2 border rounded-md focus:outline-none focus:border-primary text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-4 rounded-md shadow-md">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt="Book cover"
              className="w-70 h-80 object-cover mb-2 rounded-md cursor-pointer"
              onClick={() => handleBookClick(book)}
            />
            <h3 className="text-base font-semibold mb-1 text-primary">
              {book.volumeInfo.title}
            </h3>
            <p className="text-gray-600 text-sm">
              Author: {book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}
            </p>
            {book.volumeInfo.averageRating && (
              <p className="text-gray-600 text-sm">
                Avg Rating: {book.volumeInfo.averageRating} ({book.volumeInfo.ratingsCount} ratings)
              </p>
            )}
            <button
              onClick={() => toggleBookmark(book)}
              className={`mt-2 text-gray-700 hover:text-gray-900 ${bookmarks.some((b) => b.id === book.id) ? 'text-red-500' : ''} text-sm`}
            >
              {bookmarks.some((b) => b.id === book.id) ? 'Remove Bookmark' : 'Bookmark'}
            </button>
          </div>
        ))}
      </div>

      {selectedBook && isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center modal-overlay">
          <div className="bg-white p-4 max-w-sm overflow-y-auto rounded-md">
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <h2 className="text-lg font-semibold mb-2">{selectedBook.volumeInfo.title}</h2>
            <p className="text-gray-600 text-sm mb-2">
              Author: {selectedBook.volumeInfo.authors && selectedBook.volumeInfo.authors.join(', ')}
            </p>
            {selectedBook.volumeInfo.averageRating && (
              <p className="text-gray-600 text-sm">
                Avg Rating: {selectedBook.volumeInfo.averageRating} ({selectedBook.volumeInfo.ratingsCount} ratings)
              </p>
            )}
            <p className="text-gray-800 text-sm">{selectedBook.volumeInfo.description}</p>
            <button
              onClick={() => toggleBookmark(selectedBook)}
              className={`mt-4 text-gray-700 hover:text-gray-900 ${bookmarks.some((b) => b.id === selectedBook.id) ? 'text-red-500' : ''} text-sm`}
            >
              {bookmarks.some((b) => b.id === selectedBook.id) ? 'Remove Bookmark' : 'Bookmark'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
