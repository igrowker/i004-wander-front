import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import imagelogo from "../../assets/img/imagelogo.png";
import imageletter from "../../assets/img/imageletter.png";
import "./ConfirmRegister.css";

const ConfirmResetPassword: React.FC = () => {
    const [timer, setTimer] = useState(60); // Temporizador para reenvío de código
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para mostrar el modal de éxito

    // Inicia el temporizador y lo decrementa cada segundo
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, []);

    // Lógica para reenviar el código
    const handleResend = () => {
        if (timer === 0) {
            console.log("Código reenviado");
            setTimer(60); // Reinicia el temporizador
        }
    };

    // Enviar formulario y mostrar modal de éxito
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowSuccessModal(true);
    };

    return (
        <div className="w-full mx-auto h-dvh flex flex-col items-center p-6">
            {/* Marca */}
            <div className="brand">
                <div className="flex flex-col items-center mb-6">
                    <img src={imagelogo} alt="Logo de Wander" className="w-[140px] md:w-[180px] mb-4" />
                    <img src={imageletter} alt="Texto Wander" className="w-[100px] md:w-[160px] mb-2" />
                    <p className="text-black text-base max-sm:text-sm font-bold text-center">Explora nuevas aventuras</p>
                </div>
            </div>

            {/* Formulario */}
            <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&_label]:text-sm [&_label]:text-slate-800 [&_input]:px-4 [&_input]:py-3 [&_input]:text-sm [&_input]:ring-1 [&_input]:ring-slate-200 [&_input]:rounded-full focus:[&_input]:bg-slate-100 focus:[&_input]:outline-none focus:[&_input]:ring-2 focus:[&_input]:ring-slate-300 [&_input]:cursor-default"
            >
                <div>
                    <label htmlFor="code">Ingresa el código</label>
                    <input
                        type="text"
                        id="code"
                        placeholder="123456"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        className="px-4 py-3 text-sm ring-1 ring-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-300"
                    />
                </div>

                {/* Reenvío del código */}
                <div className="text-center text-sm">
                    ¿No recibiste el código?{" "}
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={timer > 0}
                        className={`font-bold ${timer === 0 ? "text-brandYellow hover:text-secondary" : "text-gray-400"}`}
                    >
                        Reenviar
                    </button>{" "}
                    <span className="text-gray-500">
                        {timer > 0 ? `0:${timer.toString().padStart(2, "0")}` : ""}
                    </span>
                </div>

                <button
                    type="submit"
                    className="mt-4 px-4 py-3 font-semibold bg-primary hover:bg-tertiary text-white rounded-full shadow-lg disabled:bg-slate-400 text-center disabled:cursor-not-allowed"
                >
                    Verificar Código
                </button>
            </form>

            {/* Modal de éxito */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-[2rem] p-8 w-80 shadow-lg">
                        <div className="flex flex-col items-center space-y-8">
                            {/* Icono de éxito */}
                            <div className="w-24 h-24 rounded-full bg-brandYellow flex items-center justify-center">
                                <svg
                                    className="w-14 h-14 text-white"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-bold text-center">
                                ¡Código verificado!
                            </h2>

                            <Link to="/login">
                                <button
                                    onClick={() => {
                                        console.log("Navegando al inicio de sesión");
                                    }}
                                    className="w-[200px] py-6 text-white bg-brandYellow rounded-3xl hover:opacity-90 transition-colors mt-8"
                                >
                                    Iniciar Sesión
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConfirmResetPassword;
