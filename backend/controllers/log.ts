import { Request, Response } from "express";
import { json } from "stream/consumers";
import { Brew } from "../models/brew";

export async function logCoffee(req: Request, res: Response) {
  try {
    const doc = await Brew.create({
      liters: req.body.liters,
      brewerID: req.body.brewerID,
    });
    return res.status(200).json(doc);
  } catch (e) {
    return res.status(418).json({ message: "Error" });
  }
}

export async function getByDate(req: Request, res: Response) {
  try {
    // Expected input: YYYY-MM-DD
    let { startDate, endDate } = req.body;

    if (startDate === "" || endDate === "") {
      return res.status(418).json({
        status: "failure",
        message: "Please ensure you pick two dates",
      });
    }

    const liter = await litersBetween(
      new Date(new Date(String(startDate)).setHours(0o0, 0o0, 0o0)),
      new Date(new Date(String(endDate)).setHours(23, 59, 59))
    );

    return res.status(200).json({ liters: liter });
  } catch (e) {
    return res.status(418).json({ message: "Error" });
  }
}

export async function getLatest(req: Request, res: Response) {
  try {
    const latest = await Brew.aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: 1 },
    ]);
    if (latest.length < 1) {
      return res.status(418).json({ message: "No coffee in DB" });
    }

    return res.status(200).json(latest[0]);
  } catch (e) {
    return res.status(418).json({ message: "Error" });
  }
}

const litersBetween = async function (start: Date, end: Date) {
  const brews = await Brew.aggregate([
    {
      $match: {
        createdAt: {
          $gte: start,
          $lte: end,
        },
      },
    },
    { $group: { _id: null, liters: { $sum: "$liters" } } },
  ]);

  let liters = 0;
  if (brews.length == 1) {
    liters = brews[0].liters;
  }
  return liters;
};
