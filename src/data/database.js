import JsonDB from 'node-json-db';
import Config from 'node-json-db/dist/lib/JsonDBConfig';

const ra_db = new JsonDB(
  new Config('risk_analysis_database', true, false, '/')
);
const settings_db = new JsonDB(
  new Config('settings_database', true, false, '/')
);

export { ra_db, settings_db };
