import knex from "knex";
import knexfile from "./knexfile";

const ping = () => {
  mKnex
    .raw("SELECT 1")
    .then(() => {
      console.log("Connection to Pesutupa database is working");
    })
    .catch((err) => {
      // Failure / timeout
      console.error("Couldn't connect Pesutupa database");
      throw err;
    });
};

const mKnex = knex(knexfile);

ping();

export default mKnex;
