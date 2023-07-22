import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todos from './components/TodosPage/Todos';
import TodoComments from './components/TodoCommentsPage/TodoComments';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Todos />} />
                <Route path="/todos/:id/comments" element={<TodoComments />} />
            </Routes>
        </Router>
    );
}

export default App;