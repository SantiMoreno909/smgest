CREATE DATABASE 'elSendero' (

    CREATE TABLE Productos ( -- Models listo
        ProductoID INTEGER PRIMARY KEY,
        nombre TEXT NOT NULL, -- Se ingresa a mano. Se provee de fábrica un listado de productos
        precioVenta DECIMAL(10,2), -- Se indica de forma manual, para poder tener los precios actualizados
        categoriaID INTEGER REFERENCES Categorias(categoriaID),
        subcategoriaID INTEGER REFERENCES Subcategorias(subcategoriaID),
        ProveedorID INTEGER REFERENCES Proveedores(ProveedorID),
        presentacion TEXT NOT NULL,
        url_foto TEXT
    );

    CREATE TABLE DetalleCompras (
        DCID INTEGER PRIMARY KEY,
        fechaCompra DATE NOT NULL DEFAULT CURRENT_DATE, -- Se carga de forma automática
        ProveedorId INTEGER REFERENCES Proveedores(ProveedorId), -- Se deberá colocar el Proveedores.ProveedorId, desde un selector que mostrará los nombres de los proveedores disponibles
        FormaPagoId TEXT NOT NULL, -- Se selecciona desde un menú desplegable
        totalCompra DECIMAL(15,2) -- Se obtiene como la sumatoria de los CompraProducto.SubTotal cuando DetalleCompras.DCId = CompraProducto.DCId
    );

    CREATE TABLE CompraProducto (
        CompraID INTEGER PRIMARY KEY,
        DCId INTEGER REFERENCES DetalleCompras(DCId), -- Se carga automáticamente cuando se va creando la compra
        ProductoId INTEGER NOT NULL REFERENCES Productos(ProductoId), -- Se carga al seleccionar el Productos.NombreProducto de un menú desplegable
        precioCosto DECIMAL(10,2), -- Se coloca de forma manual
        cantidad DECIMAL(10,3), -- Se coloca de forma manual
        subTotal DECIMAL(10,2) -- Se calcula como PrecioCompraPorKg*Cantidad
    );

    CREATE TABLE DetalleVentas (
        DVID INTEGER PRIMARY KEY,
        fechaVenta DATE NOT NULL DEFAULT CURRENT_DATE,
        VendedorId INTEGER REFERENCES Vendedores(VendedorId),-- Se carga al seleccionar el Proveedor.NombreProv de un menú desplegable
        FormaPagoId TEXT NOT NULL, -- Se selecciona desde un menú desplegable
        CMV DECIMAL(10,2), -- Se obtiene de la sumatoria de VentaProducto.SubCMV WHERE DetalleVentas.DVId = VentaProducto.DVId
        totalVenta DECIMAL(10,2) -- Se obtiene de la sumatoria de VentaProducto.SubTotal WHERE DetalleVentas.DVId = VentaProducto.DVId
    );

    CREATE TABLE VentaProducto (
        VentaID INTEGER PRIMARY KEY,
        DVId INTEGER REFERENCES DetalleVentas(DVId),
        ProductoId INTEGER NOT NULL REFERENCES Productos(ProductoId), -- Se carga al seleccionar el Productos.NombreProducto de un menú desplegable
        precioVentaUnit DECIMAL(10,2), -- Se obtiene desde Productos.PrecioVenta WHERE VentaProducto.ProductoId = Productos.ProductoId
        precioCentaUnit DECIMAL(10,2), -- Se obtiene del último registro de CompraProducto.precioCosto WHERE VentaProducto.ProductoId = CompraProducto.ProductoId
        Cantidad DECIMAL(10,3) NOT NULL, -- Se ingresa de forma manual
        SubCMV DECIMAL(10,2), -- Se calcula obteniendo PrecioCompraPorKg * Cantidad
        SubTotal DECIMAL(10,2) -- Se calcula como PrecioVentaPorKg * Cantidad
    );

    CREATE TABLE Proveedores ( -- Models listo
        ProveedorID INTEGER PRIMARY KEY,
        nombre TEXT NOT NULL, -- Se ingresa de forma manual
        direccion TEXT, -- Se ingresa de forma manual
        telefono INTEGER NOT NULL -- Se ingresa de forma manual
    );

    CREATE TABLE Vendedores ( -- Models listo
        VendedorID INTEGER PRIMARY KEY,
        nombre TEXT NOT NULL, -- Se ingresa de forma manual
        apellido TEXT NOT NULL, -- Se ingresa de forma manual
        direccion TEXT NOT NULL, -- Se ingresa de forma manual
        telefono INTEGER NOT NULL,  -- Se ingresa de forma manual
        telefonoEmergencia INTEGER NOT NULL,  -- Se ingresa de forma manual
        fecNac DATE NOT NULL -- Se ingresa de forma manual
    );

    CREATE TABLE FormaPago ( -- Model listo
        FormaPagoID INTEGER PRIMARY KEY,
        formaPago TEXT -- Se elige desde un menú desplegable
    );

    CREATE TABLE Usuarios ( -- Models listo
        UsuarioID INTEGER PRIMARY KEY,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        username TEXT, -- Se ingresa manualmente desde backend
        contrasena TEXT, -- Se ingresa manualmente desde backend
        confirmar_contrasena TEXT NOT NULL,
        email TEXT UNIQUE, -- Se ingresa manualmente desde backend
        telefono TEXT NOT NULL UNIQUE,
        fec_nac DATE NOT NULL,
        rol TEXT -- Se ingresa manualmente desde backend
    );

    CREATE TABLE Categorias ( -- Models listo
        categoriaID INTEGER PRIMARY KEY,
        nombre TEXT
    );

    CREATE TABLE Subcategorias ( -- Models listo
        subcategoriaID INTEGER PRIMARY KEY,
        nombre TEXT,
        categoriaID INTEGER NOT NULL REFERENCES Categorias(categoriaID)
    )
);
