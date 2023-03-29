import * as fs from 'fs';

export const loadConfig = () => {
  const rawData = fs.readFileSync('./conf/apiListConfig.json', 'utf-8');
  const jsonData = JSON.parse(rawData);
  return jsonData;
};
