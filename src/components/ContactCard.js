import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { yellow, green, pink, blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: contact => {
      if (contact.category === 'work') {
        return yellow[700];
      }
      if (contact.category === 'family') {
        return green[500];
      }
      if (contact.category === 'friends') {
        return pink[500];
      }
      return blue[500];
    },
  },
});

export default function ContactCard({ contact, handleDelete }) {
  const classes = useStyles(contact);

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {contact.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(contact.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={contact.name}
          subheader={contact.category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {contact.phone}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
