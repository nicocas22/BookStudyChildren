# Guías de Estudio 📚

Página web con guías de repaso para las pruebas de los niños.
Todo vive en un solo archivo: **`index.html`**.

## Ver la página

Publicada con **GitHub Pages**:
`https://nicocas22.github.io/BookStudyChildren/`

(Se activa una vez en: **Settings → Pages → Branch: `main` / `root`**.)

## Cómo agregar una guía nueva

Todo está en `index.html`. Para sumar una guía hay 2 pasos:

1. **Tarjeta en la portada.** Busca `<div class="grid" id="guideGrid">` y copia el
   bloque de la tarjeta de "El Imperio Inca" (`<a class="guide-card" ...>`).
   Cambia el `href="#mi-guia"`, el `data-mat` (materia), el emoji, el título y la
   descripción. Las materias disponibles son: `historia`, `mate`, `lengua`, `ciencias`.

2. **Pantalla de la guía.** Busca `<div id="screen-incas" hidden>` y copia todo ese
   bloque. Cámbiale el `id` a `screen-mi-guia` (tiene que coincidir con el `href`
   de la tarjeta, sin el `#`) y reemplaza el contenido de los temas.

El vocabulario (tarjetas para dar vuelta) y el quiz se editan en el `<script>` del
final, en las listas `vocab` y `quiz`.

> 💡 Si te da lata hacerlo a mano, pídele a Claude Code que agregue la guía nueva:
> "agrega una guía de [materia] sobre [tema] siguiendo el mismo formato".

## Publicar cambios

Cada vez que edites `index.html`:

```bash
git add .
git commit -m "Nueva guía: ..."
git push
```

En un par de minutos se actualiza solo en la página.
