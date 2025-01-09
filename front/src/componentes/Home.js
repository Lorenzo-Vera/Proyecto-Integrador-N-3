import '../css/Home.css'
import Depto1 from "../Img/Departamento1.jpg";
import Depto2 from "../Img/Departamento2.jpg";
import Depto3 from "../Img/Departamento3.jpg";
import Productos from './Productos';
import axios from "axios";
import { useState, useEffect } from 'react';
const Home = () => {

const [productos, setProductos] = useState([]);
useEffect(() => {
    const obtenerProductos = async () => {
        try {
            const respuesta = await axios.get(`http://localhost:9000/producto/`);
            setProductos(respuesta.data);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
        }
    }
    obtenerProductos();
}, []);


    const carrito = () => {

        alert("Producto agregado al carrito");

        const producto = {
            nombre: 'Departamento 1',
            precio: 2500,
            descripcion: 'Ideal para todo trabajo aeróbico. - Con sales de rehidratación.',
            img: {Depto1}
        }

        localStorage.setItem('producto', JSON.stringify(producto));
        localStorage.setItem('datos', 'hola gente, soy datos'); 

    }
    return (
        <div class="container">
            {productos.map((producto)=>(
    <div class="card">
        <figure>
            <img src={producto.imagen} alt="logo" />
        </figure>
        <div class="contenido">
            <div class="contenido_info">
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            </div>
            <div class="contenido_btn">
                <button onClick={carrito}>Comprar</button>
            </div>
        </div>
    </div>
    ))}
</div> 
    )
}
export default Home;