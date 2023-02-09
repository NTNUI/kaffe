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
  },
  { collection: "brew", timestamps: true}
);

const Brew = model<brewType>("Brew", brewSchema);

export { Brew };
