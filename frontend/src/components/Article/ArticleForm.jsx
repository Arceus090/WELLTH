import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './article.css'

const ArticleForm = () => {
    const [createForm, setCreateForm] = useState({
        title: '',
        message: '',
        images: '',
        publishedBy: ''
    });

    const [updateForm, setUpdateForm] = useState({
        title: '',
        message: '',
        images: '',
        publishedBy: ''
    });

    const [articles, setArticles] = useState([]);
    const [selectedArticleId, setSelectedArticleId] = useState(null);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const res = await axios.get('http://localhost:5000/article/all/article', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setArticles(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateChange = (e) => {
        setCreateForm({ ...createForm, [e.target.name]: e.target.value });
    };

    const handleUpdateChange = (e) => {
        setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/article', createForm, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(res.data);

            setCreateForm({
                title: '',
                message: '',
                images: '',
                publishedBy: ''
            });
            fetchArticles();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/article/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(res.data);
            fetchArticles();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            setSelectedArticleId(id);
            const articleToUpdate = articles.find(article => article._id === id);
            setUpdateForm({
                title: articleToUpdate.title,
                message: articleToUpdate.message,
                images: articleToUpdate.images,
                publishedBy: articleToUpdate.publishedBy
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateSubmit = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/article/${selectedArticleId}`, updateForm, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(res.data);
            fetchArticles();
            setSelectedArticleId(null); // Clear selected article after update
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelUpdate = () => {
        setSelectedArticleId(null); // Clear selected article without updating
    };

    return (
        <div className="article-container">
            <h2>Create Article</h2>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" name="title" placeholder="Title" value={createForm.title} onChange={handleCreateChange} className="form-input" />
                <input type="text" name="message" placeholder="Message" value={createForm.message} onChange={handleCreateChange} className="form-input" />
                <input type="text" name="images" placeholder="Images URL" value={createForm.images} onChange={handleCreateChange} className="form-input" />
                <input type="text" name="publishedBy" placeholder="Published By" value={createForm.publishedBy} onChange={handleCreateChange} className="form-input" />
                <button type="submit" className="form-button">Create Article</button>
            </form>

            <h2>All Articles</h2>
            {articles.length === 0 ? (
                <p>No articles available</p>
            ) : (
                <ul className="main-container">
                    {articles.map((article) => (
                        <li key={article._id} className="article-item">
                            <h3>{article.title}</h3>
                            <p>{article.message}</p>
                            <p>{article.publishedBy}</p>
                            <button onClick={() => handleUpdate(article._id)} className="article-button">Update</button>
                            <button onClick={() => handleDelete(article._id)} className="article-button">Delete</button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Update Form */}
            {selectedArticleId && (
                <div className="update-form-container">
                    <h2>Update Article</h2>
                    <form onSubmit={handleUpdateSubmit} className="form">
                        <input type="text" name="title" placeholder="Title" value={updateForm.title} onChange={handleUpdateChange} className="form-input" />
                        <input type="text" name="message" placeholder="Message" value={updateForm.message} onChange={handleUpdateChange} className="form-input" />
                        <input type="text" name="images" placeholder="Images URL" value={updateForm.images} onChange={handleUpdateChange} className="form-input" />
                        <input type="text" name="publishedBy" placeholder="Published By" value={updateForm.publishedBy} onChange={handleUpdateChange} className="form-input" />
                        <button type="submit" className="form-button">Update Article</button>
                        <button onClick={handleCancelUpdate} className="form-button">Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ArticleForm;
