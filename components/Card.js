import Image from 'next/image';
import { BsPersonCircle, BsRecycle } from 'react-icons/bs';
import { Carousel } from '@mantine/carousel';
import { Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useState, useEffect } from 'react';

const Card = ({ data, id }) => {
  const [opened, { close, open }] = useDisclosure(false);
  //const [carouselH, setCarouselH] = useState(500);
  const autoplay = useRef(Autoplay({ delay: 8000 }));

  console.log('data', data);

  return (
    <div className="cardContainer">
      <Modal
        opened={opened}
        onClose={close}
        size="auto"
        withCloseButton={false}
      >
        <div className="ItemCarousel">
          <Carousel
            slideSize="100%"
            width={400}
            height={400}
            orientation="horizontal"
            slideGap="sm"
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            withControls={true}
            loop
            withIndicators
          >
            {data.images.map((item, index) => {
              return (
                <div key={index}>
                  <Carousel.Slide>
                    <Image
                      width={400}
                      height={400}
                      src={item}
                      alt={index}
                    ></Image>
                  </Carousel.Slide>
                </div>
              );
            })}

            {/* ...slides */}
          </Carousel>
        </div>
      </Modal>
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
      <div className="MinContainer">
        <label>Materials:</label>
        <p>
          {data.materials.map((item) => {
            return `${item} `;
          })}
        </p>
      </div>
      <div className="imgContainer">
        {data.images.map((item, index) => {
          return (
            <div key={index}>
              <Image
                onClick={open}
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
      <Button onClick={open}>See images</Button>
      {typeof data.userId === 'undefined' ? null : typeof data.userId[0] ===
        'undefined' ? null : (
        <div className="MinContainer">
          <span>
            <BsPersonCircle />
          </span>
          <p>{`${data.userId[0].name} ${data.userId[0].lastname} (${data.userId[0].email})`}</p>
        </div>
      )}

      <div className="MinContainer">
        <span>
          <BsRecycle />
        </span>
        {typeof data.recyclerId === 'undefined' ? (
          <p>not asing</p>
        ) : typeof data.recyclerId[0] === 'undefined' ? null : (
          <p>{`${data.recyclerId[0].name} ${data.recyclerId[0].lastname} (${data.recyclerId[0].email})`}</p>
        )}
      </div>
    </div>
  );
};

export default Card;
