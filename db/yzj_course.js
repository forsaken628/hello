/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('yzj_course', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        course_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        classe_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'yzj_classe',
                key: 'id'
            }
        }
    }, {
        tableName: 'yzj_course',
        createdAt: false,
        updatedAt: false
    });
};
