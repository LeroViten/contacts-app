import {
  useDeleteContactMutation,
  useFetchContactsQuery,
} from '../redux/contacts/contactSlice';
import Loader from 'react-loader-spinner';
import Container from '@material-ui/core/Container';
import Masonry from 'react-masonry-css';
import ContactCard from '../components/ContactCard';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function Notes() {
  const { data: contacts, isFetching } = useFetchContactsQuery();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  const handleDelete = async id => {
    deleteContact(id);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

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
      {contacts && (
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {contacts.map(contact => (
            <div key={contact.id}>
              <ContactCard
                contact={contact}
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
