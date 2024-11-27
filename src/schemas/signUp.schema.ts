import { z } from "zod"

export const signUpSchema = z
.object({
    name: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .regex(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, "Por favor, usa solo letras")
        .trim()
        .transform((val) => val.replace(/\s+/g, ' ').trim()),
    email: z
        .string()
        .min(1, "El correo es obligatorio")
        .email({
            message: "Formato incorrecto: example@demo.com"
        })
        .trim()
        .toLowerCase(),
    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(12, "La contraseña debe tener menos de 12 caracteres")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!])[A-Za-z\d@#!]+$/, "La contraseña debe contener al menos una minúscula, una mayúscula, un número y uno de los siguientes caracteres (@, #, or !)"),
    confirmPassword: z.string(),
    phone: z.object({
        prefix: z
            .string({ message: "El prefijo es obligatorio" })
            .regex(/^\+[1-9]\d{0,2}$/, "Introduzca un prefijo correcto"),
        number: z
            .string({ message: "El número de teléfono es obligatorio" })
            .regex(/^\d{6,10}$/, "El número de teléfono debe tener en 6 y 10 dígitos"),
    }),
    role: z
        .enum(["tourist", "provider"], {
            errorMap: () => ({ message: "Por favor, selecciona un perfil" })
        }),
    age: z
        .boolean()
        .refine(val => val === true, "Para registrarte tienes que ser mayor de edad")
})
.refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
})

export type SignUpSchema = z.infer<typeof signUpSchema>
