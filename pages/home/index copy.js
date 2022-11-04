import Header from '../../components/Header';
import { Carousel } from '@mantine/carousel';
import slide1 from '../../public/img/Sld1.jpg';
import slide2 from '../../public/img/Sld2.jpg';
import slide3 from '../../public/img/Sld3.jpg';
import slide4 from '../../public/img/Sld4.jpg';
import slide5 from '../../public/img/Sld5.jpg';
import slide6 from '../../public/img/Sld6.jpg';
import slide7 from '../../public/img/Sld7.jpg';
import slide8 from '../../public/img/Sld8.jpg';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import { IconAt } from '@tabler/icons';
import Swal from 'sweetalert2';
import Autoplay from 'embla-carousel-autoplay';
import { useForm } from '@mantine/form';
import {
  Popover,
  TextInput,
  PasswordInput,
  Group,
  Button,
  Radio,
} from '@mantine/core';
const Home = () => {
  const autoplay = useRef(Autoplay({ delay: 8000 }));
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [popover2Opened, setPopover2Opened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const handleClick = () => {
    const { pathname } = Router;
    Router.push('/registro');
  };

  useEffect(() => {
    localStorage.getItem('token') ? setLoggedIn(true) : null;
  }, []);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value,
        )
          ? null
          : 'Invalid password',
    },
  });
  const form2 = useForm({
    initialValues: {
      name: '',
      lastname: '',
      directions: '',
      email: '',
      password: '',
      role: '',
    },

    validate: {
      name: (value) => (value !== '' ? null : 'Invalid name'),
      lastname: (value) => (value !== '' ? null : 'Invalid lastname'),
      directions: (value) => (value !== '' ? null : 'Invalid directions'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      role: (value) => (value !== '' ? null : 'Invalid role'),
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value,
        )
          ? null
          : 'Invalid password',
    },
  });

  const handleSubmit = (values, who) => {
    form2.reset();
    form.reset();

    console.log('SONIDO 1 2 3');
    console.log(values);

    setPopoverOpened(false);
    setPopover2Opened(false);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully',
    });

    setLoggedIn(true);
    localStorage.setItem('token', 'data.data.token');
    localStorage.setItem('rol', 'data.data.rol');
    localStorage.setItem('email', 'data.data.email');

    if (1 == 2) {
      const Toast2 = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast2.fire({
        icon: 'error',
        title: 'Sign in error',
      });
    }
  };

  const handleCancel = (who) => {
    form2.reset();
    form.reset();
    who === 1
      ? setPopoverOpened(false)
      : who === 2
      ? setPopover2Opened(false)
      : null;
  };

  const handleLoggout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('email');
  };

  return (
    <div>
      <Header></Header>
      <div className="HomeContainer">
        <div className="ItemButtons">
          {!loggedIn ? (
            <div className="BannerButtons">
              {/*     <Button
            variant="gradient"
            gradient={{ from: 'teal', to: 'blue', deg: 105 }}
            onClick={() => {
              handleClick();
            }}
          >
            Sign up
          </Button> */}
              <Popover
                width={300}
                trapFocus
                position="bottom"
                withArrow
                shadow="md"
                opened={popover2Opened}
                onClick={setPopover2Opened}
              >
                <Popover.Target>
                  <Button
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'blue', deg: 105 }}
                  >
                    Sing up
                  </Button>
                </Popover.Target>
                <Popover.Dropdown
                  sx={(theme) => ({
                    background:
                      theme.colorScheme === 'dark'
                        ? theme.colors.dark[7]
                        : theme.white,
                  })}
                >
                  <form
                    onSubmit={form2.onSubmit((values) =>
                      handleSubmit(values, 2),
                    )}
                  >
                    <TextInput
                      withAsterisk
                      label="Name"
                      placeholder="Pepito"
                      {...form2.getInputProps('name')}
                    />
                    <TextInput
                      withAsterisk
                      label="Lastname"
                      placeholder="perez"
                      {...form2.getInputProps('lastname')}
                    />
                    <TextInput
                      withAsterisk
                      label="Direction"
                      placeholder="false street 123"
                      {...form2.getInputProps('directions')}
                    />
                    <TextInput
                      withAsterisk
                      label="Email"
                      placeholder="your@email.com"
                      {...form2.getInputProps('email')}
                    />
                    <PasswordInput
                      // value={password}
                      onChange={(event) =>
                        setPassword(event.currentTarget.value)
                      }
                      placeholder="Password"
                      label="Password"
                      description="Password must include at least one letter, capital letter and number"
                      withAsterisk
                      size="xs"
                      mt="xs"
                      {...form2.getInputProps('password')}
                    />
                    <Radio.Group
                      name="favoriteFramework"
                      label="Are you an user or a recycler"
                      description="please select one"
                      withAsterisk
                      {...form2.getInputProps('role')}
                    >
                      <Radio value="recycler" label="Recycler" color="lime" />
                      <Radio value="user" label="User" color="blue" />
                    </Radio.Group>
                    <Group position="right" mt="md">
                      <Button.Group>
                        <Button
                          variant="gradient"
                          gradient={{ from: 'teal', to: 'blue', deg: 105 }}
                          type="submit"
                        >
                          Submit
                        </Button>
                        <Button
                          type="button"
                          variant="gradient"
                          gradient={{ from: 'red', to: 'red' }}
                          onClick={() => {
                            handleCancel(2);
                          }}
                        >
                          Cancel
                        </Button>
                      </Button.Group>
                    </Group>
                  </form>
                </Popover.Dropdown>
              </Popover>

              <Popover
                width={300}
                trapFocus
                position="bottom"
                withArrow
                shadow="md"
                opened={popoverOpened}
                onClick={setPopoverOpened}
              >
                <Popover.Target>
                  <Button
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'blue', deg: 105 }}
                  >
                    Log in
                  </Button>
                </Popover.Target>
                <Popover.Dropdown
                  sx={(theme) => ({
                    background:
                      theme.colorScheme === 'dark'
                        ? theme.colors.dark[7]
                        : theme.white,
                  })}
                >
                  <form
                    onSubmit={form.onSubmit((values) =>
                      handleSubmit(values, 1),
                    )}
                  >
                    <TextInput
                      withAsterisk
                      label="Email"
                      placeholder="your@email.com"
                      {...form.getInputProps('email')}
                    />
                    <PasswordInput
                      // value={password}
                      onChange={(event) =>
                        setPassword(event.currentTarget.value)
                      }
                      placeholder="Password"
                      label="Password"
                      description="Password must include at least one letter, capital letter and number"
                      withAsterisk
                      size="xs"
                      mt="xs"
                      {...form.getInputProps('password')}
                    />

                    <Group position="right" mt="md">
                      <Button
                        variant="gradient"
                        gradient={{ from: 'teal', to: 'blue', deg: 105 }}
                        type="submit"
                      >
                        Submit
                      </Button>
                      <Button
                        type="button"
                        variant="gradient"
                        gradient={{ from: 'red', to: 'red' }}
                        onClick={() => {
                          handleCancel(1);
                        }}
                      >
                        Cancel
                      </Button>
                    </Group>
                  </form>
                </Popover.Dropdown>
              </Popover>
            </div>
          ) : (
            <div>
              <Button
                variant="gradient"
                gradient={{ from: 'teal', to: 'blue', deg: 105 }}
                type="submit"
                onClick={() => {
                  handleSolicitud();
                }}
              >
                Realizar Solicitud
              </Button>
              <Button
                type="button"
                variant="gradient"
                gradient={{ from: 'red', to: 'red' }}
                onClick={() => {
                  handleLoggout();
                }}
              >
                logout
              </Button>
            </div>
          )}
        </div>
        <div className="ItemCarousel">
          <Carousel
            slideSize="100%"
            width="100%"
            height={350}
            orientation="horizontal"
            slideGap="sm"
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            withControls={true}
            loop
            withIndicators
          >
            <Carousel.Slide>
              <Image
                width="50%"
                height={350}
                src={slide1}
                alt="Banner de reciclaje"
              ></Image>
            </Carousel.Slide>
            <Carousel.Slide>
              <Image
                width="50%"
                height={350}
                src={slide2}
                alt="Banner de reciclaje"
              ></Image>
            </Carousel.Slide>
            <Carousel.Slide>
              <Image
                width="50%"
                height={350}
                src={slide3}
                alt="Banner de reciclaje"
              ></Image>
            </Carousel.Slide>
            <Carousel.Slide>
              <Image
                width="50%"
                height={350}
                src={slide4}
                alt="Banner de reciclaje"
              ></Image>
            </Carousel.Slide>
            <Carousel.Slide>
              <Image
                width="50%"
                height={350}
                src={slide5}
                alt="Banner de reciclaje"
              ></Image>
            </Carousel.Slide>
            <Carousel.Slide>
              <Image
                width="50%"
                height={350}
                src={slide6}
                alt="Banner de reciclaje"
              ></Image>
            </Carousel.Slide>
            <Carousel.Slide>
              <Image
                width="50%"
                height={350}
                src={slide7}
                alt="Banner de reciclaje"
              ></Image>
            </Carousel.Slide>
            <Carousel.Slide>
              <Image
                width="50%"
                height={350}
                src={slide8}
                alt="Banner de reciclaje"
              ></Image>
            </Carousel.Slide>
            {/* ...slides */}
          </Carousel>
        </div>
        <div className="ItemInfo">
          <h2>Información general </h2>
          <p>
            que es reciclaNEET: la idea es.... Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Nunc id cursus metus aliquam
            eleifend. Purus in massa tempor nec feugiat nisl pretium fusce. Sed
            nisi lacus sed viverra tellus in hac habitasse. Volutpat ac
            tincidunt vitae semper quis. Fames ac turpis egestas integer eget
            aliquet nibh. Ridiculus mus mauris vitae ultricies leo integer.
            Massa massa ultricies mi quis hendrerit dolor magna. Dignissim diam
            quis enim lobortis scelerisque fermentum. A pellentesque sit amet
            porttitor eget dolor morbi.
          </p>
        </div>
      </div>
      <Header></Header>
    </div>
  );
};

export default Home;
