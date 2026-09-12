# Generar el audio de las guías (voz humana)

El botón "Escuchar" de cada guía reproduce archivos MP3 pregrabados con una voz
neuronal gratuita de Microsoft Edge (sin cuenta ni clave). Los audios están en
`audio/<guia>/<id-seccion>.mp3`.

## Regenerar (si cambia el texto de una guía)

Requiere Node.js. Desde esta carpeta:

```bash
npm install msedge-tts node-html-parser
node generate-audio.mjs
```

- Lee el texto de cada `<section class="topic">` del `index.html` y crea un MP3
  por sección en `audio/incas/`.
- Voz por defecto: `es-CL-CatalinaNeural` (chilena). Para cambiarla:
  `VOICE=es-CL-LorenzoNeural node generate-audio.mjs` (voz masculina chilena),
  u otra como `es-MX-DaliaNeural`, `es-PE-CamilaNeural`, etc.
- Si agregas otra guía, ajusta el selector `#screen-incas` en el script.
