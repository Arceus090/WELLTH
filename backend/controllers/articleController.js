const express = require('express');
const Article = require('../models/Articles');
const verifyToken = require('../middleware/verifyToken');

const articleController = express.Router();

// Create a new article (accessible by authenticated users)
articleController.post('/', verifyToken, async (req, res) => {
    try {
        // Creating a new article object
        const newArticle = new Article({
            title: req.body.title,
            message: req.body.message,
            images: req.body.images,
            publishedBy: req.body.publishedBy,
        });

        // Saving the new article to the database
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all articles (accessible by everyone)
articleController.get('/all/article', async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific article by ID (accessible by everyone)
articleController.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an article (accessible by authenticated users)
articleController.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an article (accessible by authenticated users)
articleController.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = articleController;
