/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('yzj_attendanc', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    period_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'yzj_period',
        key: 'id'
      }
    },
    student_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'yzj_student',
        key: 'id'
      }
    },
    create_by: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'yzj_user',
        key: 'id'
      }
    },
    create_at: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    update_at: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'yzj_attendanc'
  });
};
