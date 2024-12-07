import { Request, Response } from "express";
import { Brew } from "../models/brew";

export async function getDayWithMostCoffee(req: Request, res: Response) {
  try {
    const overall = await Brew.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$brewTime" } },
          count: { $sum: "$liters" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    const thisMonth = await Brew.aggregate([
      {
        $match: {
          brewTime: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            $lte: new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              0
            ),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$brewTime" } },
          count: { $sum: "$liters" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    return res.status(200).json({
      overall: {
        date: overall[0]._id,
        liters: overall[0].count,
      },
      thisMonth: {
        date: thisMonth[0]._id,
        liters: thisMonth[0].count,
      },
    });
  } catch (e) {
    return res.status(418).json({ message: "Error" });
  }
}
