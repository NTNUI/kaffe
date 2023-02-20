import { model, Schema } from "mongoose";
import { brewType } from "../types/brew";

const brewSchema = new Schema<brewType>(
  {
    liters: {
      type: Number,
      required: true,
    },
    brewerID: {
      type: Number,
      required: true,
    },
    brewTime: {
      type: Date,
      required: true,
    },
  },
  { collection: "brew" }
);

const Brew = model<brewType>("Brew", brewSchema);

export { Brew };
