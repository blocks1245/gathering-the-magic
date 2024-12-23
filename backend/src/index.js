import express from 'express';
const app = express();
const port = 3000;
import cors from 'cors';
// get all routes
import cardsRouter from './routers/cards_router.js';
import auth from './routers/auth_router.js';
import searchRouter from './routers/search_router.js';

app.use(cors());
app.use(express.json());
// use routes
app.use('/auth', auth);
app.use('/cards', cardsRouter);
app.use('/search', searchRouter);


app.get('/', (req, res) => {
    console.log(req);
    res.send('Hello World!');
    res.json({ message: 'Hello World!' });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});