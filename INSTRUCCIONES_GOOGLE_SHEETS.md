# 📝 Configuración de Google Sheets para Recomendaciones de Canciones y Confirmación de Asistencia

## 🎵 Parte 1: Recomendaciones de Canciones

### Paso 1: Crear la Hoja de Cálculo para Canciones
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala "Recomendaciones de Canciones - Mica y Fran"
4. En la primera fila, agrega estos encabezados:
   - Columna A: **Fecha**
   - Columna B: **Nombre**
   - Columna C: **Canción**
   - Columna D: **Artista**

### Paso 2: Crear el Script de Apps Script
1. En tu hoja de Google Sheets, ve a **Extensiones** → **Apps Script**
2. Borra el código que aparece por defecto
3. Copia y pega este código:

```javascript
function doPost(e) {
  try {
    // Obtener la hoja activa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parsear los datos recibidos
    var data = JSON.parse(e.postData.contents);
    
    // Agregar una nueva fila con los datos
    sheet.appendRow([
      new Date(),           // Fecha y hora
      data.nombre || 'Anónimo',  // Nombre (o "Anónimo" si está vacío)
      data.cancion,         // Nombre de la canción
      data.artista          // Artista
    ]);
    
    // Responder con éxito
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('El servicio está funcionando correctamente')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

4. Haz clic en el icono del disco (💾) para guardar
5. Ponle un nombre al proyecto: "API Canciones Boda"

### Paso 3: Implementar el Script
1. Haz clic en **Implementar** → **Nueva implementación**
2. Selecciona el tipo: **Aplicación web**
3. Configuración:
   - **Descripción**: "API para recomendaciones de canciones"
   - **Ejecutar como**: Tu cuenta
   - **Quién tiene acceso**: Cualquier persona
4. Haz clic en **Implementar**
5. **¡IMPORTANTE!** Copia la URL que aparece (algo como: `https://script.google.com/macros/s/AKfycby.../exec`)
6. Autoriza los permisos cuando te los pida

### Paso 4: Actualizar el Componente
Abre el archivo `src/components/Invitacion.jsx` y actualiza la línea donde se usa SongRecommendations:

```jsx
<SongRecommendations 
  claseContenedor="bg-white" 
  googleScriptUrl="TU_URL_DE_GOOGLE_SCRIPT_AQUI"
/>
```

Reemplaza `TU_URL_DE_GOOGLE_SCRIPT_AQUI` con la URL que copiaste en el Paso 3.

---

## 👥 Parte 2: Confirmación de Asistencia

### Paso 1: Crear la Hoja de Cálculo para Asistencias
1. En la **misma hoja de cálculo** de Google Sheets (o crea una nueva si prefieres)
2. Agrega una **nueva pestaña/hoja** (clic en el + abajo)
3. Nómbrala "Confirmaciones de Asistencia"
4. En la primera fila, agrega estos encabezados:
   - Columna A: **Fecha**
   - Columna B: **Nombre**
   - Columna C: **Email**
   - Columna D: **Teléfono**
   - Columna E: **Asistirá**
   - Columna F: **Número de Personas**
   - Columna G: **Restricciones Alimentarias**
   - Columna H: **Mensaje**

### Paso 2: Crear OTRO Script de Apps Script para Asistencias
1. Ve a **Extensiones** → **Apps Script** (en la misma hoja)
2. En la parte superior, haz clic en el **+** junto a "Archivos"
3. Selecciona **Script**
4. Nómbralo "AsistenciaScript"
5. Copia y pega este código:

```javascript
function doPost(e) {
  try {
    // Obtener la hoja de "Confirmaciones de Asistencia"
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("Confirmaciones de Asistencia");
    
    // Si no existe la hoja, crearla
    if (!sheet) {
      sheet = spreadsheet.insertSheet("Confirmaciones de Asistencia");
      sheet.appendRow([
        "Fecha", "Nombre", "Email", "Teléfono", 
        "Asistirá", "Número de Personas", 
        "Restricciones Alimentarias", "Mensaje"
      ]);
    }
    
    // Parsear los datos recibidos
    var data = JSON.parse(e.postData.contents);
    
    // Agregar una nueva fila con los datos
    sheet.appendRow([
      new Date(),                    // Fecha y hora
      data.nombre || '',             // Nombre completo
      data.email || '',              // Email
      data.telefono || '',           // Teléfono
      data.asistira || '',           // Si/No
      data.numeroPersonas || '',     // Cantidad de personas
      data.restricciones || '',      // Restricciones alimentarias
      data.mensaje || ''             // Mensaje para los novios
    ]);
    
    // Responder con éxito
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

6. Guarda el proyecto (💾)

### Paso 3: Implementar el Script de Asistencia
1. Haz clic en **Implementar** → **Nueva implementación**
2. Selecciona el tipo: **Aplicación web**
3. Configuración:
   - **Descripción**: "API para confirmaciones de asistencia"
   - **Ejecutar como**: Tu cuenta
   - **Quién tiene acceso**: Cualquier persona
4. Haz clic en **Implementar**
5. **¡IMPORTANTE!** Copia esta SEGUNDA URL (será diferente a la primera)
6. Autoriza los permisos si te los pide

### Paso 4: Actualizar el Componente de Asistencia
Abre el archivo `src/components/Invitacion.jsx` y actualiza el componente Asistencia:

```jsx
<Asistencia
  clase="pt-10 bg-fondo-banner font-montserrat"
  claseButton="border-2 py-3 px-6 rounded-full border-[#f0b17e] bg-[#f0b17e] text-white hover:bg-white hover:text-[#f0b17e]"
  linkAsistencia="TU_GOOGLE_FORM_BACKUP"
  googleScriptUrl="TU_URL_DE_GOOGLE_SCRIPT_ASISTENCIA_AQUI"
/>
```

Reemplaza:
- `TU_URL_DE_GOOGLE_SCRIPT_ASISTENCIA_AQUI` con la URL que acabas de copiar
- `TU_GOOGLE_FORM_BACKUP` lo puedes dejar vacío si usas el formulario integrado

---

## 📊 Resumen de URLs que necesitas

Tendrás **DOS URLs diferentes**:

1. **URL para Canciones**: `https://script.google.com/macros/s/ABC.../exec`
   - Va en: `<SongRecommendations googleScriptUrl="URL_AQUI" />`

2. **URL para Asistencia**: `https://script.google.com/macros/s/XYZ.../exec`
   - Va en: `<Asistencia googleScriptUrl="URL_AQUI" />`

---

## 🎯 Ventajas del Formulario de Asistencia Integrado

- ✅ Captura más información (email, teléfono, restricciones alimentarias)
- ✅ Sabe cuántas personas asistirán exactamente
- ✅ Mensajes personalizados de los invitados
- ✅ Todo en tu Google Sheets organizado
- ✅ Se ve hermoso y profesional
- ✅ Fácil de completar desde el móvil

---

## Opción 2: Usar un Servicio Externo (Más Fácil pero Menos Control)

### A) Formspree (Gratis hasta 50 envíos/mes)
1. Ve a [Formspree.io](https://formspree.io)
2. Crea una cuenta gratuita
3. Crea un nuevo formulario
4. Copia el endpoint que te dan
5. Actualiza el componente con la URL de Formspree

### B) Google Forms (Más Simple)
1. Crea un Google Form en [forms.google.com](https://forms.google.com)
2. Agrega estos campos:
   - Nombre (opcional)
   - Nombre de la canción (obligatorio)
   - Artista (obligatorio)
3. Copia el link del formulario
4. Mantén el botón que redirige al formulario (versión original del componente)

---

## Opción 3: EmailJS (Recibir por Email)

### Configuración:
1. Ve a [EmailJS.com](https://www.emailjs.com/)
2. Crea una cuenta gratuita (1000 emails/mes gratis)
3. Configura un servicio de email (Gmail, Outlook, etc.)
4. Crea una plantilla de email
5. Instala EmailJS:
   ```bash
   npm install @emailjs/browser
   ```
6. Actualiza el componente para usar EmailJS

---

## ¿Cuál Opción Elegir?

- **Google Sheets + Apps Script**: Mejor control, los datos en tu propia hoja de cálculo
- **Formspree**: Rápido y simple, pero limitado a 50 envíos en plan gratuito
- **Google Forms**: Lo más simple, pero menos integrado visualmente
- **EmailJS**: Bueno si quieres recibir todo por email

### Recomendación
Para una boda, lo mejor es **Google Sheets + Apps Script** porque:
- ✅ Gratis e ilimitado
- ✅ Todos los datos en un solo lugar
- ✅ Fácil de compartir con el DJ o encargado de música
- ✅ Puedes exportar a Excel si lo necesitas
- ✅ Se ve profesional e integrado

---

## 🆘 Soporte

Si tienes problemas:
1. Verifica que la URL del script sea correcta
2. Asegúrate de que el script esté implementado como "Cualquier persona" puede acceder
3. Revisa la consola del navegador para ver errores
4. Prueba el formulario después de implementar
