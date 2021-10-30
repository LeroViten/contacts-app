import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Masonry from 'react-masonry-css';
import ContactCard from '../components/ContactCard';

export default function Notes() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('https://617d4f611eadc5001713647b.mockapi.io/api/v1/contacts')
      .then(res => res.json())
      .then(data => setContacts(data));
  }, []);

  const handleDelete = async id => {
    await fetch(
      'https://617d4f611eadc5001713647b.mockapi.io/api/v1/contacts/' + id,
      {
        method: 'DELETE',
      }
    );
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {contacts.map(contact => (
          <div key={contact.id}>
            <ContactCard contact={contact} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
