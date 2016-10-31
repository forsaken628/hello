/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('yzj_user', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        auth_key: {
            type: DataTypes.STRING,
            allowNull: true
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_disable: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            defaultValue: '0'
        }
    }, {
        tableName: 'yzj_user',
        createdAt: false,
        updatedAt: false
    });
};
