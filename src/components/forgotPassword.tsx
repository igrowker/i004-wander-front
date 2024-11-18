/**
 * @copyright 2024 Luis Iannello
 *
 */


import React, { useState } from 'react';

// Definición de la interfaz para el formulario de olvido de contraseña
interface ForgotPasswordForm {
  email: string; // Solo tiene un campo, el correo electrónico
}

// Definición de las propiedades del componente ForgotPassword
interface ForgotPasswordProps {
  onClose: () => void; // Función para cerrar el modal
}

// Componente funcional ForgotPassword
const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onClose }) => {
  const [form, setForm] = useState<ForgotPasswordForm>({ email: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('aqui la API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: form.email }),
      });

      if (response.ok) {
        setMessage('Se ha enviado un enlace de restablecimiento a tu correo electrónico.');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Ocurrió un error, intenta de nuevo.');
      }
    } catch (error) {
      setMessage('Error de red. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay font-sans"> {/* Aplica Montserrat aquí */}
      <div className="modal-content">
        <button onClick={onClose} className="modal-close">&times;</button>
        <h2 className="forgot-password-title">Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="forgot-password-label">
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="forgot-password-input"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="forgot-password-button"
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
        {message && <p className="forgot-password-message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
