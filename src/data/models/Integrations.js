'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('integration', {
    announcements: {
      type: DataTypes.BOOLEAN
    },
    assessments: {
      type: DataTypes.BOOLEAN
    },
    baseNav: {
      type: DataTypes.BOOLEAN
    },
    calendar: {
      type: DataTypes.BOOLEAN
    },
    contentExchange: {
      type: DataTypes.BOOLEAN
    },
    courseConversion: {
      type: DataTypes.BOOLEAN
    },
    discussions: {
      type: DataTypes.BOOLEAN
    },
    documents: {
      type: DataTypes.BOOLEAN
    },
    editor: {
      type: DataTypes.BOOLEAN
    },
    files: {
      type: DataTypes.BOOLEAN
    },
    goals: {
      type: DataTypes.BOOLEAN
    },
    gradebook: {
      type: DataTypes.BOOLEAN
    },
    groups: {
      type: DataTypes.BOOLEAN
    },
    LTI: {
      type: DataTypes.BOOLEAN
    },
    notifications: {
      type: DataTypes.BOOLEAN
    },
    telemetry: {
      type: DataTypes.BOOLEAN
    }
  });
};
