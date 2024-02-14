import { Request, Response } from "express";
import { getCountriesService, getAllCountriesService } from "../services/countries.ts";

export const getAllCountries = async (req: Request, res: Response) => { 
try {
  const countriesList = await getAllCountriesService();
  res.status(200).send(countriesList);
} catch (err) {
  console.log(err);
  res.status(500).send(err.message);
}
}

export const getCountries = async (req: Request, res: Response) => {
  const nameContains: string = req.query.name.toString();
  try {
    const countriesList = await getCountriesService(nameContains);
    res.status(200).send(countriesList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
