import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { userRouter } from './router/userRouter';

const app = new Hono()

app.use(logger())

app.route('/api/v1/user', userRouter);

app.get('/', (c) => {
  return c.text('Hello from the backend!')
})

export default app
