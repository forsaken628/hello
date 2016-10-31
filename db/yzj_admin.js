/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('yzj_admin', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'yzj_user',
                key: 'id'
            }
        },
        admin_name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'yzj_admin',
        createdAt: false,
        updatedAt: false
    });
};
