import { Request, Response } from "express";
import { Brew } from "../models/brew";

export async function getLitersForDays(req: Request, res: Response) {
  const { days } = req.body;

  if (!Array.isArray(days) || days.length === 0) {
    return res.status(400).json({ message: "Invalid days array" });
  }

  try {
    // Perform aggregation to group liters by day
    const litersByDay = await Brew.aggregate([
      {
        $match: {
          brewTime: {
            $gte: new Date(`${days[0]}T00:00:00.000Z`),
            $lte: new Date(`${days[days.length - 1]}T23:59:59.999Z`),
          },
        },
      },
      {
        $addFields: {
          day: { $dateToString: { format: "%Y-%m-%d", date: "$brewTime" } },
        },
      },
      {
        $match: { day: { $in: days } },
      },
      {
        $group: {
          _id: "$day",
          liters: { $sum: "$liters" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const litersMap = new Map(
      litersByDay.map((item) => [item._id, item.liters])
    );

    const result = days.map((day) => ({
      date: day,
      liters: litersMap.get(day) || 0,
    }));

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(418).json({ message: "Error" });
  }
}
