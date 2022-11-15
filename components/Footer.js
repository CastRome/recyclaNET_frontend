import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footerContainer">
      <p>
        RecycleNET was developed by Ruben Dario Castilla Romero 11/2022
        rcastrome@gmail.com
      </p>
      <Link href="https://linkedin.com/in/CastRome">Linkedin - CastRome</Link>
      <Link href="https://github.com/CastRome"> GitHub - CastRome</Link>
    </footer>
  );
};
export default Footer;
