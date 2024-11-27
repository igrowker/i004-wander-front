import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "../../schemas/login.schema";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom"; // Para redirección
import "./LoginForm.css";
import imagelogo from "../../assets/img/imagelogo.png";
import imageletter from "../../assets/img/imageletter.png";

// Constantes de URL de la API
const API_URL = import.meta.env.VITE_API_URL;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // Para la validación en tiempo real
  });

  // Manejo de notificaciones
  const [reqError, setReqError] = useState<string | null>(null);
  const [successNotification, setSuccessNotification] = useState<string | null>(null);

  const onSubmit = async (data: LoginSchema) => {
    try {
      // Aquí se realiza la petición de login
      const response = await axios.post(
        `${API_URL}/auth/login`, // Ruta para login
        {
          email: data.email,
          password: data.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      // Si la respuesta es exitosa, se resetea el formulario y muestra notificación
      if (response.status === 200) {
        reset(); // Limpiar el formulario
        setSuccessNotification("Inicio de sesión exitoso");

        // Guardar el token en localStorage o en un estado global (ejemplo)
        localStorage.setItem("authToken", response.data.token);

        // Redirigir al usuario después del login
        setTimeout(() => navigate("/home"), 2000); // Redirige a la página principal
      }
    } catch (error) {
      // Manejo de errores
      if (error instanceof AxiosError && error.response?.data) {
        if (error.response.data.errors) {
          setReqError(error.response.data.errors.join(", "));
        } else {
          setReqError(error.response.data.message);
        }
      } else {
        setReqError("Error desconocido. Por favor intente de nuevo.");
      }
      setTimeout(() => setReqError(null), 5000);
    }
  };

  return (
    <div className="w-full mx-auto h-dvh flex flex-col items-center p-6">
      <div className="brand">
        <div className="flex flex-col items-center mb-6">
          <img
            src={imagelogo}
            alt="Logo de Wander"
            className="w-[140px] md:w-[180px] mb-4"
          />
          <img
            src={imageletter}
            alt="Texto Wander"
            className="w-[100px] md:w-[160px] mb-2"
          />
          <p className="text-black text-base max-sm:text-sm font-bold text-center">
            Explora nuevas aventuras
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&_label]:text-sm [&_label]:text-slate-800 [&_input]:px-4 [&_input]:py-3 [&_input]:text-sm [&_input]:ring-1 [&_input]:ring-slate-200 [&_input]:rounded-full focus:[&_input]:bg-slate-100 focus:[&_input]:outline-none focus:[&_input]:ring-2 focus:[&_input]:ring-slate-300 [&_input]:cursor-default"
      >
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="john@doe.com"
          />
          {errors.email && (
            <span className="form__error-notification">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="••••••••"
          />
          {errors.password && (
            <span className="form__error-notification">{errors.password.message}</span>
          )}
        </div>
        <div className="text-right">
          <a
            href="/reset-password"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <button
          disabled={isSubmitting || !isValid}
          type="submit"
          className="mt-4 px-4 py-3 font-semibold bg-primary hover:bg-tertiary text-white rounded-full shadow-lg disabled:bg-slate-400 text-center disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Iniciando sesión..." : "Inicia sesión"}
        </button>
        <p className="text-xs text-center">
          ¿Aún no tienes cuenta?
          <a href="/register" className="text-primary hover:text-tertiary font-bold">
            {" "}
            Regístrate
          </a>
        </p>
      </form>
      {reqError && <p className="form__error-notification">{reqError}</p>}
      {successNotification && (
        <p className="form__success-notification">{successNotification}</p>
      )}
    </div>
  );
};

export default Login;
