/* import "../Alta/Alta.css; */
import axios from "axios";
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Formularioedit = () => {

    const [nombre, setNombre] = useState(''); 
    const [precio, setPrecio] = useState(''); 
    const [descripcion, setDescripcion] = useState(''); 
    const [imagen, setImagen] = useState(null);

  
    const { id } = useParams(); // Obtener el ID desde la URL
    


    // Cargar los datos del producto al componente
    useEffect(() => {
        // Obtener los datos del usuario desde la API
        axios.get(`http://localhost:9000/producto/${id}`)
            .then((response) => {
                const producto = response.data;
                setNombre(producto.nombre);
                setPrecio(producto.precio);
                setDescripcion(producto.descripcion);
                setImagen(producto.imagen);
            })
            .catch((error) => {
                console.log('Error al cargar los datos del usuario:', error);
            });
    }, [id]);

    // Manejo del envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedUser = {
            nombre,
            precio,
            descripcion,
            imagen,
            
        };

        // Enviar los datos modificados a la API

        axios.put(`http://localhost:9000/producto/editar/${id}`, updatedUser)
            .then((response) => {
                console.log('Usuario actualizado correctamente');
                // Vaciar los campos después de guardar
            setNombre('');
            setPrecio('');
            setDescripcion('')
            setImagen('');
            //setPassword('');
            })
            .catch((error) => {
                console.log('Error al actualizar el usuario GG:', error);
            });
    };

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

export default Formularioedit;
