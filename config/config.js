const config ={
    env:process.env.NODE_ENV || 'dev',
    port : 3001,
    db_name : "test",
    db_username : "postgres",
    db_password : "admin",
    jwtSecret : process.env.JWT_SECRET || 'Your_secret_key'
}
export default config