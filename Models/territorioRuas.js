const db = require('./DB');

const TerritorioRuas = db.sequelize.define("TerritorioRuas", {
    ID_TERRITORIO_RUAS: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    ID_TERRITORIO: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'TB_TERRITORIO',
            key: 'ID_TERRITORIO',
        },
    },

    ID_RUA :{
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_RUAS',
            key:'ID_RUA',
        },
    },
},{
    tableName: 'TB_TERRITORIO_RUAS',
    timestamps: true,
});

TerritorioRuas.sync({force:true});

module.exports = TerritorioRuas;




