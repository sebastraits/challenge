import { connection } from "../../helpers/db";
import { RowDataPacket } from "mysql2";

export interface ICountry extends RowDataPacket {
  name: string;
  population_size: number;
  Percentage_of_total: number;
}

export const getCountriesService = async (
  nameContains: string
): Promise<ICountry[]> => {
  const RES_LIMIT: number = 5;
  const query: string = `SELECT name, population_size, ROUND(((population_size / (SELECT SUM(population_size) FROM countries)) * 100), 2) AS percentage_of_total FROM countries WHERE name LIKE ? ORDER BY population_size DESC LIMIT ?;`;
  const [rows] = await connection
    .promise()
    .query<ICountry[]>(query, [`%${nameContains}%`, RES_LIMIT]);
  return rows;
};
