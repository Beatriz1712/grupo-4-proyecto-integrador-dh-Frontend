import axios from "axios";
import { useNavigate, useParams, useLocation} from "react-router-dom";
import {React, useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "../Styles/Detalle.scss";
import Swal from "sweetalert2";
import Calendario from "../Components/Detalle/Calendario";
import Galeria from "../Components/Detalle/Galeria";
import CalendarioReserva from "./CalendarioReserva"; 

const Detalle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [alojamiento, setAlojamiento] = useState(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState([null, null]);
  const [mascotas, setMascotas] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [userID, setUserID] = useState(null);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState("");
  const [cargando, setCargando] = useState(true);
  const [token, setToken] = useState(null);
  const [nuevaMascotaNombre, setNuevaMascotaNombre] = useState("");
  const [mostrarInputNuevaMascota, setMostrarInputNuevaMascota] = useState(false);
  const [fechasReservadas, setFechasReservadas] = useState([]); // Estado para las fechas reservadas

  const url_base = import.meta.env.VITE_BACKEND_URL;

  // Obtener el token y el usuario al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token) {
      setToken(token);
      setIsLogin(true)
    }

    if (user) {
      try {
        const userData = JSON.parse(user);
        setUserID(userData.id); // Aquí deberías usar userData.id si el ID del usuario está en el objeto user
      } catch (error) {
        console.error("Error al parsear el usuario:", error);
      }
    }
  }, []);

  // Obtener las mascotas cuando el token o el userID cambien
  useEffect(() => {
    if (token && userID) {
      const obtenerMascotas = async () => {
        try {
          setCargando(true);
          const response = await axios.get(`${url_base}/clientes/${userID}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setMascotas(response.data.mascotas);
        } catch (error) {
          console.error("Error al obtener las mascotas:", error);
        } finally {
          setCargando(false);
        }
      };

      obtenerMascotas();
    }
  }, [token, userID]);

  // Obtener los detalles del alojamiento
  useEffect(() => {
    if (!location.state) {
      axios
        .get(`${url_base}/alojamientos/${id}`)
        .then((response) => {
          setAlojamiento(response.data);
        })
        .catch((error) => console.error("Error cargando los detalles:", error));
    } else {
      setAlojamiento(location.state);
    }
  }, [id, location.state]);

  // Obtener las reservas del alojamiento
  useEffect(() => {
    if (alojamiento) {
      axios
        .get(`${url_base}/alojamientos/${id}`)
        .then((response) => {
          console.log("Respuesta del backend:", response.data); // Inspecciona la respuesta
  
          // Verifica si response.data.reservas es un array
          if (response.data.reservas && Array.isArray(response.data.reservas)) {
            const fechasReservadas = response.data.reservas.map((reserva) => ({
              fechaInicio: new Date(reserva.fechaDesde),
              fechaFin: new Date(reserva.fechaHasta),
            }));
            setFechasReservadas(fechasReservadas);
          } else {
            console.warn("No hay reservas para este alojamiento.");
            setFechasReservadas([]); // Inicializa con un array vacío
          }
        })
        .catch((error) => console.error("Error al obtener las reservas:", error));
    }
  }, [alojamiento, id]);

  const handleReserveClick = () => {
    if (!isLogin) {
      Swal.fire({
        title: '¿Quién está ahí?',
        text: 'Para poder realizar reservas, debes iniciar sesión con tu usuario.',
        icon: 'question',
        confirmButtonText: 'Iniciar sesión',
        showCancelButton: true,
        cancelButtonText: 'Por ahora no',
        preConfirm: () => {
          // Redirigir al login
          navigate('/login?from=reservation', { state: { from: location } });  // Usar navigate para redirigir
        }
      });
    } else {
      setMostrarCalendario(true);
    }
  };

  // Función para agregar una nueva mascota
  const agregarMascota = async () => {
    if (nuevaMascotaNombre.trim() === "") {
      alert("Por favor, ingresa un nombre para la mascota.");
      return;
    }

    try {
      setCargando(true);

      // Agregar la nueva mascota
      await axios.post(
        `${url_base}/mascotas`,
        {
          nombre: nuevaMascotaNombre,
          clienteId: userID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Obtener la lista actualizada de mascotas desde el servidor
      const response = await axios.get(`${url_base}/clientes/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Actualizar el estado local con las mascotas actualizadas
      setMascotas(response.data.mascotas);
      setNuevaMascotaNombre(""); // Limpiar el input
      setMostrarInputNuevaMascota(false); // Ocultar el input después de agregar la mascota
    } catch (error) {
      console.error("Error al agregar la mascota:", error);
    } finally {
      setCargando(false);
    }
  };

  // Confirmar la reserva
  const confirmarReserva = () => {
    if (!fechaSeleccionada) {
      alert("Por favor, selecciona una fecha antes de confirmar la reserva.");
      return;
    }

    // Verifica que las fechas sean válidas
    if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
      alert("Las fechas seleccionadas no son válidas.");
      return;
    }

    // Formatea las fechas
    const fechaDesdeFormateada = fechaInicio.toISOString().split("T")[0];
    const fechaHastaFormateada = fechaFin.toISOString().split("T")[0];

    // Envía la solicitud al backend
    axios
      .post(
        `${url_base}/reservas`,
        {
          alojamientoId: id,
          fechaDesde: fechaDesdeFormateada,
          fechaHasta: fechaHastaFormateada,
          mascotaId: mascotaSeleccionada,
          clienteId: userID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert(`¡Reserva confirmada del ${fechaInicio.toLocaleDateString("es-ES")} al ${fechaFin.toLocaleDateString("es-ES")}!`);
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

            {!mostrarCalendario && (
              <button className="reserve-button" onClick={handleReserveClick}>
                Reservar ahora
              </button>
            )}

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