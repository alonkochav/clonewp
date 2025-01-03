import { Router, Request, Response } from 'express';
import { Pool } from 'pg';

const router = Router();
const pool = new Pool();

// Get all users
router.get('/', async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query('SELECT id, username, email, role FROM users');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Server error');
    }
});

// Create a new user (simplified; in real scenarios, you'd handle password hashing)
router.post('/', async (req: Request, res: Response) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('Username, email, and password are required');
    }

    try {
        // Note: In production, hash the password before storing!
        const result = await pool.query(
            'INSERT INTO users(username, email, password_hash, role) VALUES($1, $2, $3, $4) RETURNING id, username, email, role',
            [username, email, password, role || 'user']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Server error');
    }
});

// Additional user routes like login, update, delete can be implemented here

export default router;