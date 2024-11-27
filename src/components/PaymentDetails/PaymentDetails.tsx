import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mastercardLogo from "../../assets/img/iconomastercard.png";
import visaLogo from "../../assets/img/iconovisa.png";

const PaymentDetails: React.FC = () => {
    const location = useLocation();
    const { selectedMethod } = location.state || { selectedMethod: null };
    const navigate = useNavigate();

    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cardError, setCardError] = useState("");
    const [expiryError, setExpiryError] = useState("");
    const [cvvError, setCvvError] = useState("");

    useEffect(() => {
        if (!selectedMethod) {
            navigate("/payment-method");
        }
    }, [selectedMethod, navigate]);

    const cardClass =
        selectedMethod === "mastercard"
            ? "bg-gradient-to-r from-orange-400 to-red-500 text-white"
            : selectedMethod === "visa"
            ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
            : "bg-gray-200 text-slate-800";

    // Formatear número de tarjeta
    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\D/g, ""); // Eliminar todo excepto números
        return cleaned.replace(/(\d{4})(?=\d)/g, "$1 ").trim(); // Formatear en grupos de 4
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCardNumber(formatCardNumber(value));

        if (value.replace(/\D/g, "").length < 16) {
            setCardError("El número de tarjeta debe tener al menos 16 dígitos.");
        } else {
            setCardError("");
        }
    };

    // Validar CVV
    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ""); // Solo números
        setCvv(value);

        if (value.length !== 3) {
            setCvvError("El CVV debe tener 3 dígitos.");
        } else {
            setCvvError("");
        }
    };

    // Validar fecha de vencimiento (MM/DD/AA)
    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ""); // Solo números
        let formatted = "";

        if (value.length <= 2) {
            formatted = value; // Mes
        } else if (value.length <= 4) {
            formatted = `${value.slice(0, 2)}/${value.slice(2, 4)}`; // Mes/Día
        } else {
            formatted = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 6)}`; // Mes/Día/Año
        }

        setExpiryDate(formatted);

        if (value.length >= 2) {
            const month = parseInt(value.slice(0, 2), 10);
            if (month < 1 || month > 12) {
                setExpiryError("Mes inválido. Debe estar entre 01 y 12.");
                return;
            }
        }

        if (value.length >= 4) {
            const day = parseInt(value.slice(2, 4), 10);
            if (day < 1 || day > 31) {
                setExpiryError("Día inválido. Debe estar entre 01 y 31.");
                return;
            }
        }

        if (value.length >= 6) {
            const year = parseInt(value.slice(4, 6), 10);
            if (year < 0) {
                setExpiryError("Año inválido.");
                return;
            }
        }

        setExpiryError("");
    };

    const handlePaymentClick = () => {
        if (!cardError && !expiryError && !cvvError) {
            console.log("Pago realizado con éxito");
        }
    };

    const isFormValid =
        !cardError &&
        !expiryError &&
        !cvvError &&
        cardNumber.length === 19 &&
        cvv.length === 3 &&
        expiryDate.length === 8;

    return (
        <div className="w-full mx-auto h-dvh flex flex-col items-center p-6 pb-20">
            <div className="w-full max-w-md">
                <div className="flex items-center mb-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-2xl flex items-center justify-center bg-transparent border-none"
                        aria-label="Regresar"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 text-black"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold ml-4">Confirmar y pagar</h1>
                </div>

                <div className="mb-6">
                    <div
                        className={`${cardClass} rounded-xl p-6 shadow-md relative`}
                        style={{ height: "180px" }}
                    >
                        <h3 className="text-lg font-bold">MARIA VELLER LOPEZ</h3>
                        <p className="text-sm my-2">
                            {selectedMethod === "mastercard"
                                ? "MasterCard"
                                : selectedMethod === "visa"
                                ? "Visa"
                                : "Selecciona tu tarjeta"}
                        </p>
                        <p className="text-xl font-bold">
                            {cardNumber || "**** **** **** ****"}
                        </p>
                        <div className="absolute bottom-3 right-3">
                            <img
                                src={
                                    selectedMethod === "mastercard"
                                        ? mastercardLogo
                                        : visaLogo
                                }
                                alt={selectedMethod}
                                className="w-17 h-10"
                            />
                        </div>
                    </div>
                </div>

                <form className="space-y-6">
                    <div>
                        <label
                            htmlFor="cardNumber"
                            className="block text-sm text-slate-800 font-medium mb-2"
                        >
                            Número de tarjeta
                        </label>
                        <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="1234 5678 1234 5678"
                            maxLength={19}
                            className="w-full px-4 py-3 text-sm ring-1 ring-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
                        />
                        {cardError && <p className="text-red-500 text-sm">{cardError}</p>}
                    </div>

                    <div>
                        <label
                            htmlFor="cvv"
                            className="block text-sm text-slate-800 font-medium mb-2"
                        >
                            CVV
                        </label>
                        <input
                            type="text"
                            id="cvv"
                            value={cvv}
                            onChange={handleCvvChange}
                            placeholder="123"
                            maxLength={3}
                            className="w-full px-4 py-3 text-sm ring-1 ring-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
                        />
                        {cvvError && <p className="text-red-500 text-sm">{cvvError}</p>}
                    </div>

                    <div>
                        <label
                            htmlFor="expiryDate"
                            className="block text-sm text-slate-800 font-medium mb-2"
                        >
                            Fecha de vencimiento (MM/DD/AA)
                        </label>
                        <input
                            type="text"
                            id="expiryDate"
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            placeholder="MM/DD/AA"
                            maxLength={8}
                            className="w-full px-4 py-3 text-sm ring-1 ring-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-300"
                        />
                        {expiryError && <p className="text-red-500 text-sm">{expiryError}</p>}
                    </div>
                </form>
            </div>

            <div className="fixed bottom-0 left-0 w-full p-3 bg-white container-shadow">
                <div className="flex justify-center items-center space-x-6">
                    <p className="text-lg font-bold text-orange-500">
                        $1200
                        <span className="text-sm text-orange-400"> / 2 Personas</span>
                    </p>
                    <button
                        type="button"
                        className={`w-48 py-3 font-semibold ${
                            isFormValid
                                ? "bg-primary hover:bg-tertiary"
                                : "bg-gray-300 cursor-not-allowed"
                        } text-white rounded-lg`}
                        onClick={handlePaymentClick}
                        disabled={!isFormValid}
                    >
                        Pagar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;
