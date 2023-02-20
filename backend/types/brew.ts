import { Document } from "mongoose";

export interface brewType extends Document {
  liters: number;
  brewerID: number;
  brewTime: Date;
}
