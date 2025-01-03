'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Include_service extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Include_service.belongsTo(models.CoffeeShop, {
                foreignKey: 'cid',
                sourceKey: 'cid',
                as: 'includeService'
            });
            Include_service.belongsTo(models.Favorite_service, {
                foreignKey: 'sid',
                targetKey: 'sid',
                as: 'shopIncludeFavoriteService'
            });
        }
    }
    Include_service.init({
        cid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        }
    }, {
        sequelize,
        modelName: 'Include_service',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    });
    return Include_service;
};
