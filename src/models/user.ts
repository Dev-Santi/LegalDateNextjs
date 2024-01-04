import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "El email es requerido."],
    },
    password: { type: String, required: [true, "La contraseña es requerida."], select: false },
    name: {
        type: String,
        required: true,
        maxLength: [30, "Nombre demasiado largo"],
    },
});

const User = models.User || model("User", userSchema);
export default User;
