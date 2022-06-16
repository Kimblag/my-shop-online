export default{
    jwtSecret: process.env.JWT_SECRET || 'secretjwttoken',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/mern-shop-ts',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD,
    }
}