'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('analysis', {
    title: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    }
  });
};
