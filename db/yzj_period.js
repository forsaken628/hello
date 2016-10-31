/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('yzj_period', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    schedule_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'yzj_schedule',
        key: 'id'
      }
    },
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    teaching_plan: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_complete: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    }
  }, {
    tableName: 'yzj_period'
  });
};
