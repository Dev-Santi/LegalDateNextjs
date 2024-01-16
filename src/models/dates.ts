import { Schema, model, models } from "mongoose";

const datesSchema = new Schema({
    savedDates: [
        {
            date: { type: String },
            description: { type: String },
            alert: { type: Boolean, default: false },
        },
    ],
});

const Dates = models.Dates || model("Dates", datesSchema);
export default Dates;
