import Image from 'next/image';
import bannerePic from '../public/img/reciclaje.webp';

const Header = () => {
  return (
    <div>
      <div className="BannerContainer">
        <div className="BannerLogo">
          <Image width={150} src={bannerePic} alt="Banner de reciclaje"></Image>
          <h1>Bienvenido a reciclaNET</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
