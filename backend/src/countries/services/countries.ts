import mysql, { RowDataPacket } from "mysql2";
import { env } from "process";

const connection = mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
});

interface ICountry extends RowDataPacket {
  name: string;
  population_size: number;
  Percentage_of_total: number;
}

const getCountriesService = async (
  nameContains: string
): Promise<ICountry[]> => {
  const RES_LIMIT = 5
  const query = `SELECT name, population_size, ROUND(((population_size / (SELECT SUM(population_size) FROM countries)) * 100), 2) AS Percentage_of_total FROM countries WHERE name LIKE ? ORDER BY population_size DESC LIMIT ?;`;
  try {
    const [rows] = await connection
      .promise()
      .query<ICountry[]>(query, [`%${nameContains}%`, RES_LIMIT]);
    return rows;
  } catch (error) {
    throw new Error(error);
  }
};

export default getCountriesService;
