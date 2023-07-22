import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import TodoComments from './components/TodoCommentsPage/TodoComments';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/todos/:id/comments" element={<TodoComments />} />
            </Routes>
        </Router>
    );
}

export default App;