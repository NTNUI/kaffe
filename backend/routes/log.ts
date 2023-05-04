import { Router } from "express";
import {
  getByDate,
  getLatest,
  heatmapYear,
  logCoffee,
} from "../controllers/log";

const routes = Router();

// Params:
// liters: Float
// brewerID: Float
routes.post("/coffee/brew", logCoffee);

// Params:
// startDate: String(YYYY-MM-DD)
// endDate: String(YYYY-MM-DD)
routes.post("/coffee", getByDate);

routes.get("/coffee/latest", getLatest);

routes.get("/coffee/heatmap", heatmapYear);

export default routes;
