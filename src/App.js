import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchCategories,fetchJoke } from './features/jokesSlice';
import './App.css'


function App() {
const dispatch = useDispatch();
  const { categories, joke, loading, error } = useSelector((state) => state.jokes);
  const [categoryInput, setCategoryInput] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleGetJoke = () => {
    dispatch(fetchJoke(categoryInput.trim().toLowerCase()));
  };

  return (
    <div className="app">
      <header>Chuck Norris Jokes</header>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
        />
        <button onClick={handleGetJoke}>
          {categoryInput.trim()
            ? `Get from ${categoryInput.trim()}`
            : 'Get Random'}
        </button>
      </div>

      {loading && <div className="loading">Loading...</div>}
      {joke && <div className="joke">{joke}</div>}

      {error && (
        <div className="error">
          {error}
          {error === 'No category found' && categories.length > 0 && (
            <div className="categories">
              Available: {categories.join(', ')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
