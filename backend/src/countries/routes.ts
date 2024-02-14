import { query, validationResult } from "express-validator";
import { getCountries, getAllCountries } from "./controllers/countries.ts";
import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/all", (req: Request, res: Response) => {
  return getAllCountries(req, res);
});

router.get(
  "/",
  query("name").isLength({
    min: 3,
  }),
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(204).send({
        errors: errors.array(),
      });
    }
    return getCountries(req, res);
  }
);

export default router;
