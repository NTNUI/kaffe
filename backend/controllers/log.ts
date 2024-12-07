import { Request, Response } from "express";
import { Brew } from "../models/brew";

export async function logCoffee(req: Request, res: Response) {
  try {
    const doc = await Brew.create({
      liters: req.body.liters,
      brewerID: req.body.brewerID,
      brewTime: new Date().toISOString(),
    });

    const date = new Date(doc.brewTime).toLocaleString("no-EU", {
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return res.status(200).json({ brewTime: date, liters: doc.liters });
  } catch (e) {
    return res.status(418).json({ message: "Error" });
  }
}
