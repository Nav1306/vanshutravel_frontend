import "./HotelCard.css";

export const HotelCard = ({hotelData}) => {

  const {_id , name , image , address , state , rating , price } = hotelData;

  return (
    <div className="relative hotelcard-container shadow cursor-pointer">
      <div >
        <img
          className="img"
          src={image}
          alt={name}
        />
        <div className="hotelcard-details">
          <div className="d-flex align-center">
            <span className="location">{address} , {state}</span>
            <span className="rating d-flex align-center">
              <span className="material-icons-outlined">star</span>
              <span>{rating}</span>
            </span>
          </div>

          <p className="hotel-name">{name}</p>
          <p className="price-details">
            <span className="price">Rs.{price}</span>
            <span>night</span>
          </p>
        </div>
      </div>

      <button className="button btn-wishlist absolute">
        <span className="material-icons favorite cursor">favorite</span>
      </button>
    </div>
  );
};
