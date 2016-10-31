/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('yzj_classe', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        classe_name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'yzj_classe',
        createdAt: false,
        updatedAt: false
    });
};
