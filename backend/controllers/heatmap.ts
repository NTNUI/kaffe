import { Request, Response } from "express";
import { Brew } from "../models/brew";

export async function heatmap(req: Request, res: Response) {
  // Last day of this month
  const endDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );
  // First day of two months ago
  const startDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 2,
    1
  );

  try {
    const data = await Brew.aggregate([
      {
        $match: {
          brewTime: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$brewTime" } },
          count: { $sum: "$liters" },
        },
      },
    ]);

    return res.status(200).json({
      data,
      start: Number(startDate),
      end: Number(endDate),
    });
  } catch (e) {
    return res.status(418).json({ message: "Error" });
  }
}
