import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function Productos() {

    const [productos, setProductos] = useState([]);
    const navigate = useNavigate(); // Inicializar el hook

    useEffect(() => {

        try {
            const obtenerProductos = async () => {
                const respuesta = await axios.get('http://localhost:9000/producto/');
                setProductos(respuesta.data);

                console.log(respuesta);
                console.log(respuesta.status);

            }

            obtenerProductos();

            console.log(productos);

        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }

    }, []);

    const eliminarProductos = async (id) => {

        console.log(id);
        
        try {
            const respuesta = await axios.delete(`http://localhost:9000/producto/${id}`);
            setProductos(productos.filter(productos => productos._id !== id));
            console.log(respuesta);

        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    }   

    const mostrarFormularioedit = (id) => {
        navigate(`/editar/${id}`);
    }

    const confirmarEliminación = (id) => {

        console.log(id);
        
        Swal.fire({
            title: "Estás seguro?",
            text: "Esto no se puede revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarProductos(id);
                Swal.fire({
                    title: "Usuario Eliminado!",
                    text: "El archivo se ha eliminado.",
                    icon: "success"
                });
            }
        });

        
    }

    const mostrarFormularioEdicion = (id) => {
        navigate(`/editar/${id}`);
    }

    return (
        <>
            <h1 className='container mt-5 text-center'>
                Clientes Activos
            </h1>
            <div className='container mt-5 text-center'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripcion</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto._id}>
                                <td>{producto._id}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.imagen}</td>
                                <td>
                                    <button 
                                        className='btn btn-danger' 
                                        onClick={() => { confirmarEliminación(producto._id) }}>  
                                        Eliminar 
                                    </button>

                                    <button 
                                        className='btn btn-warning' 
                                        onClick={() => { mostrarFormularioEdicion(producto._id) }}> 
                                        Edi tar 
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Productos;