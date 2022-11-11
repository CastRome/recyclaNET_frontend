import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useJwt } from 'react-jwt';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@mantine/dates';
import { useForm } from '@mantine/form';
import Router from 'next/router';
import {
  Popover,
  TextInput,
  PasswordInput,
  Group,
  Button,
  Radio,
  TransferList,
  Select,
  Image,
} from '@mantine/core';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { addrequest } from '../../store/reducer/requestReducer';
import { SearchBox } from '../../components/searchBox';
//AIzaSyDADK25rjdH0W0WL0Kr35HJLTfOTG2z6Bk
const Registro = () => {
  const dispatch = useDispatch();
  const initialMaterials = [
    [
      { value: 'paper', label: 'Paper' },
      { value: 'cardboard', label: 'Cardboard' },
      { value: 'glass', label: 'Glass' },
      { value: 'Plastics', label: 'Plastics' },
      { value: 'Metal', label: 'Metal' },
      { value: 'Electronics', label: 'Electronics' },
    ],
    [],
  ];

  useEffect(() => {
    // const isSSR = typeof window === "undefined";
    // console.log(isSSR);
    console.log('I am only being executed in the browser');
    setFile(new DataTransfer());
    setToken(localStorage.getItem('token'));
  }, []);

  const [file, setFile] = useState(null);
  const [dataTranser, setDataTransfer] = useState(initialMaterials);
  const [fileDataURL, setFileDataURL] = useState([]);
  const [valueCalendar, setValueCalendar] = useState(null);
  const [token, setToken] = useState('');

  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const { isExpired } = useJwt(token);

  const form2 = useForm({
    initialValues: {
      hour: '',
      // direction: '',
      city: '',
    },

    validate: {
      hour: (value) => (value !== '' ? null : 'Invalid hour'),
      //  direction: (value) => (value !== '' ? null : 'Invalid direction'),
      city: (value) => (value !== '' ? null : 'Invalid city'),
    },
  });

  const Toast2 = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
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
  const handleSubmit = async (values) => {
    // form2.reset();

    const materials = dataTranser[1].map((item) => item.value);

    if (
      fileDataURL.length === 0 ||
      materials.length === 0 ||
      address.length === 0
    ) {
      Toast2.fire({
        icon: 'error',
        title: 'Please complete the information.',
      });
      return;
    }

    const date = format(valueCalendar, 'dd/MM/yyyy');

    const dataValues = new FormData();

    dataValues.append('hour', values.hour);
    dataValues.append('direction', address);
    dataValues.append('city', values.city);
    dataValues.append('date', date);
    dataValues.append('materials', materials);
    dataValues.append('state', 'pending');

    const fileSend = file.files;

    for (let i = 0; i < fileSend.length; i++) {
      dataValues.append(`file_${i}`, fileSend[i], fileSend[i].name);
    }

    try {
      const { data } = await axios.post(
        'https://recyclanet.herokuapp.com/api/requests',
        //'http://localhost:8080/api/requests',
        dataValues,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
            withCredentials: true,
          },
        },
      );

      const { pathname } = Router;
      //Router.push('/registro');

      dispatch(addrequest(data));
      Router.push('/ordenes');
      //

      Toast.fire({
        icon: 'success',
        title: 'Request created successfully',
      });
    } catch {
      Toast2.fire({
        icon: 'error',
        title: 'Ups an error happend.',
      });
    }
    //  setFile(new DataTransfer());
    // setFileDataURL([]);
    // setDataTransfer(initialMaterials);
  };

  const handleChange = (event) => {
    console.log('file', file);
    const imageArray = Array.from(event.target.files).map((fil) => {
      file.items.add(fil);
      return URL.createObjectURL(fil);
    });

    setFileDataURL((prevImage) => prevImage.concat(imageArray));
    event.target.value = '';
  };
  const handleClcik = (image) => {
    setFileDataURL(
      fileDataURL.filter((item, index) => {
        if (item === image) {
          file.items.remove(index);
        }
        return item !== image;
      }),
    );
  };

  return (
    <div>
      <Header />
      <div className="SolicitudContainer">
        <h2>Create your request</h2>
        <form onSubmit={form2.onSubmit((values) => handleSubmit(values, 2))}>
          <label htmlFor="Calendar" className="hostform__label">
            please select date
          </label>
          <Calendar
            id="Calendar"
            minDate={new Date()}
            value={valueCalendar}
            onChange={setValueCalendar}
          />
          <Select
            label="Hour"
            placeholder="Pick one"
            nothingFound="No options"
            withAsterisk
            data={[
              '8:00 - 10:00am',
              '10:00am -12:00',
              '12:00 - 2:00pm',
              '2:00 - 4:00pm',
              '4:00 - 6:00pm',
              '6:00 - 8:00pm',
            ]}
            {...form2.getInputProps('hour')}
          />
          <Select
            label="City"
            placeholder="Pick one"
            searchable
            nothingFound="No options"
            withAsterisk
            data={['Barranquilla', 'Bogota', 'Cali', 'Medellin']}
            {...form2.getInputProps('city')}
          />
          {/* <TextInput
            disabled={true}
            withAsterisk
            label="Direction"
            placeholder="false street 123"
            {...form2.getInputProps('direction')}
          /> */}
          <label htmlFor="search" className="hostform__label">
            Direction *
          </label>
          <SearchBox
            onSelectAddress={(address, latitude, longitude) => {
              const str = address
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '')
                .replaceAll(',', '');
              setAddress(str);

              setLatitude(latitude);
              setLongitude(longitude);
              console.log(str, latitude, longitude);
            }}
            defaultValue=""
          />
          <TransferList
            value={dataTranser}
            onChange={setDataTransfer}
            searchPlaceholder="Search..."
            nothingFound="Nothing here"
            titles={['Recycable materials', 'Selected materials']}
            breakpoint="sm"
          />
          <div className="hostform__setmargin">
            Please add photos of the materials
          </div>
          <label htmlFor="file" className="hostform__label">
            + add photos
            <input
              type="file"
              name="file"
              id="file"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="hostform__inputtext"
            />
          </label>
          <div className="imgprev">
            {fileDataURL &&
              fileDataURL.map((image, index) => {
                return (
                  <div key={image} className="hostform__imgprev__card">
                    <Image src={image} alt="previe" height="200"></Image>
                    <button onClick={() => handleClcik(image)}>
                      Delete image
                    </button>
                  </div>
                );
              })}
          </div>

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
      </div>
    </div>
  );
};

export default Registro;
