/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('yzj_time_range', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    start_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    end_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    public: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    share: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  }, {
    tableName: 'yzj_time_range'
  });
};
