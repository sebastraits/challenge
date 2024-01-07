import { Request, Response } from "express";
import getCountriesService from "../services/countries.ts";

export const getCountries = async (req: Request, res: Response) => {
  const nameContains: string = req.query.name.toString();
  const countriesList = await getCountriesService(nameContains);
  res.status(200).send(countriesList);
};