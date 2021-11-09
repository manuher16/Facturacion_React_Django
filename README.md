@author <orson.manuel@gmail.com>
@version 1.0

# App Web Facturacion

Aplicacion de Facturacion realizada con Django,React,Bootstrap

## Dependecias Django

- Instalar Python 3 [click aqui](https://www.python.org/downloads/)
- Instalar dependecia para poder crear entornos virtuales.

        py -m pip install --user virtualenv
- Crear entorno virtualenv.

        py -m venv env
- Iniciar entorno virtual 

        .\env\Scripts\activate
- Instalar Django.

      python -m pip install Djang

- Django Cors Headers

        pip install django-cors-headers

- Django Rest Framework

        pip install djangorestframework
        pip install markdown       # Markdown support for the browsable API.
        pip install django-filter  # Filtering support

### Iniciar Backend

Antes haber activado el entorno virtual para que pueda correr **Django**.

Para iniciar servidor, se recomienda inicar el servidor en el puerto 3030, ya que la base de entorno del frontend esta configurada.

    REACT_APP_API_URL=http://127.0.0.1:3030

Si desea iniciar el servidro de django en otro puerto se recomienda cambiar el valor de REACT_APP_API_URL del archivo **.env** de la carpeta base del frontend.

Iniciamos servidor

    python manage.py runserver 3030

Si en algun caso no se creo ninguna base de datos, usar los siquiente comandos.

    python manage.py makemigrations
    python manage.py migrate

## Iniciar Frontend

Primero instalar todas las dependencias necesarias mediante sistema de paqeutes NODE, para que la aplicación se ejecute correctamente.

    npm i

Iniciar servidor App Facturacion.

    npm run start

Crear pagina estatica para produccion.

    npm run build
