import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { userRouter } from './router/userRouter';
import { postRouter } from './router/postRouter';
import { tagRouter } from './router/tagRouter';

const app = new Hono()

app.use(logger())

app.route('/api/v1/user', userRouter);
app.route('/api/v1/posts', postRouter);
app.route('/api/v1/tags', tagRouter);

app.get('/', (c) => {
  return c.text('Hello from the backend!')
})

export default app
