import Image from 'next/image';

const Card = ({ data, id }) => {
  return (
    <div className="cardContainer">
      <h2>{`Request:${id}`}</h2>
      <div className="MinContainer">
        <label>City:</label>
        <p>{data.city}</p>
      </div>
      <div className="MinContainer">
        <label>Direction:</label>
        <p>{data.direction}</p>
      </div>
      <div className="MinContainer">
        <label>Date:</label>
        <p>{data.date}</p>
      </div>

      <div className="MinContainer">
        <label>Hour:</label>
        <p>{data.hour}</p>
      </div>
      <div className="MinContainer">
        <label>State:</label>
        <p>{data.state}</p>
      </div>
      <div className="imgContainer">
        {data.images.map((item, index) => {
          return (
            <div key={index}>
              <Image
                loading="lazy"
                src={item}
                alt={index}
                width={100}
                height={100}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
