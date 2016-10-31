/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('yzj_schedule', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        teacher_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'yzj_teacher',
                key: 'id'
            }
        },
        course_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'yzj_course',
                key: 'id'
            }
        },
        venue_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'yzj_venue',
                key: 'id'
            }
        },
        start_at: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        duration: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        has_repeat: {
            type: DataTypes.INTEGER(4),
            allowNull: true
        },
        weekly: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        biweekly: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        month: {
            type: DataTypes.INTEGER(4),
            allowNull: true
        },
        has_end: {
            type: DataTypes.INTEGER(4),
            allowNull: true
        },
        end_on: {
            type: DataTypes.INTEGER(9),
            allowNull: true
        },
        end_at: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
        tableName: 'yzj_schedule',
        createdAt: false,
        updatedAt: false
    });
};
