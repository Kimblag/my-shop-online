export default{
    JWT: {
        SECRET: process.env.JWT_SECRET || 'secretjwttoken',
    },
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/mern-shop-ts',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD,
    },
    NODEMAILER: {
        SERVICE: process.env.NODEMAILER_SERVICE ||'gmail',
        USER: process.env.NODEMAILER_USER || "store.henry.shoes@gmail.com",
        PASSWORD: process.env.NODEMAILER_PASSWORD || "bctgrvsmdyqhacge"
    }
}