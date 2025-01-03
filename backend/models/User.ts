import { PoolClient } from 'pg';

export interface User {
    id: number;
    username: string;
    email: string;
    password_hash: string; // This should not be exposed in API responses
    role: 'admin' | 'user'; // Assuming these are the only roles
    created_at: Date;
    updated_at: Date;
}

export class UserModel {
    private client: PoolClient;

    constructor(client: PoolClient) {
        this.client = client;
    }

    // Fetch all users (excluding password hash for security)
    public async getAllUsers(): Promise<Omit<User, 'password_hash'>[]> {
        const result = await this.client.query('SELECT id, username, email, role, created_at, updated_at FROM users');
        return result.rows;
    }

    // Fetch a user by ID (excluding password hash)
    public async getUserById(id: number): Promise<Omit<User, 'password_hash'> | null> {
        const result = await this.client.query('SELECT id, username, email, role, created_at, updated_at FROM users WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    // Create a new user
    public async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
        const { username, email, password_hash, role } = user;
        const result = await this.client.query(
            'INSERT INTO users(username, email, password_hash, role) VALUES($1, $2, $3, $4) RETURNING *',
            [username, email, password_hash, role]
        );
        return result.rows[0];
    }

    // Update user information (excluding password hash)
    public async updateUser(id: number, user: Partial<User>): Promise<Omit<User, 'password_hash'> | null> {
        const fields = Object.keys(user).filter(key => key !== 'id' && key !== 'password_hash' && key !== 'created_at' && key !== 'updated_at');
        const values = fields.map((_, index) => `$${index + 2}`);
        const setQuery = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');

        const query = `UPDATE users SET ${setQuery} WHERE id = $1 RETURNING id, username, email, role, created_at, updated_at`;
        const result = await this.client.query(query, [id, ...fields.map(key => (user as any)[key])]);

        return result.rows[0] || null;
    }

    // Delete a user
    public async deleteUser(id: number): Promise<boolean> {
        const result = await this.client.query('DELETE FROM users WHERE id = $1', [id]);
        return result.rowCount > 0;
    }
}