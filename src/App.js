import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchEngine from './components/SearchEngine.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<SearchEngine />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
