/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('yzj_teacher', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'yzj_user',
                key: 'id'
            }
        },
        teacher_name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'yzj_teacher',
        createdAt: false,
        updatedAt: false
    });
};
