const PORT = process.env.PORT ?? 3000

const SALTROUNDS = parseInt(process.env.SALTROUNDS) || 12;

if (!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY is not defined as environment variable');
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
module.exports = {
    PORT,
    SALTROUNDS,
    JWT_SECRET_KEY
}