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

export async function getByDate(req: Request, res: Response) {
  try {
    // Expected input: YYYY-MM-DD
    let { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res.status(418).json({
        status: "failure",
        message: "startDate or endDate not provided",
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
  const { textFormat } = req.body;

  try {
    const latest = await Brew.aggregate([
      { $sort: { brewTime: -1 } },
      { $limit: 1 },
    ]);
    if (latest.length < 1) {
      return res
        .status(418)
        .json({
          message: "No coffee brewed yet, sounds like a good time to start!",
        });
    }

    // Calculate the time since the last brew in hours and minutes
    const diffMs = Date.now() - new Date(latest[0].brewTime).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const hoursText = diffHours === 1 ? "hour" : "hours";
    const minutesText = diffMinutes === 1 ? "minute" : "minutes";

    const timeSince = `${diffHours} ${hoursText} and ${diffMinutes} ${minutesText}`;

    const { brewTime, liters } = latest[0];
    const response = {
      brewTime: textFormat
        ? new Date(brewTime).toLocaleString("no-EU", {
            hour12: false,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        : brewTime,
      liters,
      timeSince,
    };
    return res.status(200).json(response);
  } catch (e) {
    return res.status(418).json({ message: `Error: ${e}` });
  }
}

const litersBetween = async function (start: Date, end: Date) {
  const brews = await Brew.aggregate([
    {
      $match: {
        brewTime: {
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

export async function heatmapYear(req: Request, res: Response) {
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

const dateToDay = (date: Date) => {
  return date.toLocaleString("no-EU", {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
