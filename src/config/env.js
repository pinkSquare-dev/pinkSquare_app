import dotenv from 'dotenv';
dotenv.config();

const config = {
    app_port: 4000,
    db_port: 3306,
    db_name: "bookstore",
    db_user: "root",
    db_password: "",
    jwt_secret: "qsdqsdqsd"
}

export default config;