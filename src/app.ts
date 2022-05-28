import express from 'express';

import ProductRouter from './routes/Product';
import UserRouter from './routes/User';
import OrderRouter from './routes/Order';
import Error from './middlewares/Error';

const app = express();

app.use(express.json());
app.use('/products', ProductRouter);
app.use('/users', UserRouter);
app.use('/orders', OrderRouter);
app.use(Error);

export default app;
