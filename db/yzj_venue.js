/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('yzj_venue', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        venue_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        capacity: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
        tableName: 'yzj_venue',
        createdAt: false,
        updatedAt: false
    });
};
