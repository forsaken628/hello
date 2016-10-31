/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('yzj_student', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'yzj_user',
                key: 'id'
            }
        },
        student_name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'yzj_student',
        createdAt: false,
        updatedAt: false
    });
};
