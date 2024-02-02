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

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "El email es requerido."],
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida."],
        select: false,
    },
    name: {
        type: String,
        required: true,
        maxLength: [30, "Nombre demasiado largo"],
    },
    dates: { type: Schema.Types.ObjectId, ref: "Dates" },
});

userSchema.pre("findOne", function () {
    this.populate("dates");
});

export const Dates = models.Dates || model("Dates", datesSchema);
export const User = models.User || model("User", userSchema);
