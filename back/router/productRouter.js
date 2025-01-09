const express = require('express');
const router = express.Router();

// importamos body de express-validator para
const { body, validationResult } = require('express-validator');

//importamos el esquema del producto
const Product = require('../models/productModel');

router.get("/", async (req, res) => {
    try {
        const productos = await Product.find();
        return res.status(200).json(productos);
    } catch (error) {
        console.log('Error al obtener los usuarios:', error);
        return res.status(400).json({ message: 'Error al obtener los productos' });
    }
});

// obtener producto por id
router.get("/:id", async (req, res) => {
    try {
        const producto = await Product.findById(req.params.id);
        if(!producto) return res.status(404).json({ message: 'Producto no encontrado'});
        res.json(producto)
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el producto' });
    }
});

// eliminamos un producto
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        console.log(id);
        
        await Product.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.log('Error al eliminar el producto:', error);
        return res.status(400).json({ message: 'Error al eliminar el producto' });
    }
});



router.post("/register",
    [
        body('nombre')
            .isLength({ min: 3, max: 20 }).withMessage('El nombre debe tener entre 3 y 20 caracteres')
            .notEmpty().withMessage('El nombre es obligatorio')
            .isString().withMessage('El nombre debe ser de tipo texto')
            .trim(),
        body('precio')
            .isNumeric().withMessage('El valor debe ser numerico')
            .notEmpty().withMessage('El nombre es obligatorio')
            .trim(),
        body('descripcion')
            .notEmpty().withMessage('El campo descripcion es obligatorio')
            .isString().withMessage('El campo debe ser de tipo texto')
            .trim(),
        body('imagen')
            .notEmpty().withMessage('El campo imagen es obligatorio')
            .isString().withMessage('El link debe ser de tipo texto')
            .trim(),

    ]
    , async (req, res) => {

        const errores = validationResult(req);

        const { nombre, precio, descripcion, imagen } = req.body;


        console.log(errores)


        const producto = {
            nombre,
            precio,
            descripcion,
            imagen
        }

        console.log(producto);


        try {

            if (!errores.isEmpty()) {
                return res.status(404).json({ message: 'Error al enviar los datos' });
            }
            
            const productoExiste = await Product.findOne({ nombre })
            console.log(productoExiste);

            const newProduct = new Product(producto);

            await newProduct.save(); 

            return res.status(201).json({ message: 'Producto registrado correctamente' });


        } catch (error) {

            console.log('Error al registrar el producto:', error);
            return res.status(400).json({ message: 'Error al registrar el producto' });
        }

    });

    router.put("/editar/:id", 
        [
            body('nombre')
                .isLength({ min: 3, max: 20 }).withMessage('El nombre debe tener entre 3 y 20 caracteres')
                .notEmpty().withMessage('El nombre es obligatorio')
                .isString().withMessage('El nombre debe ser de tipo texto')
                .trim(),
            body('precio')
                .isNumeric().withMessage('El valor debe ser numerico')
                .notEmpty().withMessage('El nombre es obligatorio')
                .trim(),
            body('descripcion')
                .notEmpty().withMessage('El campo descripcion es obligatorio')
                .isString().withMessage('El campo debe ser de tipo texto')
                .trim(),
            body('imagen')
            .notEmpty().withMessage('El campo imagen es obligatorio')
            .isString().withMessage('El link debe ser de tipo texto')
            .trim(),
        ], 
        async (req, res) => {
            const { id } = req.params;
            const { nombre, precio, descripcion, imagen } = req.body;
    
            // Validar los posibles errores en los datos enviados
            const errores = validationResult(req);
            if (!errores.isEmpty()) {
                return res.status(400).json({ errores: errores.array() });
            }
    
            try {
                // Buscar el producto a editar
                const producto = await Product.findById(id);
                if (!producto) {
                    return res.status(404).json({ message: 'producto no encontrado' });
                }
    
                // Actualizar los campos del usuario
                producto.nombre = nombre || producto.nombre;
                producto.precio = precio || producto.precio;
                producto.descripcion = descripcion || producto.descripcion;
                producto.imagen = imagen || producto.imagen;
    
                // Guardar el usuario actualizado
                await producto.save();
    
                return res.status(200).json({ message: 'Producto actualizado correctamente' });
            } catch (error) {
                console.log('Error al actualizar el usuario jaja:', error);
                return res.status(400).json({ message: 'Error al actualizar el producto' });
            }
        }
    );


    
module.exports = router; //ES5