/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('yzj_student_classe', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        student_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'yzj_student',
                key: 'id'
            }
        },
        classe_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'yzj_classe',
                key: 'id'
            }
        },
        expiry: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '2147483647'
        }
    }, {
        tableName: 'yzj_student_classe',
        underscored: true,
        timestamps: false
    });
};
