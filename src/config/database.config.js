import dotenv from 'dotenv';

import { Sequelize } from 'sequelize';

dotenv.config(); // If you exclude this line, using an environment variable in the file is impossible.

const configuration_$sequelize = [process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.PASSWORD, {
    dialect: 'mysql',
    host: process.env.HOST,
    pool: {
        max: 4,
        min: 0,
        acquire: 2400,
        idle: 800,
    },
    operatorAliases: false,
    logging: false,
}];
const sequelize = new Sequelize(...configuration_$sequelize);

export default sequelize; // The connection object is ready to use wherever it is invoked. 