import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import Notes from './pages/Notes';
import CreateNote from './pages/CreateNote';
import CreateContact from './pages/CreateContact';
import Layout from './components/Layout';
import Contacts from './pages/Contacts';
import { Toaster } from 'react-hot-toast';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe',
    },
    secondary: blue,
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Contacts />
            </Route>
            <Route path="/create-contact">
              <CreateContact />
            </Route>
            <Route exact path="/notes">
              <Notes />
            </Route>
            <Route exact path="/create-note">
              <CreateNote />
            </Route>
          </Switch>
        </Layout>
      </Router>
      <div>
        <Toaster position="top-center" />
      </div>
    </ThemeProvider>
  );
}

export default App;
