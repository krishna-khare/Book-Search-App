// src/App.js
import React from 'react';
import BookSearch from './components/BookSearch';

function App() {
  return (
    <div
      className="App min-h-screen bg-gray-900 flex items-center justify-center text-black shadow-md"
    >
      <header className="text-white text-center py-8">
        <h1 className="text-4xl font-bold">Book Search Application</h1>
      </header>
      <main className='ml-auto p-8'>
        <BookSearch />
      </main>
    </div>
  );
}

export default App;
