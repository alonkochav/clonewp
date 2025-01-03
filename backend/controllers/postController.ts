import { Request, Response } from "express";
import { pool } from "../config/db";
import { QueryResult } from "pg";

// Function to get all posts
export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { rows }: QueryResult = await pool.query("SELECT * FROM posts");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).send("Server error");
  }
};

// Function to get a specific post by id
export const getPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  try {
    const { rows }: QueryResult = await pool.query(
      "SELECT * FROM posts WHERE id = $1",
      [id]
    );
    if (rows.length === 0) {
      res.status(404).send("Post not found");
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).send("Server error");
  }
};

// Function to create a new post
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, content, author_id, category_id } = req.body;
  if (!title || !content || !author_id) {
    res.status(400).send("Title, content, and author_id are required");
    return;
  }

  try {
    const { rows }: QueryResult = await pool.query(
      "INSERT INTO posts(title, content, author_id, category_id) VALUES($1, $2, $3, $4) RETURNING *",
      [title, content, author_id, category_id]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).send("Server error");
  }
};

// Function to update a post
export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  const { title, content, status } = req.body;

  try {
    const { rows }: QueryResult = await pool.query(
      "UPDATE posts SET title = $1, content = $2, status = $3 WHERE id = $4 RETURNING *",
      [title, content, status, id]
    );
    if (rows.length === 0) {
      res.status(404).send("Post not found");
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).send("Server error");
  }
};

// Function to delete a post
export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;

  try {
    const { rowCount }: QueryResult = await pool.query(
      "DELETE FROM posts WHERE id = $1",
      [id]
    );
    if (rowCount === 0) {
      res.status(404).send("Post not found");
    } else {
      res.status(204).send(); // No Content success status
    }
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).send("Server error");
  }
};
