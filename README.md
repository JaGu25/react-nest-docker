
# Proyecto con Docker Compose

Este proyecto utiliza **Docker Compose** para orquestar los contenedores.

## Requisitos

- **Docker**: [Instrucciones de instalación](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Instrucciones de instalación](https://docs.docker.com/compose/install/)

## Instrucciones para levantar el proyecto

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. Reempleza el contenido de tus variables de entorno del .env.example

3. Levanta los contenedores con Docker Compose:

   ```bash
   docker-compose up -d
   ```

   El parámetro `-d` ejecuta los contenedores en segundo plano.

4. Accede a las aplicaciones (si están expuestas en puertos como el 3000 o 80):

   - Backend: `http://<host>:3000`
   - Frontend: `http://<host>:80`

6. Para detener los contenedores:

   ```bash
   docker-compose down
   ```

---
