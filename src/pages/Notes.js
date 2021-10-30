import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Masonry from 'react-masonry-css';
import NoteCard from '../components/NoteCard';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('https://617d4f611eadc5001713647b.mockapi.io/api/v1/notes')
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  const handleDelete = async id => {
    await fetch(
      'https://617d4f611eadc5001713647b.mockapi.io/api/v1/notes/' + id,
      {
        method: 'DELETE',
      }
    );
    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes);
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
        {notes.map(note => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
