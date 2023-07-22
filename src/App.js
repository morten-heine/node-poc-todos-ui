import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todos from './components/TodosPage/Todos';
import TodoComments from './components/TodoCommentsPage/TodoComments';

export const AppContext = createContext();

function App() {
    const [showCompleted, setShowCompleted] = useState(false);

    return (
        <AppContext.Provider value={{ showCompleted, setShowCompleted }}>
            <Router>
                <Routes>
                    <Route path="/" element={<Todos />} />
                    <Route path="/todos/:id/comments" element={<TodoComments />} />
                </Routes>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
