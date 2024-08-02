import dotenv from 'dotenv';

dotenv.config(); // If you exclude this line, the use of an environment variable in this file is impossible.

const application = express();

const PORT = process.env.PORT || 3000;
application.listen(PORT, () => {
    console.log(`Listen in the ${PORT} port... \nServer is running normally.`);
});