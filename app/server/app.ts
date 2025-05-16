import cors from 'cors';
import express from 'express';
import serveStatic from 'serve-static';
import DbBlobs from './app/db/dbBlobs';
import WalrusRoutes from './app/routers/walrus';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(
    "/",
    serveStatic('../dist', {
        index: ['index.html', '/']
    })
)

app.get('/', async (req, res) => {
    return res.send({ message: '🚀 API is functional 🚀' });
});

app.use('/v1/walrus', WalrusRoutes);

DbBlobs.init();

app.listen(30001, () => console.log(`Server ready at: http://localhost:30001`));

process.on('uncaughtException', err => {
    console.error('uncaughtException', err)
})