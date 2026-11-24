# Lizelyn Beauty

Sitio web de Lizelyn Beauty construido con [Next.js](https://nextjs.org) (App Router), React, Tailwind CSS y Prisma.

## Requisitos

- Node.js 20+
- npm

## Configuración local

1. Instala las dependencias:

```bash
npm install
```

2. Copia el archivo de variables de entorno y ajusta los valores:

```bash
cp .env.example .env
```

Variables disponibles:

| Variable                       | Descripción                                                        |
| ------------------------------ | ------------------------------------------------------------------ |
| `DATABASE_URL`                 | Cadena de conexión a PostgreSQL usada por Prisma.                  |
| `NEXT_PUBLIC_MEDIA_BASE_URL`   | URL base donde están alojadas las fotos. Si está vacía se usa `/fotos/lizelin`. |

3. Genera el cliente de Prisma:

```bash
npx prisma generate
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts

| Comando         | Descripción                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Inicia el servidor de desarrollo.    |
| `npm run build` | Crea la versión de producción.       |
| `npm start`     | Sirve la versión de producción.      |
| `npm run lint`  | Ejecuta ESLint.                      |

## Medios

Las fotos de la galería y los resultados se cargan desde `NEXT_PUBLIC_MEDIA_BASE_URL`.
Solo el logo (`public/fotos/lizelin/logo.jpg`) se guarda en el repositorio.
