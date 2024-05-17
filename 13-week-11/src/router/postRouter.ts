import { Hono } from 'hono';
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getUserPosts,
  updatePost,
} from '../controllers/postController';
import { authmiddleware } from '../middlewares/users';

export const postRouter = new Hono();

postRouter.get('/allPosts', getPosts);
postRouter.get('/userPosts', authmiddleware, getUserPosts);
postRouter.post('/createPost', authmiddleware, createPost);
postRouter.get('/post/:id', authmiddleware, getPost);
postRouter.put('/post/:id', authmiddleware, updatePost);
postRouter.delete('/post/:id', authmiddleware, deletePost);