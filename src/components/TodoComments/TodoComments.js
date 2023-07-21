import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './TodoComments.css';
import '../../App.css';
import { getApiBaseUrl } from '../../utils/config.js';

const TodoComments = () => {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const baseUrl = getApiBaseUrl();
        const fetchComments = async () => {
            const response = await fetch(`${baseUrl}/todos/${id}/comments`);
            const comments = await response.json();
            setComments(comments);
        }

        fetchComments();
    }, [id]);

    const addComment = async () => {
        const baseUrl = getApiBaseUrl();
        const response = await fetch(`${baseUrl}/todos/${id}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment: newComment })
        });
        const comment = await response.json();
        setComments([...comments, comment]);
    }

    return (
        <div>
            <h1>Comments for Todo item #{id}</h1>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment.comment}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
            />
            <button onClick={addComment} className="button">Add Comment</button>
            <Link to="/" className="button">Back to Main Page</Link>
        </div>
    );
}

export default TodoComments;
