import "./Alta.css";
import axios from "axios";
import Swal from 'sweetalert2';
import { useState } from 'react';

const Alta = () => {

    const [nombre, setNombre] = useState(''); 
    const [precio, setPrecio] = useState(''); 
    const [descripcion, setDescripcion] = useState(''); 
    const [imagen, setImagen] = useState(null);

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {

            // CAMBIAR URL PARA QUE FUNCIONE Y CREAR UNA NUEVA RUTA EN EL BACKEND
            await axios.post( `http://localhost:9000/producto/register`, {
                nombre,
                precio, 
                descripcion,
                imagen
            });

            console.log(nombre, precio, descripcion,  imagen);

            Swal.fire({
                title: 'Enviado!',
                text: 'Click para seguir',
                icon: 'success',
                confirmButtonText: 'Cool'
            })

            console.log('Datos enviados correctamente');

        } catch (error) {

            console.log('Error al enviar los datos ' + error);
            
            Swal.fire({
                title: 'Error!',
                text: 'Hubo un error  al enviar los datos',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            
        }
    }

  return (

    <>
      <h1>Formulario</h1>
      <p id="Texto">Completa los datos del formulario.</p>
      <form action="" autocomplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Ingresa el nombre"
          class="campo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          name="precio"
          placeholder="Ingresa el precio"
          class="campo"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <input
          type="text"
          name="descripción"
          placeholder="Ingresa un texto de descripcion"
          class="campo"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="text"
          name="imagen"
          class="campo"
          placeholder="Ingresa link de imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />
        <input type="submit" name="Enviar" value="Enviar" class="Enviar" />
      </form>
    </>
  );
};

export default Alta;
