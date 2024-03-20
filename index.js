import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/routes';
import dbConnection from './utils/database.js';


const dotenv = require('dotenv');

dotenv.config();

const app = express();

const corsOptions = {
  origin: ['https://lumina-nzfj.vercel.app'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.json());

const port = 8000;

// Homepage route
app.get('/', (req, res) => {
  res.send('Welcome to lumina');
});

routes(app);

dbConnection();

app.listen(port, () => console.log(`index app listening on http://localhost:${port}`));
