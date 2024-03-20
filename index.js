import express from 'express';
import routes from './routes/routes';
import dbConnection from './utils/database.js';
import cors from 'cors';


const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

const corsOptions = {
  origin: ['https://lumina-nzfj.vercel.app'],
  credentials: true,
};

app.use(cors(corsOptions));

const port = 8000;

// Homepage route
app.get('/', (req, res) => {
  res.send('Welcome to lumina');
});

routes(app);

dbConnection();

app.listen(port, () => console.log(`index app listening on http://localhost:${port}`));
