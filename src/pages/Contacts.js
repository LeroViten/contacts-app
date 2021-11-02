import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { useSpring, animated } from 'react-spring';
import {
  useDeleteContactMutation,
  useFetchContactsQuery,
} from '../redux/contacts/contactSlice';
import Loader from 'react-loader-spinner';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Masonry from 'react-masonry-css';
import ContactCard from '../components/ContactCard';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

const useStyles = makeStyles({
  field: {
    marginBottom: 10,
    display: 'block',
  },
});

export default function Contacts() {
  const { data, isFetching } = useFetchContactsQuery();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const classes = useStyles();
  const animProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 1000,
  });

  useEffect(() => {
    if (data) {
      setContacts(data);
    }
  }, [data]);

  const handleDelete = async id => {
    deleteContact(id);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      {contacts === [] && <h1>No contacts to show</h1>}
      {isFetching && (
        <Loader
          className="Loader"
          type="Puff"
          color="blue"
          height={100}
          width={100}
        />
      )}
      {isDeleting && (
        <Loader
          className="Loader"
          type="BallTriangle"
          color="blue"
          height={60}
          width={60}
        />
      )}
      <TextField
        className={classes.field}
        label="Search"
        name="search"
        type="text"
        variant="standard"
        color="secondary"
        autoComplete="off"
        // fullWidth
        helperText="Type a name to find"
        onChange={e => setFilter(e.currentTarget.value)}
      />
      {contacts && (
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {visibleContacts.map(contact => (
            <animated.div key={contact.id} style={animProps}>
              <ContactCard
                contact={contact}
                handleDelete={handleDelete}
                deleting={isDeleting}
              />
            </animated.div>
          ))}
        </Masonry>
      )}
    </Container>
  );
}
