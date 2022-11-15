import Image from 'next/image';
import bannerePic from '../public/img/reciclaje.webp';
import Router from 'next/router';

const Header = () => {
  const handleHome = () => {
    const { pathname } = Router;
    Router.push('/');
  };

  return (
    <div>
      <div className="BannerContainer">
        <div className="BannerLogo">
          <a
            onClick={() => {
              handleHome();
            }}
          >
            <Image
              width={150}
              src={bannerePic}
              alt="Banner de reciclaje"
            ></Image>
          </a>
          <h1>Welcome to recycleNET</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
