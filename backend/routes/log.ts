import { Router } from "express";
import { getByDate, getLatest, logCoffee } from "../controllers/log";

const routes = Router();

// Params:
// liters: Float
// brewerID: Float
routes.post("/coffee/brew", logCoffee);

// Params:
// startDate: String(YYYY-MM-DD)
// endDate: String(YYYY-MM-DD)
routes.get("/coffee", getByDate);

routes.get("/coffee/latest", getLatest);

export default routes;
