const PORT = process.env.PORT ?? 3000

const SALTROUNDS = 10;

const JWT_SECRET = process.env.SECRET || 'mysecretkey';
module.exports = {
    PORT,
    SALTROUNDS,
    JWT_SECRET
}