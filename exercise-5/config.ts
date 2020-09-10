import dotenv from 'dotenv-safe';

const requireProcessEnv = (name: string) => {
    if(!process.env[name]) {
        throw new Error(`the ${name} environment variable must be set`);
    }
    return process.env[name];
}

dotenv.config();
const config = {
    port: requireProcessEnv('APPLICATION_PORT'),
    mongo: {
        uri: requireProcessEnv('MONGOOSE_URI'),
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
    }
}

export default config;