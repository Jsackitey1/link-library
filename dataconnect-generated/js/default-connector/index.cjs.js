const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'link-library',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

