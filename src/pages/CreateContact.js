import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useCreateContactMutation } from '../redux/contacts/contactSlice';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});

export default function CreateContact() {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [category, setCategory] = useState('friends');

  const [createContact, { isLoading }] = useCreateContactMutation();

  const handleSubmit = e => {
    e.preventDefault();

    const newContact = {
      name: name,
      phone: phone,
      category: category,
    };

    setNameError(false);
    setPhoneError(false);

    if (name === '') {
      setNameError(true);
    }
    if (phone === '') {
      setPhoneError(true);
    }
    if (name && phone) {
      createContact(newContact);

      e.currentTarget.reset();

      toast.success('Contact added', {
        duration: 3000,
        icon: '🤵',
        style: {
          border: '1px solid green',
          color: '#69b00b',
        },
      });

      history.push('/');
    }
  };

  return (
    <Container size="sm">
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Contact
      </Typography>

      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          onChange={e => setName(e.currentTarget.value)}
          label="Name"
          name="name"
          variant="outlined"
          color="secondary"
          // fullWidth
          required
          error={nameError}
        />
        <TextField
          className={classes.field}
          onChange={e => setPhone(e.currentTarget.value)}
          label="Number"
          name="number"
          variant="outlined"
          color="secondary"
          // fullWidth
          required
          error={phoneError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Number Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={e => setCategory(e.currentTarget.value)}
          >
            <FormControlLabel
              value="family"
              control={<Radio />}
              label="Family"
            />
            <FormControlLabel
              value="friends"
              control={<Radio />}
              label="Friends"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          disabled={isLoading}
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          {isLoading && (
            <Loader
              className="Loader"
              type="ThreeDots"
              color="blue"
              height={20}
              width={24}
            />
          )}
          Save
        </Button>
      </form>
    </Container>
  );
}
