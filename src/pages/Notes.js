import {
  useDeleteNoteMutation,
  useFetchNotesQuery,
} from '../redux/notes/noteSlice';
import Loader from 'react-loader-spinner';
import Container from '@material-ui/core/Container';
import Masonry from 'react-masonry-css';
import NoteCard from '../components/NoteCard';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function Notes() {
  const { data: notes, isFetching } = useFetchNotesQuery();
  const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();

  const handleDelete = async id => {
    deleteNote(id);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      {notes === [] && <h1>No notes to show</h1>}
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
      {notes && (
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map(note => (
            <div key={note.id}>
              <NoteCard
                note={note}
                handleDelete={handleDelete}
                deleting={isDeleting}
              />
            </div>
          ))}
        </Masonry>
      )}
    </Container>
  );
}
