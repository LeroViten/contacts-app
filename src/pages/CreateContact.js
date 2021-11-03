import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {
  useCreateContactMutation,
  useFetchContactsQuery,
} from '../redux/contacts/contactSlice';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Loader from 'react-loader-spinner';
import MoveRightHover from '../operations/MoveRightHover';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});

export default function CreateContact() {
  const [category, setCategory] = useState('family');
  const classes = useStyles();
  const history = useHistory();

  const [createContact, { isLoading }] = useCreateContactMutation();
  const { data: contacts } = useFetchContactsQuery();

  const handleSubmit = e => {
    const name = e.currentTarget.name.value;
    const phone = e.currentTarget.number.value;

    e.preventDefault();

    const newContact = {
      name,
      phone,
      category,
    };

    if (name === '') {
      toast.error('Name cannot be empty!', {
        duration: 3000,
        icon: '🤷‍♂️',
        style: {
          border: '1px solid tomato',
          color: '#b00b69',
        },
      });
    }

    if (phone === '') {
      toast.error('Number cannot be empty!', {
        duration: 3000,
        icon: '🤷‍♂️',
        style: {
          border: '1px solid tomato',
          color: '#b00b69',
        },
      });
    }

    if (
      contacts.find(
        contact => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      toast.error('Contact is already in the list', {
        duration: 3000,
        icon: '🤷‍♂️',
        style: {
          border: '1px solid tomato',
          color: '#b00b69',
        },
      });
      e.currentTarget.reset();
      return;
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
          label="Name"
          name="name"
          type="text"
          variant="outlined"
          color="secondary"
          // fullWidth
          required
          helperText="The name can only consist of letters, apostrophe, dash and spaces. For example: Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          inputProps={{
            pattern:
              "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
          }}
        />
        <TextField
          className={classes.field}
          label="Number"
          name="number"
          type="tel"
          variant="outlined"
          color="secondary"
          // fullWidth
          required
          helperText="Phone number can consist of minimum 10 numbers, no spaces, no dashes, no brackets!"
          inputProps={{
            pattern: '^!*([0-9]!*){10,}$',
          }}
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
              name="radio"
            />
            <FormControlLabel
              value="friends"
              control={<Radio />}
              label="Friends"
              name="radio"
            />
            <FormControlLabel
              value="work"
              control={<Radio />}
              label="Work"
              name="radio"
            />
          </RadioGroup>
        </FormControl>

        <MoveRightHover x={5} timing={200}>
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
        </MoveRightHover>
      </form>
    </Container>
  );
}
