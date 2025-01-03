import { Router, Request, Response } from 'express';
import { Pool } from 'pg';

const router = Router();
const pool = new Pool();

// Get all posts
router.get('/', async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query('SELECT * FROM posts');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).send('Server error');
    }
});

// Create a new post
router.post('/', async (req: Request, res: Response) => {
    const { title, content, author_id, category_id } = req.body;
    if (!title || !content || !author_id) {
        return res.status(400).send('Title, content, and author_id are required');
    }

    try {
        const result = await pool.query(
            'INSERT INTO posts(title, content, author_id, category_id) VALUES($1, $2, $3, $4) RETURNING *',
            [title, content, author_id, category_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).send('Server error');
    }
});

// Additional routes for updating, deleting, or fetching a specific post can be added here

export default router;