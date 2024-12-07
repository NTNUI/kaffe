import { Router } from "express";
import { logCoffee } from "../controllers/log";
import { getLitersBetweenDates } from "../controllers/litersBetweenDates";
import { getLatestBrew } from "../controllers/latestBrew";
import { heatmap } from "../controllers/heatmap";
import { getDayWithMostCoffee } from "../controllers/mostCoffeeDays";
import { getLitersForDays } from "../controllers/litersMultipleDays";

const routes = Router();

/**
 * Log a coffee brew.
 * @route POST /coffee/brew
 * @param {number} liters - The amount of coffee brewed (in liters).
 * @param {number} brewerID - The ID of the brewer logging the brew.
 */
routes.post("/coffee/brew", logCoffee);

/**
 * Retrieve the total liters of coffee brewed between two dates.
 * @route POST /coffee
 * @param {string} startDate - The start date of the range (format: YYYY-MM-DD).
 * @param {string} endDate - The end date of the range (format: YYYY-MM-DD).
 */
routes.post("/coffee", getLitersBetweenDates);

/**
 * Retrieve the total liters of coffee brewed for multiple days.
 * @route POST /coffee/days
 * @param {string[]} days - An array of ISO date strings.
 */
routes.post("/coffee/days", getLitersForDays);

/**
 * Retrieve the latest coffee brew.
 * @route GET /coffee/latest
 */
routes.get("/coffee/latest", getLatestBrew);

/**
 * Retrieve values for the heatmap.
 * @route GET /coffee/heatmap
 */
routes.get("/coffee/heatmap", heatmap);

/**
 * Retrieve the days with the most coffee brewed.
 * @route GET /coffee/records
 */
routes.get("/coffee/records", getDayWithMostCoffee);

export default routes;
