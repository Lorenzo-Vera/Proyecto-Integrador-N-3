import '../Contacto/Contacto.css'
const Contacto = () => {
    return (
        <>
        <h1>Formulario</h1>
<p>Completa los datos del formulario.</p>
<br />
    <form action="" autocomplete="off">
    <input type="text" name="nombre" placeholder="Ingresa el nombre" 
class="campo" />
    <input type="email" name="email" id="email" placeholder="Ingresa el correo" 
class="campo" />
    <br />
    <input type="submit" name="Enviar" value="Enviar" class="Enviar" />
    </form>
    </>
    )
}
export default Contacto;