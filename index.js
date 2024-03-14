import express from 'express';
import routes from './routes/routes';

const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

const port = 8000;

// Homepage route
app.get('/', (req, res) => {
  res.send('Welcome to lumina');
});

routes(app);

app.listen(port, () => console.log(`index app listening on http://localhost:${port}`));
