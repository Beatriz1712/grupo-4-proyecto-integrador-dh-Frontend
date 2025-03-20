import { useNavigate, useParams, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Styles/Detalle.scss";
import Galeria from "../Components/Detalle/Galeria";

const Detalle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();  // ID extraído de la URL
  const [alojamiento, setAlojamiento] = useState(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  const url = `https://insightful-patience-production.up.railway.app/alojamientos/${id}`;

  useEffect(() => {
    if (!location.state) {
      // Si no hay "state", cargar los detalles del alojamiento desde la API
      axios
        .get(url)
        .then((response) => {
          setAlojamiento(response.data);
        })
        .catch((error) => {
          console.error("Error cargando los detalles:", error);
        });
    } else {
      // Si hay "state", usar los datos pasados a través de la navegación
      setAlojamiento(location.state);
    }
  }, [id, location.state]);  // El useEffect se ejecutará cada vez que cambie el id o el estado

  const handleReservarClick = () => {
    setMostrarCalendario(true);
  };

  const confirmarReserva = () => {
    if (!fechaSeleccionada) {
      alert("Por favor, selecciona una fecha antes de confirmar la reserva.");
      return;
    }

    axios
      .post("https://insightful-patience-production.up.railway.app/reservas", {
        alojamientoId: id,
        fecha: fechaSeleccionada.toISOString().split("T")[0],
      })
      .then(() => {
        alert(`¡Reserva confirmada para el ${fechaSeleccionada.toDateString()}!`);
        setMostrarCalendario(false);
      })
      .catch((error) => {
        console.error("Error al realizar la reserva:", error);
        alert("Hubo un problema al realizar la reserva. Intenta de nuevo.");
      });
  };

  if (!alojamiento) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <button className="back-button" onClick={() => navigate("/")}>
        ⬅ Volver
      </button>

      <div className="container-detalle">
        <div className="content">
          <div className="service-container">
            <h2 className="hospedaje-premium">{alojamiento.nombre}</h2>
            <Galeria imagenes={alojamiento.imagenes} />
            <div className="servicio-detalle">
              <h4>Descripción:</h4>
              <p>{alojamiento.descripcion}</p>
              <p>{alojamiento.precio}</p>
            </div>

            <button className="reserve-button" onClick={handleReservarClick}>
              Reservar ahora
            </button>

            {mostrarCalendario && (
              <div className="calendario-wrapper">
                <Calendar onClickDay={setFechaSeleccionada} />
                <button onClick={confirmarReserva} className="confirm-button">
                  Confirmar reserva
                </button>
                <button onClick={() => setMostrarCalendario(false)} className="cancel-button">
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
