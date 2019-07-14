'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('project', {
    dpNumber: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
