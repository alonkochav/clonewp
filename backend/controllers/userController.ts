import { Request, Response } from 'express';
import { pool } from '../config/db';
import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';  // Assuming you're using bcrypt for password hashing

// Function to get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { rows }: QueryResult = await pool.query('SELECT id, username, email, role FROM users');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Server error');
    }
};

// Function to get a specific user by id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
        const { rows }: QueryResult = await pool.query('SELECT id, username, email, role FROM users WHERE id = $1', [id]);
        if (rows.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Server error');
    }
};

// Function to create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
        res.status(400).send('Username, email, and password are required');
        return;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { rows }: QueryResult = await pool.query(
            'INSERT INTO users(username, email, password_hash, role) VALUES($1, $2, $3, $4) RETURNING id, username, email, role',
            [username, email, hashedPassword, role || 'user']
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Server error');
    }
};

// Function to update user information
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { username, email, role } = req.body;

    try {
        const { rows }: QueryResult = await pool.query(
            'UPDATE users SET username = $1, email = $2, role = $3 WHERE id = $4 RETURNING id, username, email, role',
            [username, email, role, id]
        );
        if (rows.length === 0) {
            res.status(404).send('User not found');
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Server error');
    }
};

// Function to delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    try {
        const { rowCount }: QueryResult = await pool.query('DELETE FROM users WHERE id = $1', [id]);
        if (rowCount === 0) {
            res.status(404).send('User not found');
        } else {
            res.status(204).send(); // No Content success status
        }
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Server error');
    }
};

// Function for user login (basic example, should be paired with JWT or session management in production)
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send('Email and password are required');
        return;
    }

    try {
        const { rows }: QueryResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (rows.length === 0) {
            res.status(401).send('Invalid email or password');
            return;
        }

        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            res.status(401).send('Invalid email or password');
            return;
        }

        // Here you would typically generate a JWT or manage session
        res.status(200).json({ message: 'Logged in successfully', user: { id: user.id, username: user.username, role: user.role } });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Server error');
    }
};