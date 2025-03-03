import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const CardRecomendaciones = ({ id, title, description, imageUrl }) => {
  return (
    <div>
      <Link to={"/alojamiento/" + id} className="card__recomendaciones">
      {imageUrl ? (
        <img loading="lazy" src={imageUrl} alt={title} className="card__image" />
      ) : (
        <img
          loading="lazy"
          src="/placeholder.jpg"
          alt="Placeholder"
          className="card__image card__image--placeholder"
        />
      )}
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
      </div>
      </Link>
    </div>
  );
};

CardRecomendaciones.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
};

export default CardRecomendaciones;
