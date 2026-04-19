import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

/**
 * App - Componente raíz que renderiza las rutas
 */
const App = () => {
  const element = useRoutes(routes);
  return element;
};

export default App;
