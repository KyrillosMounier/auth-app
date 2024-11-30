import * as dotenv from 'dotenv';


 dotenv.config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    // dataset length for json array for list inputs
    jwt_expiry_minutes :  parseInt(process.env.JWT_EXPIRY_MINUTES, 10) || 8,
    db_connection: process.env.DB_CONNECTION ,
    jwt_secret_key:process.env.JWT_SECRET_KEY,
    db_name:process.env.DB_NAME,
    db_collection_name:process.env.DB_COLLECTION_NAME,

}

export default config