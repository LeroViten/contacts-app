import { useDeleteNoteMutation } from '../redux/notes/noteSlice';
import { makeStyles } from '@material-ui/core';
import { yellow, green, pink, blue } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: note => {
      if (note.category === 'work') {
        return yellow[700];
      }
      if (note.category === 'money') {
        return green[500];
      }
      if (note.category === 'todos') {
        return pink[500];
      }
      return blue[500];
    },
  },
});

export default function NoteCard({ note }) {
  const [deleteNote, { isLoading: deleting }] = useDeleteNoteMutation();
  const classes = useStyles(note);

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => deleteNote(note.id)}>
              {deleting ? (
                <DeleteForeverOutlinedIcon sx={{ color: pink[500] }} />
              ) : (
                <DeleteOutlined />
              )}
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
