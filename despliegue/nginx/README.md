En primer lugar, se utilizó Nginx como servidor web para alojar y servir la API en la máquina virtual Arkania. La configuración se realizó dentro del archivo de configuración de Nginx, generalmente ubicado en el directorio `/etc/nginx`.

La configuración comienza con un bloque `server` que define el servidor virtual para el dominio `api.alu6852.arkania.es`. Dentro de este bloque, se especifica la ruta de la raíz del servidor, que en este caso es `/home/pablo/Proyecto-Final-Daw/src/servidor/Controller/`. Esto indica que los archivos de la API se encuentran en ese directorio.

La siguiente sección es `location /`, que define la configuración para la ruta base de la API. Aquí se agregan cabeceras para permitir el acceso desde `http://localhost:4200`. Esto se logra mediante la adición de las cabeceras `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods` y `Access-Control-Allow-Headers`. También se manejan las solicitudes OPTIONS y GET de manera específica, agregando las cabeceras correspondientes.

Después, hay otra sección `location` que hace coincidir cualquier solicitud que termine en `.php`. En esta sección, también se manejan las solicitudes OPTIONS de manera similar a la sección anterior. Luego, se incluyen los parámetros de configuración de fastcgi y se especifica la ruta del socket de PHP-FPM para procesar los archivos PHP.

A continuación, se especifica `listen 443 ssl` para indicar que el servidor debe escuchar en el puerto 443 para conexiones HTTPS. Además, se incluyen las rutas de los certificados SSL necesarios para habilitar la comunicación segura. Estos certificados son gestionados por Certbot, una herramienta para obtener y renovar automáticamente certificados SSL/TLS.

Finalmente, se encuentra otro bloque `server` que redirige las solicitudes HTTP a HTTPS. Esto se logra utilizando una redirección 301 en caso de que el host sea `api.alu6852.arkania.es`. También se especifica `listen 80` para escuchar en el puerto HTTP estándar.

Esta es la configuración utilizada: 

```
server {
    server_name api.alu6852.arkania.es;
    root /home/pablo/Proyecto-Final-Daw/src/servidor/Controller/;

location / {
  add_header 'Access-Control-Allow-Origin' 'http://localhost:4200' always;
  add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, DELETE, PUT' always;
  add_header 'Access-Control-Allow-Headers' 'Authorization' always;
  if ($request_method = 'OPTIONS') {
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'Authorization' always;
    add_header 'Access-Control-Max-Age' 1728000;
    add_header 'Content-Type' 'text/plain; charset=utf-8';
    add_header 'Content-Length' 0;
    return 204;
  }
  if ($request_method = 'GET') {
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
    add_header 'Access-Control-Expose-Headers' 'Authorization' always;
  }
}

    location ~ \.php$ {
        if ($request_method = 'OPTIONS') {
	add_header 'Access-Control-Allow-Origin' '*';
	add_header 'Access-Control-Allow-Headers' 'Authorization' always;

            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            add_header 'Content-Length' 0;
            return 204;
        }
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
 
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/api.alu6852.arkania.es/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/api.alu6852.arkania.es/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = api.alu6852.arkania.es) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    server_name api.alu6852.arkania.es;
    listen 80;
    return 404; # managed by Certbot


}
```
