import { Request, Response } from "express";
import { Brew } from "../models/brew";

export async function getLitersBetweenDates(req: Request, res: Response) {
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res.status(418).json({
      message: "startDate or endDate not provided",
    });
  }

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59);

    const liters = await calculateLitersBetween(start, end);

    return res.status(200).json({ liters });
  } catch {
    return res.status(418).json({ message: "Error" });
  }
}

const calculateLitersBetween = async (
  start: Date,
  end: Date
): Promise<number> => {
  const result = await Brew.aggregate([
    { $match: { brewTime: { $gte: start, $lte: end } } },
    { $group: { _id: null, liters: { $sum: "$liters" } } },
  ]);

  return result[0]?.liters || 0;
};
