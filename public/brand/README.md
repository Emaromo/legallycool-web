# Assets de marca — Legally Cool

Carpeta de destino para los archivos definitivos que va a mandar la diseñadora
(Milagros Carrizo). Mientras no lleguen, el sitio usa placeholders de código
(gradientes con la paleta oficial, formas SVG e íconos hechos a mano) — ver
`BRAND_legallycool.md` y `src/components/brand/`.

Un archivo por subcarpeta reemplaza automáticamente su placeholder apenas se
actualiza la ruta correspondiente en `src/config.ts` (buscar `PLACEHOLDER_` en
ese archivo).

## `logo/`
El logo oficial de Legally Cool. Actualmente en uso: `public/brand/logo-legallycool.png`
(PNG, fondo transparente), referenciado desde `config.marca.logo` en `src/config.ts`
(`/brand/logo-legallycool.png`). Si llega una versión SVG (o con variante para fondo
oscuro), guardarla acá y actualizar esa misma ruta en `config.ts` — `Logo.tsx` la toma
automáticamente, no hace falta tocar `Navbar.tsx` ni `Footer.tsx`.

## `iconos/`
Si la diseñadora manda su propia iconografía (candado, ©, ®, documento,
etiqueta, lápiz, bombita) en vez de usar los SVG simples que ya están en
`src/components/brand/` (`IconoCandado.tsx`, `IconoCopyright.tsx`,
`IconoMarcaRegistrada.tsx`, `IconoDocumento.tsx`, `IconoEtiqueta.tsx`).

**Qué hacer al recibirlos:** reemplazar el contenido de cada componente en
`src/components/brand/` por el SVG real (o cambiar esos componentes para que
hagan `<img src="/brand/iconos/...">`).

## `formas/`
Recursos gráficos del manual: arcos/círculo incompleto, bloques geométricos,
destellos/estrellas — si la diseñadora los provee como archivos en vez de las
versiones simples ya implementadas en `Arco.tsx`, `BloqueGeometrico.tsx` y
`Destello.tsx`.

## `texturas/`
Texturas de papel/reciclado, grain fotográfico o pintura/pigmento (estilo
kinfolk still life) para fondos sutiles.

**Qué hacer al recibirla:** guardar el archivo acá y actualizar
`config.media.textura` en `src/config.ts` con la ruta. Hoy `src/index.css`
tiene una textura tipo grain hecha en CSS puro (muy sutil) como placeholder.

## `fotos/`
Fotografía cálida, natural y editorial: foto de perfil/hero, foto para
"Sobre mí", fotos por área si hacen falta.

**Qué hacer al recibirlas:** guardar los archivos acá y actualizar en
`src/config.ts`:
- `config.media.fotoHero` → poster del video del hero (o reemplazo si el hero
  pasa a ser foto en vez de video).
- `config.media.fotoSobreMi` → foto de la sección "Sobre mí".
- `consultas[].mediaPlaceholder` (en `config.ts`) → foto/video de cada área.
