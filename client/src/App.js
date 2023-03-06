import { useRoutes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import {routes} from './routes/routes'

function App() {
  const element = useRoutes(routes)
  return (
    < >
      <Navbar/>
      {element}
    </>
  );
}

export default App;
