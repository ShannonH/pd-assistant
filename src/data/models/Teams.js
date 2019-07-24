'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('team', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  });
};
