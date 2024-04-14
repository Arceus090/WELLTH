import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './article.css'

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
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

  return (
    <div className="article-container">
    
    
      <h2>All Articles</h2>
            {articles.length === 0 ? (
                <p>No articles available</p>
            ) : (
                <ul className="main-container">
                    {articles.map((article) => (
                        <li key={article._id} className="article-item">
                            <h3>{article.title}</h3>
                            <p>Published by: {article.publishedBy}</p>
                            <p className='sui'>{article.message}</p>
                            
                           
                        </li>
                    ))}
                </ul>
            )}
    </div>
  );
};

export default ArticlesList;
