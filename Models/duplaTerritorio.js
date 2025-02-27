const db = require('./DB');

const DuplaTerritorio = db.sequelize.define("DuplaTerritorio", {
    ID_DUPLA_TERRITORIO: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    DATA_ATRIBUICAO: {
        type: db.Sequelize.DATE,
        allowNull: false,
    },

    DATA_EXPIRACAO: {
        type: db.Sequelize.DATE,
        allowNull: false,
    },

    ID_DUPLA:{
        type: db.Sequelize.INTEGER,
        allowNull:false,
        references:{
            model: "TB_DUPLA",
            key:"ID_DUPLA",

            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    },

    ID_TERRITORIO:{
        type: db.Sequelize.INTEGER,
        allowNull:false,
        references:{
            model: "TB_TERRITORIO",
            key:"ID_TERRITORIO",

            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    }
},{
    tableName: 'TB_DUPLA_TERRITORIO',
    timestamps: true,
});

DuplaTerritorio.associate = (models) => {
    DuplaTerritorio.belongsTo(models.Dupla,{
        foreignKey: "ID_DUPLA",
        as: 'Dupla',

        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    DuplaTerritorio.belongsTo(models.Territorio,{
        foreignKey: "ID_TERRITORO",
        as: 'Territorio',

        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
};

module.exports = DuplaTerritorio;

DuplaTerritorio.sync({force:true});