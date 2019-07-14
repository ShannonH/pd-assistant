'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('requirement', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    }
  });
};
