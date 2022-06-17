import mongoose from "mongoose"
import config from './config'


mongoose.connect(config.DB.URI)

const connection = mongoose.connection

connection.once('open', () => {
    console.log('MongoDB database connection established successfully', connection.db.databaseName)
});

connection.on('error', err => {
    console.log('MongoDB database connection error:', err)
    process.exit(0)
});