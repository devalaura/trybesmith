import express from 'express';

import ProductRouter from './routes/Product';
import UserRouter from './routes/User';
import Error from './middlewares/Error';

const app = express();

app.use(express.json());
app.use('/products', ProductRouter);
app.use('/users', UserRouter);
app.use(Error);

export default app;
