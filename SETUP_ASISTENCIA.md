# 🚀 Configuración Rápida - Confirmación de Asistencia

## Lo que vas a hacer:

Crear un segundo Google Script para manejar las confirmaciones de asistencia de manera similar a las recomendaciones de canciones.

---

## 📝 Pasos Rápidos:

### 1️⃣ Preparar la Hoja de Cálculo

En tu Google Sheets (la misma donde están las canciones o una nueva):

1. Crea una nueva pestaña/hoja (botón **+** abajo)
2. Nómbrala: **"Confirmaciones de Asistencia"**
3. Primera fila (encabezados):
   ```
   Fecha | Nombre | Email | Teléfono | Asistirá | Nº Personas | Restricciones | Mensaje
   ```

### 2️⃣ Crear el Script

1. **Extensiones** → **Apps Script**
2. Clic en **+** junto a "Archivos" → **Script**
3. Nombre: "AsistenciaScript"
4. Pega este código:

```javascript
function doPost(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("Confirmaciones de Asistencia");
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet("Confirmaciones de Asistencia");
      sheet.appendRow([
        "Fecha", "Nombre", "Email", "Teléfono", 
        "Asistirá", "Número de Personas", 
        "Restricciones Alimentarias", "Mensaje"
      ]);
    }
    
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.nombre || '',
      data.email || '',
      data.telefono || '',
      data.asistira || '',
      data.numeroPersonas || '',
      data.restricciones || '',
      data.mensaje || ''
    ]);
    
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

5. Guarda (💾)

### 3️⃣ Implementar

1. **Implementar** → **Nueva implementación**
2. Tipo: **Aplicación web**
3. Configuración:
   - Ejecutar como: **Tu cuenta**
   - Quién tiene acceso: **Cualquier persona**
4. **Implementar**
5. **COPIA LA URL** (será diferente a la de canciones)

### 4️⃣ Actualizar el Código

En `src/components/Invitacion.jsx`, busca `<Asistencia` y actualiza:

```jsx
<Asistencia
  clase="pt-10 bg-fondo-banner font-montserrat"
  claseButton="border-2 py-3 px-6 rounded-full border-[#f0b17e] bg-[#f0b17e] text-white hover:bg-white hover:text-[#f0b17e]"
  linkAsistencia=""
  googleScriptUrl="PEGA_TU_URL_AQUI"
/>
```

---

## ✅ ¿Qué captura este formulario?

- ✅ Nombre completo
- ✅ Email (opcional)
- ✅ Teléfono (opcional)
- ✅ Si asistirá o no
- ✅ Número de personas (si asiste)
- ✅ Restricciones alimentarias (si asiste)
- ✅ Mensaje personalizado (opcional)

---

## 💡 Ventajas vs Google Forms:

| Google Forms | Formulario Integrado |
|--------------|---------------------|
| Salen de tu página | Se queda en tu invitación |
| UI básica | Hermoso y personalizado |
| Menos datos | Captura más información |
| Otro link más | Todo en uno |

---

## 🆘 Si algo no funciona:

1. Verifica que la hoja se llame exactamente "Confirmaciones de Asistencia"
2. Asegúrate de que el script esté implementado con acceso "Cualquier persona"
3. La URL debe terminar en `/exec` (no `/dev`)
4. Prueba el formulario después de guardar los cambios
5. Revisa la consola del navegador (F12) para ver errores

---

## 🎯 Resultado Final:

Tendrás un formulario hermoso integrado en tu invitación donde los invitados pueden:
- Confirmar su asistencia con un clic
- Indicar cuántas personas vienen
- Informar restricciones alimentarias
- Dejar un mensaje para los novios

Todo esto se guardará automáticamente en tu Google Sheets, organizado y listo para compartir con el salón/catering.

¡Mucha suerte! 💕
