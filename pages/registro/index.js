import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState } from 'react';
import { Calendar } from '@mantine/dates';
import { useForm } from '@mantine/form';
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

const Registro = () => {
  const [file, setFile] = useState(new DataTransfer());
  const [fileDataURL, setFileDataURL] = useState([]);
  const [valueCalendar, setValueCalendar] = useState(null);

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
  const [dataTranser, setDataTransfer] = useState(initialMaterials);

  const form2 = useForm({
    initialValues: {
      hour: '',
      directions: '',
      city: '',
    },

    validate: {
      hour: (value) => (value !== '' ? null : 'Invalid hour'),
      directions: (value) => (value !== '' ? null : 'Invalid directions'),
      city: (value) => (value !== '' ? null : 'Invalid city'),
    },
  });

  const handleSubmit = (values, who) => {
    form2.reset();

    console.log('SONIDO 1 2 3');
    console.log(values);

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
    setFile(new DataTransfer());
    setFileDataURL([]);

    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully',
    });

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

  const handleChange = (event) => {
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
          <TextInput
            withAsterisk
            label="Direction"
            placeholder="false street 123"
            {...form2.getInputProps('directions')}
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
