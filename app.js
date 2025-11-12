// ============================================
// FRUTI TECH - Sistema de Gestión
// ============================================

// Inicializar datos
let productos = [];
let carrito = [];
let pedidosHistorial = [];
let productoEditando = null;

// Cargar datos guardados
function cargarDatos() {
    const productosGuardados = localStorage.getItem('frutitech_productos');
    const carritoGuardado = localStorage.getItem('frutitech_carrito');
    const historialGuardado = localStorage.getItem('frutitech_historial');
    
    if (productosGuardados) {
        productos = JSON.parse(productosGuardados);
    } else {
        // Productos iniciales
        productos = [
            {
                id: 1,
                nombre: 'Jugo de Sandía',
                precio: 2.50,
                imagen: null,
                emoji: '🍉'
            },
            {
                id: 2,
                nombre: 'Helado de Plátano',
                precio: 3.00,
                imagen: null,
                emoji: '🍌'
            },
            {
                id: 3,
                nombre: 'Batido de Frutilla',
                precio: 2.75,
                imagen: null,
                emoji: '🍓'
            }
        ];
        guardarProductos();
    }
    
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    
    if (historialGuardado) {
        pedidosHistorial = JSON.parse(historialGuardado);
    }
}

// Guardar datos
function guardarProductos() {
    localStorage.setItem('frutitech_productos', JSON.stringify(productos));
}

function guardarCarrito() {
    localStorage.setItem('frutitech_carrito', JSON.stringify(carrito));
}

function guardarHistorial() {
    localStorage.setItem('frutitech_historial', JSON.stringify(pedidosHistorial));
}

// ============================================
// FUNCIONES DE LOGO
// ============================================

function subirLogo(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem('frutitech_logo', e.target.result);
            cargarLogoAdmin();
            mostrarAlerta('✅ Logo actualizado correctamente');
        };
        reader.readAsDataURL(file);
    }
}

function eliminarLogo() {
    if (confirm('¿Seguro que quieres eliminar el logo?')) {
        localStorage.removeItem('frutitech_logo');
        cargarLogoAdmin();
        mostrarAlerta('🗑️ Logo eliminado');
    }
}

function cargarLogo() {
    const logo = localStorage.getItem('frutitech_logo');
    const container = document.getElementById('logoContainer');
    
    if (logo && container) {
        container.innerHTML = `<img src="${logo}" alt="Logo">`;
    }
}

function cargarLogoAdmin() {
    const logo = localStorage.getItem('frutitech_logo');
    const preview = document.getElementById('logoPreview');
    
    if (logo && preview) {
        preview.innerHTML = `<img src="${logo}" alt="Logo">`;
    } else if (preview) {
        preview.innerHTML = '<div class="logo-placeholder">🍹</div>';
    }
}

// ============================================
// FUNCIONES DE PRODUCTOS
// ============================================

function cargarProductos() {
    cargarDatos();
    const grid = document.getElementById('productosGrid');
    
    if (!grid) return;
    
    grid.innerHTML = '';
    
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        
        const imagenHTML = producto.imagen 
            ? `<img src="${producto.imagen}" alt="${producto.nombre}">`
            : `<div class="producto-emoji">${producto.emoji}</div>`;
        
        card.innerHTML = `
            <div class="producto-imagen">
                ${imagenHTML}
            </div>
            <div class="producto-nombre">${producto.nombre}</div>
            <div class="producto-precio">Bs. ${producto.precio.toFixed(2)}</div>
            <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">
                ➕ AGREGAR
            </button>
        `;
        
        grid.appendChild(card);
    });
}

function previsualizarProducto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('productoPreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
}

function guardarProducto() {
    const nombre = document.getElementById('productoNombre').value.trim();
    const precio = parseFloat(document.getElementById('productoPrecio').value);
    const imagenInput = document.getElementById('productoInput');
    
    if (!nombre) {
        mostrarAlerta('❌ Por favor ingresa el nombre del producto', 'error');
        return;
    }
    
    if (!precio || precio <= 0) {
        mostrarAlerta('❌ Por favor ingresa un precio válido', 'error');
        return;
    }
    
    if (imagenInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            agregarProducto(nombre, precio, e.target.result);
        };
        reader.readAsDataURL(imagenInput.files[0]);
    } else {
        agregarProducto(nombre, precio, null);
    }
}

function agregarProducto(nombre, precio, imagen) {
    const nuevoProducto = {
        id: Date.now(),
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        emoji: obtenerEmojiPorNombre(nombre)
    };
    
    productos.push(nuevoProducto);
    guardarProductos();
    
    // Limpiar formulario
    document.getElementById('productoNombre').value = '';
    document.getElementById('productoPrecio').value = '';
    document.getElementById('productoInput').value = '';
    document.getElementById('productoPreview').innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 60px;">
            📸
        </div>
    `;
    
    cargarProductosAdmin();
    mostrarAlerta('✅ Producto agregado correctamente');
}

function obtenerEmojiPorNombre(nombre) {
    const emojis = {
        'sandia': '🍉',
        'sandía': '🍉',
        'platano': '🍌',
        'plátano': '🍌',
        'banana': '🍌',
        'frutilla': '🍓',
        'fresa': '🍓',
        'naranja': '🍊',
        'manzana': '🍎',
        'uva': '🍇',
        'piña': '🍍',
        'pina': '🍍',
        'mango': '🥭',
        'kiwi': '🥝',
        'melon': '🍈',
        'melón': '🍈',
        'durazno': '🍑',
        'cereza': '🍒',
        'limon': '🍋',
        'limón': '🍋',
        'coco': '🥥',
        'aguacate': '🥑',
        'palta': '🥑'
    };
    
    const nombreLower = nombre.toLowerCase();
    for (let key in emojis) {
        if (nombreLower.includes(key)) {
            return emojis[key];
        }
    }
    
    return '🍹'; // Emoji por defecto
}

function cargarProductosAdmin() {
    cargarDatos();
    const lista = document.getElementById('productosLista');
    
    if (!lista) return;
    
    if (productos.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #999; padding: 30px;">No hay productos agregados</p>';
        return;
    }
    
    lista.innerHTML = '';
    
    productos.forEach(producto => {
        const item = document.createElement('div');
        item.className = 'producto-item';
        
        const imagenHTML = producto.imagen 
            ? `<img src="${producto.imagen}" alt="${producto.nombre}">`
            : `<div style="font-size: 60px; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">${producto.emoji}</div>`;
        
        item.innerHTML = `
            <div class="producto-item-img">
                ${imagenHTML}
            </div>
            <div class="producto-item-info">
                <div class="producto-item-nombre">${producto.nombre}</div>
                <div class="producto-item-precio">Bs. ${producto.precio.toFixed(2)}</div>
            </div>
            <div class="producto-item-acciones">
                <button class="btn-editar" onclick="editarProducto(${producto.id})">✏️ Editar</button>
                <button class="btn-eliminar" onclick="eliminarProducto(${producto.id})">🗑️</button>
            </div>
        `;
        
        lista.appendChild(item);
    });
    
    // Actualizar estadísticas
    document.getElementById('statProductos').textContent = productos.length;
}

function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    
    document.getElementById('productoNombre').value = producto.nombre;
    document.getElementById('productoPrecio').value = producto.precio;
    
    if (producto.imagen) {
        document.getElementById('productoPreview').innerHTML = `<img src="${producto.imagen}" alt="${producto.nombre}">`;
    }
    
    // Eliminar el producto actual para reemplazarlo
    eliminarProducto(id, false);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    mostrarAlerta('✏️ Editando producto. Modifica y guarda los cambios.', 'success');
}

function eliminarProducto(id, confirmar = true) {
    if (confirmar && !confirm('¿Seguro que quieres eliminar este producto?')) {
        return;
    }
    
    productos = productos.filter(p => p.id !== id);
    guardarProductos();
    cargarProductosAdmin();
    
    if (confirmar) {
        mostrarAlerta('🗑️ Producto eliminado');
    }
}

// ============================================
// FUNCIONES DE CARRITO
// ============================================

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    
    carrito.push({...producto});
    guardarCarrito();
    actualizarCarrito();
    
    // Sonido y animación
    reproducirSonido();
    mostrarAnimacion();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarCarrito();
}

function actualizarCarrito() {
    const cantidad = document.getElementById('carritoCantidad');
    const items = document.getElementById('carritoItems');
    const total = document.getElementById('carritoTotal');
    const monto = document.getElementById('totalMonto');
    const btnConfirmar = document.getElementById('btnConfirmar');
    
    if (!cantidad || !items) return;
    
    cantidad.textContent = carrito.length;
    
    if (carrito.length === 0) {
        items.innerHTML = '<div class="carrito-vacio">El carrito está vacío</div>';
        total.style.display = 'none';
        btnConfirmar.style.display = 'none';
        return;
    }
    
    // Agrupar productos iguales
    const productosAgrupados = {};
    carrito.forEach(item => {
        if (productosAgrupados[item.id]) {
            productosAgrupados[item.id].cantidad++;
        } else {
            productosAgrupados[item.id] = {...item, cantidad: 1};
        }
    });
    
    items.innerHTML = '';
    let totalMonto = 0;
    
    Object.values(productosAgrupados).forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'carrito-item';
        
        const subtotal = item.precio * item.cantidad;
        totalMonto += subtotal;
        
        div.innerHTML = `
            <span class="carrito-item-nombre">${item.emoji} ${item.nombre} x${item.cantidad}</span>
            <span class="carrito-item-precio">Bs. ${subtotal.toFixed(2)}</span>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">🗑️</button>
        `;
        
        items.appendChild(div);
    });
    
    monto.textContent = `Bs. ${totalMonto.toFixed(2)}`;
    total.style.display = 'flex';
    btnConfirmar.style.display = 'block';
}

function confirmarPedido() {
    if (carrito.length === 0) return;
    
    const totalMonto = carrito.reduce((sum, item) => sum + item.precio, 0);
    
    // Guardar en historial
    pedidosHistorial.push({
        fecha: new Date().toISOString(),
        items: [...carrito],
        total: totalMonto
    });
    guardarHistorial();
    
    // Mostrar mensaje de éxito
    document.getElementById('mensajeTotal').textContent = `Bs. ${totalMonto.toFixed(2)}`;
    const mensaje = document.getElementById('mensajeExito');
    mensaje.classList.add('show');
    
    // Sonido de éxito
    reproducirSonidoExito();
    
    // Limpiar carrito
    setTimeout(() => {
        carrito = [];
        guardarCarrito();
        actualizarCarrito();
        mensaje.classList.remove('show');
    }, 3000);
}

// ============================================
// FUNCIONES DE ESTADÍSTICAS
// ============================================

function cargarEstadisticas() {
    cargarDatos();
    
    const totalVentas = pedidosHistorial.reduce((sum, pedido) => sum + pedido.total, 0);
    const totalPedidos = pedidosHistorial.length;
    
    const statVentas = document.getElementById('statVentas');
    const statPedidos = document.getElementById('statPedidos');
    const statProductos = document.getElementById('statProductos');
    
    if (statVentas) statVentas.textContent = `Bs. ${totalVentas.toFixed(2)}`;
    if (statPedidos) statPedidos.textContent = totalPedidos;
    if (statProductos) statProductos.textContent = productos.length;
}

// ============================================
// FUNCIONES DE SONIDO Y ANIMACIÓN
// ============================================

function reproducirSonido() {
    // Crear un beep simple
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

function reproducirSonidoExito() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    [523, 659, 784].forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        const startTime = audioContext.currentTime + (index * 0.15);
        gainNode.gain.setValueAtTime(0.3, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.2);
    });
}

function mostrarAnimacion() {
    // Vibración si está disponible
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
}

// Inicializar al cargar
cargarDatos();
