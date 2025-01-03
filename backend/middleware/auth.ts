import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';
import { QueryResult } from 'pg';

// Secret key for JWT. In production, this should be stored securely, e.g., environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT token
export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
            // Fetch user from the database to ensure the user still exists
            const { rows }: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);

            if (rows.length > 0) {
                // User found, attach user to request object for further routes
                req.user = rows[0];
                next();
            } else {
                // User not found, token might be for a deleted user
                res.status(401).json({ message: 'Unauthorized: User not found' });
            }
        } catch (err) {
            // Token verification failed
            res.status(403).json({ message: 'Invalid token' });
        }
    } else {
        // No token provided
        res.status(401).json({ message: 'No token provided' });
    }
};

// Middleware to check if the user has the required role
export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ message: 'You do not have the required permissions' });
        } else {
            next();
        }
    }
};

// Example usage in routes:
// app.post('/some-protected-route', authenticateJWT, authorizeRoles('admin'), (req, res) => {
//     // Route handler logic here
// });