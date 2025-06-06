import React from "react";
import { FaPlus } from "react-icons/fa";

const TopBar = ({ busqueda, setBusqueda, toggleModal }) => {
    return (
        <div className="top-bar">
            <input
                type="text"
                className="input-busqueda"
                placeholder=" Buscar usuarios... "
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
            <button className="btn-agregar" onClick={toggleModal}>
                <FaPlus /> Agregar Usuario
            </button>
        </div>
    );
};

export default TopBar;