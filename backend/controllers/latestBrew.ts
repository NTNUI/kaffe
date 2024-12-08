import { Request, Response } from "express";
import { Brew } from "../models/brew";

export async function getLatestBrew(req: Request, res: Response) {
  const { textFormat } = req.body;
  const { norsk } = req.query;

  try {
    const latest = await Brew.aggregate([
      { $sort: { brewTime: -1 } },
      { $limit: 1 },
    ]);
    if (latest.length < 1) {
      return res.status(418).json({
        message: "No coffee brewed yet, sounds like a good time to start!",
      });
    }

    // Calculate the time since the last brew in hours and minutes
    const diffMs = Date.now() - new Date(latest[0].brewTime).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const hoursText =
      diffHours === 1 ? (norsk ? "time" : "hour") : norsk ? "timer" : "hours";
    const minutesText =
      diffMinutes === 1
        ? norsk
          ? "minutt"
          : "minute"
        : norsk
        ? "minutter"
        : "minutes";

    const timeSince = `${diffHours} ${hoursText} ${
      norsk ? "og" : "and"
    } ${diffMinutes} ${minutesText}`;

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
