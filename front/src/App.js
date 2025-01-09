
//import './css/App.css';
import Navegacion from './componentes/Navegacion';
import Home from './componentes/Home';
import Formulario from './componentes/Formulario';
import Usuarios from './componentes/Usuarios';
import Error from './componentes/Error';
import { Routes, Route } from 'react-router-dom';
import Alta from './Alta/Alta';
import Contacto from './Contacto/Contacto.jsx';
import Nosotros from './Nosotros/Nosotros.jsx';
import Productos from './componentes/Productos.js';
import Formularioedit from './componentes/Formularioedit.js';

function App() {
  return (

    <>

      <Navegacion />

      <Routes>
        <Route path="/login" element={<Formulario /> }></Route>
        <Route path='/' element={ <Home /> }></Route>
        <Route path='/alta' element={ <Alta /> }></Route>
        <Route path='/formulario' element={ <Formulario /> }></Route>
        <Route path='/usuarios' element={ <Usuarios /> }></Route>
        <Route path='*' element={ <Error /> }></Route>
        <Route path='/contacto' element={ <Contacto /> }></Route>
        <Route path='/nosotros' element={ <Nosotros /> }></Route>
        <Route path='/productos' element={ <Productos /> }></Route>
        <Route path="/editar/:id" element={<Formularioedit />} />
      </Routes>
    
    </>


  );
}

export default App;
