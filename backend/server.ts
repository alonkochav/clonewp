import express, { Request, Response, NextFunction, Express } from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
 

// Add  utility function at the top of your server.ts
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  
 

app.get('/api/health', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
            status: 'healthy',
            dbTime: result.rows[0].now
        });
    } catch (err) {
        if (err instanceof Error) {
            console.error('Health check error:', err);
            res.status(500).json({ status: 'unhealthy', error: err.message });
        } else {
            console.error('Health check error:', err);
            res.status(500).json({ status: 'unhealthy', error: 'An unknown error occurred' });
          }
        
    }
});


 // Then use it like this:
 app.get('/api/posts', asyncHandler(async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query('SELECT * FROM posts');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).send('Server error');
    }
}));
 
app.post('/api/posts', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).send('Title and content are required');
    }

    try {
        const result = await pool.query(
            'INSERT INTO posts(title, content) VALUES($1, $2) RETURNING *',
            [title, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err); // Pass the error to the next middleware for error handling
    }
}));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});