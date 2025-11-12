# 🍹 FRUTI TECH - PWA Sistema de Ventas

Progressive Web App (PWA) para la gestión de ventas de jugos y frutas. Sistema móvil completo que funciona offline y se puede instalar en dispositivos móviles como una app nativa.

## 📋 Características

- ✅ **PWA Completa** - Instalable en dispositivos móviles
- 📱 **Diseño Mobile-First** - Optimizado para pantallas táctiles
- 🔄 **Funciona Offline** - Gracias al Service Worker
- 💾 **Almacenamiento Local** - Datos guardados en el dispositivo
- 🎨 **Interfaz Colorida** - Diseño atractivo con emojis
- 📊 **Panel de Administración** - Gestión completa de productos
- 🛒 **Carrito de Compras** - Sistema de pedidos integrado
- 🎵 **Efectos de Sonido** - Feedback auditivo y vibraciones
- 📈 **Estadísticas** - Seguimiento de ventas y pedidos

## 🚀 Instalación

### Paso 1: Generar los Iconos

1. Abre el archivo `generar-iconos-pwa.html` en tu navegador
2. Haz clic en "🎨 Generar Todos los Iconos"
3. Descarga cada icono haciendo clic en el botón "💾 Guardar"
4. Guarda todos los iconos en la carpeta `icons/` con los nombres exactos:
   - `icon-72x72.png`
   - `icon-96x96.png`
   - `icon-128x128.png`
   - `icon-144x144.png`
   - `icon-152x152.png`
   - `icon-192x192.png`
   - `icon-384x384.png`
   - `icon-512x512.png`

### Paso 2: Configurar un Servidor Local

Las PWAs requieren HTTPS o localhost para funcionar. Tienes varias opciones:

#### Opción A: Python HTTP Server
```bash
# Con Python 3
python -m http.server 8000

# Con Python 2
python -m SimpleHTTPServer 8000
```

#### Opción B: Node.js HTTP Server
```bash
# Instalar http-server globalmente
npm install -g http-server

# Ejecutar servidor
http-server -p 8000
```

#### Opción C: Live Server (VS Code)
1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

### Paso 3: Acceder a la Aplicación

1. Abre tu navegador y ve a `http://localhost:8000`
2. La app debería cargar correctamente
3. Verás un botón "📲 Instalar App" (en Chrome/Edge)

### Paso 4: Instalar en tu Dispositivo

#### En Android (Chrome/Edge):
1. Abre la app en el navegador
2. Toca el menú (⋮) y selecciona "Instalar app" o "Agregar a pantalla de inicio"
3. Confirma la instalación
4. La app aparecerá en tu launcher como una app nativa

#### En iOS (Safari):
1. Abre la app en Safari
2. Toca el botón de compartir (□↑)
3. Selecciona "Agregar a pantalla de inicio"
4. Confirma y la app aparecerá en tu home screen

#### En PC (Chrome/Edge):
1. Haz clic en el icono de instalación en la barra de direcciones
2. O ve al menú → "Instalar FRUTI TECH"
3. La app se instalará como aplicación de escritorio

## 📱 Uso de la Aplicación

### Vista Principal (Cliente)

- **Ver Productos**: Desplázate para ver todos los productos disponibles
- **Agregar al Carrito**: Toca el botón "➕ AGREGAR" en cualquier producto
- **Ver Carrito**: Toca el botón flotante del carrito (🛒) en la esquina inferior derecha
- **Confirmar Pedido**: En el carrito, toca "✅ CONFIRMAR PEDIDO"

### Panel de Administración

Para acceder al panel de admin, toca el botón ⚙️ en la esquina superior derecha.

**Funcionalidades del Admin:**

1. **Cambiar Logo**
   - Toca "📷 Cambiar Logo"
   - Selecciona una imagen
   - El logo se guardará automáticamente

2. **Agregar Productos**
   - Ingresa el nombre del producto
   - Ingresa el precio
   - Opcionalmente, agrega una foto
   - Toca "💾 GUARDAR PRODUCTO"

3. **Editar Productos**
   - Toca "✏️ Editar" en cualquier producto
   - Modifica los datos en el formulario
   - Guarda los cambios

4. **Eliminar Productos**
   - Toca el botón "🗑️" en cualquier producto
   - Confirma la eliminación

5. **Ver Estadísticas**
   - Total vendido hoy
   - Número de pedidos
   - Cantidad de productos

## 🗂️ Estructura del Proyecto

```
FRUTI-TECH/
│
├── index.html              # Vista principal (cliente)
├── admin.html              # Panel de administración
├── app.js                  # Lógica de la aplicación
├── manifest.json           # Configuración de la PWA
├── service-worker.js       # Service Worker para offline
├── generar-iconos-pwa.html # Generador de iconos
├── README.md               # Este archivo
│
└── icons/                  # Carpeta de iconos (debes crearlos)
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

## 💾 Almacenamiento de Datos

La aplicación utiliza `localStorage` para guardar:

- **Productos**: `frutitech_productos`
- **Carrito**: `frutitech_carrito`
- **Historial de Pedidos**: `frutitech_historial`
- **Logo**: `frutitech_logo`

Los datos persisten incluso cuando cierras la app o el navegador.

## 🔧 Personalización

### Cambiar Colores

Los colores principales están definidos en los archivos HTML:

- **index.html**: Busca los gradientes de color en las secciones `<style>`
- **admin.html**: Busca `background: linear-gradient(...)`
- **manifest.json**: Cambia `theme_color` y `background_color`

### Agregar Más Emojis

En [app.js:213-248](c:\Users\COMPUTER\Desktop\PROYECTOS CON IA\app.js#L213-L248), encontrarás la función `obtenerEmojiPorNombre()` donde puedes agregar más asociaciones de frutas con emojis.

### Modificar los Productos Iniciales

En [app.js:21-44](c:\Users\COMPUTER\Desktop\PROYECTOS CON IA\app.js#L21-L44), encontrarás el array de productos iniciales que puedes modificar.

## 🐛 Solución de Problemas

### La app no se instala

- Verifica que estés usando HTTPS o localhost
- Verifica que todos los iconos estén en la carpeta `icons/`
- Revisa la consola del navegador para ver errores
- Asegúrate de que el Service Worker se registre correctamente

### Los datos no se guardan

- Verifica que el navegador permita localStorage
- No uses modo incógnito/privado
- Revisa los permisos del navegador

### Los iconos no aparecen

- Genera todos los iconos usando `generar-iconos-pwa.html`
- Verifica que estén en la carpeta `icons/` con los nombres correctos
- Limpia la caché del navegador y vuelve a instalar

### El Service Worker no funciona

- Abre las DevTools → Application → Service Workers
- Verifica que esté registrado y activo
- Haz clic en "Unregister" y recarga la página
- Verifica que la ruta sea `./service-worker.js`

## 🌐 Compatibilidad

### Navegadores Soportados:

- ✅ Chrome 67+
- ✅ Edge 79+
- ✅ Safari 11.1+ (iOS 11.3+)
- ✅ Firefox 68+
- ✅ Samsung Internet 8.0+

### Funcionalidades por Navegador:

| Funcionalidad | Chrome | Safari | Firefox |
|--------------|--------|--------|---------|
| Instalación PWA | ✅ | ✅ | ⚠️ |
| Service Worker | ✅ | ✅ | ✅ |
| Notificaciones | ✅ | ⚠️ | ✅ |
| Vibración | ✅ | ❌ | ✅ |

⚠️ = Soporte parcial o con limitaciones
❌ = No soportado

## 📝 Licencia

Este proyecto es de uso libre para fines educativos y comerciales.

## 🤝 Contribuciones

Si quieres mejorar esta PWA:

1. Haz un fork del proyecto
2. Crea una rama para tu funcionalidad
3. Haz commit de tus cambios
4. Haz push a la rama
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la sección de "Solución de Problemas"
2. Verifica la consola del navegador para errores
3. Asegúrate de seguir todos los pasos de instalación

## 🎯 Roadmap Futuro

- [ ] Sincronización con servidor backend
- [ ] Sistema de usuarios y autenticación
- [ ] Reportes avanzados y gráficos
- [ ] Integración con métodos de pago
- [ ] Modo oscuro
- [ ] Múltiples categorías de productos
- [ ] Sistema de descuentos y promociones
- [ ] Impresión de tickets
- [ ] Exportación de datos (Excel, PDF)

## ✨ Características Técnicas

- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Storage**: LocalStorage API
- **PWA**: Service Worker API, Web App Manifest
- **APIs Usadas**:
  - Web Audio API (sonidos)
  - Vibration API
  - FileReader API (imágenes)
  - Canvas API (generador de iconos)

---

Hecho con ❤️ para pequeños negocios de jugos y frutas
