import { IWine } from './wine.interface';
import mongoose = require("mongoose");
import { Schema, Model, model} from "mongoose";

interface IWineModel extends IWine, mongoose.Document { }

export var WineSchema: Schema = new Schema({
  name: String,
  year: Number,
  country: String,
  district: String,
  producer: String,
  type: String,
  quantity: Number,
  before: Number,
  from: Number,
  comment: String
});

export const Wine: Model<IWineModel> = model<IWineModel>("Wine", WineSchema);