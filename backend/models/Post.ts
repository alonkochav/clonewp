import { PoolClient } from 'pg';

export interface Post {
    id: number;
    title: string;
    content: string;
    excerpt?: string;
    status: 'published' | 'draft'; // Assuming these are the only possible statuses
    author_id: number;
    category_id?: number;
    created_at: Date;
    updated_at: Date;
}

export class PostModel {
    private client: PoolClient;

    constructor(client: PoolClient) {
        this.client = client;
    }

    // Fetch all posts
    public async getAllPosts(): Promise<Post[]> {
        const result = await this.client.query('SELECT * FROM posts');
        return result.rows;
    }

    // Fetch a post by ID
    public async getPostById(id: number): Promise<Post | null> {
        const result = await this.client.query('SELECT * FROM posts WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    // Create a new post
    public async createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>): Promise<Post> {
        const { title, content, excerpt, status, author_id, category_id } = post;
        const result = await this.client.query(
            'INSERT INTO posts(title, content, excerpt, status, author_id, category_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, content, excerpt, status, author_id, category_id]
        );
        return result.rows[0];
    }

    // Update a post
    public async updatePost(id: number, post: Partial<Post>): Promise<Post | null> {
        const fields = Object.keys(post).filter(key => key !== 'id' && key !== 'created_at' && key !== 'updated_at');
        const values = fields.map((_, index) => `$${index + 2}`);
        const setQuery = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');

        const query = `UPDATE posts SET ${setQuery} WHERE id = $1 RETURNING *`;
        const result = await this.client.query(query, [id, ...fields.map(key => (post as any)[key])]);

        return result.rows[0] || null;
    }

    // Delete a post
    public async deletePost(id: number): Promise<boolean> {
        const result = await this.client.query('DELETE FROM posts WHERE id = $1', [id]);
        return result.rowCount > 0;
    }
}