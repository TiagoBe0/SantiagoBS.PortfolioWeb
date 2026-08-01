# Skills del proyecto

## ui-ux-pro-max

Base de datos consultable de criterios de UI/UX: 84 estilos, 192 paletas,
74 pares tipográficos, 98 guías de UX y 25 tipos de gráficos, con guías por stack.

- **Origen:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- **Versión:** 2.11.0
- **Licencia:** MIT
- **Requisitos:** Python 3.x (solo librería estándar; los scripts no instalan nada
  ni hacen llamadas de red)

### Uso

Desde la raíz del proyecto:

```bash
# Buscar por dominio: style, color, typography, ux, chart, product, landing, motion, icon
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "dark portfolio developer" --domain style

# Generar un sistema de diseño completo
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "developer portfolio physics research" --design-system -p "Portfolio SBS"

# Guías específicas de un stack
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "responsive layout" --stack html-tailwind
```

Claude Code activa la skill automáticamente en tareas de diseño de interfaz;
no hace falta invocarla a mano.

### Cambios respecto del upstream

1. Solo se copió la skill `ui-ux-pro-max`. Las otras seis del repo original
   (`ui-styling`, `design`, `design-system`, `slides`, `brand`, `banner-design`)
   apuntan a shadcn/Tailwind/React, generación de logos y presentaciones — nada
   de eso aplica a un sitio estático de un solo `index.html`.
2. En `SKILL.md` se reemplazaron las 11 rutas `${CLAUDE_PLUGIN_ROOT}/...` por
   rutas relativas a la raíz del proyecto. Esa variable solo existe cuando la
   skill se instala como plugin del marketplace, y acá está vendorizada.
3. Se eliminó `scripts/tests/`.

### Actualizar

No hay update automático: al estar vendorizada, hay que recopiar desde el
repo original y volver a aplicar los puntos 2 y 3.
