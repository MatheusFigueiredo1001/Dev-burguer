module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Mf010101',
    database: 'Devburguer',
    define: {
        timestamps: true, //Define horário em que usuário é criado ou atualizado
        underscored: true, //
        underscoredAll: true
    }
}