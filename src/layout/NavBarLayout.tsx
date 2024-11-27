import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import logoWander from "../assets/img/logowander.png";
import menuIcon from "../assets/icons/icon-menu.svg";
import closeIcon from "../assets/icons/icon-close.svg";

function NavBarLayout() {

  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  // Funcion para abrir y cerrar el modal de navegacion
  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  // No se mostrara la navegacion en la pagina de login y registro
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <>
      {/* Header superior contenedor del logo y el icono de menu */}
      <header className="w-full p-3 shadow-md">
        <div className="flex items-center justify-between">
          <img src={logoWander} alt="logowander" className="w-10 h-8" />
          <img onClick={handleModal} src={menuIcon} alt="menu" className="w-6 h-6 cursor-pointer" />
        </div>
      </header>

      {/* Modal de Navegacion (No funcional hasta que se tengan la mayoria de paginas) */}
      {modalOpen && (
        <div className="fixed top-0 left-0 z-50 flex justify-end w-screen h-screen bg-black/50" onClick={handleModal}>
          <nav
            className="flex flex-col bg-white w-[70%] h-full p-3 animate-navbarAnimation pl-10"
            onClick={(e) => e.stopPropagation()}
          >
            <img onClick={handleModal} src={closeIcon} alt="close icon" className="self-end w-6 h-6 cursor-pointer" />
            <Link to="/" className="text-xl font-bold" onClick={handleModal}>
              Inicio
            </Link>
            <Link to="#" className="text-xl font-bold" onClick={handleModal}>
              Perfil
            </Link>
            <Link to="#" className="text-xl font-bold" onClick={handleModal}>
              Wander
            </Link>
            <Link to="#" className="text-xl font-bold" onClick={handleModal}>
              Login
            </Link>
            <Link to="#" className="text-xl font-bold" onClick={handleModal}>
              Register
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

export default NavBarLayout;