import React, { useState } from 'react';
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

  const handleSubmit = e => {
    e.preventDefault();
    setNameError(false);
    setPhoneError(false);

    if (name === '') {
      setNameError(true);
    }
    if (phone === '') {
      setPhoneError(true);
    }
    if (name && phone) {
      fetch('https://617d4f611eadc5001713647b.mockapi.io/api/v1/contacts', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ name, phone, category }),
      }).then(() => history.push('/contacts'));
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

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          onChange={e => setName(e.target.value)}
          label="Name"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={nameError}
        />
        <TextField
          className={classes.field}
          onChange={e => setPhone(e.target.value)}
          label="Number"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={phoneError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Number Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={e => setCategory(e.target.value)}
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
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Save
        </Button>
      </form>
    </Container>
  );
}
