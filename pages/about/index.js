import Header from '../../components/Header';
import { BsNewspaper } from 'react-icons/bs';
import { CiGlass } from 'react-icons/ci';
import {
  GiMetalBar,
  GiCardboardBoxClosed,
  GiPlasticDuck,
} from 'react-icons/gi';
import { FaBlenderPhone } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '@mantine/core';
import Router from 'next/router';
const About = () => {
  const handleBack = () => {
    const { pathname } = Router;
    Router.push('/');
  };
  return (
    <div>
      <Header />
      <Button
        onClick={() => {
          handleBack();
        }}
        variant="gradient"
        gradient={{ from: 'teal', to: 'blue', deg: 105 }}
        type="button"
      >
        Back
      </Button>
      <div className="AboutContainer">
        <h2>About recycleNET</h2>
        <h3>What is it?</h3>
        <p>
          It’s a platform to facilitate the utilization of domestic solid waste.
          If you have waste at home that can be recycled, just separate them
          from the rest of the trash and create a request so that other users
          can pick them up from your home and use or dispose them correctly.
          Likewise, other users can see the active requests and select the ones
          that interest them, thus, creating a utilization circle, just as
          simple as that.
        </p>
        <h3>Why?</h3>
        <p>
          Because in Colombia everyday, 12 million tonnes of trash are generated
          each year from which only 17% is recycled according the Green Growth
          Mission from the National Planning Department (DNP). Nevertheless,
          this percentage can be raised to up to 70% according to Superservicios
          ( (La República, 2018) and studies made by other experts in this
          subject, which means there’s a long road to go and this app could help
          to reach this goal. This has a direct impact in our lives because by
          decreasing the waste that ends up in the landfills, it helps to
          increase the life span of these spaces while decreasing the public
          expense for this concept and his could be reflected in the public
          services bills’ price. In addition to this, we avoid impact to the
          environment and to people close to the landfills, as contamination to
          the soil, underground water bodies, air, visual, plagues, etc could be
          prevented as well. Last but not least, it could help to improve life
          quality for recyclers as it will allow them to create routes to
          optimize materials’ gathering and thus, increase their profits.
        </p>
        <h3>What kind of waste can be used?</h3>
        <p>
          In general, waste can be classified as usable and not usable. Usable
          waste are the ones that can be reused or recycled, that is, paper,
          glass, metal, plastic, etc, these include organic waste separated. Non
          usable waste are the ones that should be disposed of in a landfill or
          in a very specific way, this is because they are contaminated and/or
          represent a health hazard, among them there are toilet paper, napkins
          and other dirty packages or implements, hospital waste, batteries,
          medicines, etc.
        </p>
        <h4>Materials examples</h4>
        <div className="ModalMaterials">
          <BsNewspaper />
          <span>Paper</span>
          <p>
            Newspaper, envelopes, file folders, post-it notes, mail, magazines,
            mixed paper, bags, cups, phone books.
          </p>
          <GiCardboardBoxClosed />
          <span>Cardboard</span>
          <p>Paper, boards, juice boxes, tetra paks, box. </p>
          <CiGlass />
          <span>Glass</span>
          <p>Bottles, jar, no plate or pyrex glass. </p>
          <GiPlasticDuck />
          <span>Plastics</span>
          <p>
            Bottles, food containers, trays, dairy tubs, cups, plant pots,
            buckets.
          </p>
          <GiMetalBar />
          <span>Metal</span>
          <p>
            Aluminum cans, aluminum foil, pie tins, tin cans, ferrous scrap
            metal.
          </p>
          <FaBlenderPhone />
          <span>Electronics</span>
          <p>Mobile Phones, electrodomestics, printers, pcs.</p>
          <br />

          <p>
            <b>
              RecycleNET was developed by Ruben Dario Castilla Romero 11/2022
              rcastrome@gmail.com
            </b>
          </p>
          <span>
            <Link href="https://linkedin.com/in/CastRome">
              Linkedin - CastRome
            </Link>
          </span>
          <span>
            <Link href="https://github.com/CastRome"> GitHub - CastRome</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
