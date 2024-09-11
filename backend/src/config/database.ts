import { MONGODB_URL, MONGODB_DBNAME } from "./config";

export const dbConnection = {
  url: MONGODB_URL,
  options: {
    dbName: MONGODB_DBNAME,
  },
};
