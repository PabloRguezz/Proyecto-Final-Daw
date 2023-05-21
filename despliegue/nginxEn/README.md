First, Nginx was used as a web server to host and serve the API on the Arkania virtual machine. The configuration was done within the Nginx configuration file, typically located in the `/etc/nginx` directory.

The configuration starts with a `server` block that defines the virtual server for the `api.alu6852.arkania.es` domain. Within this block, the server root path is specified as `/home/pablo/Proyecto-Final-Daw/src/servidor/Controller/`. This indicates that the API files are located in that directory.

The next section is `location /`, which defines the configuration for the API's base route. Headers are added here to allow access from `http://localhost:4200`. This is achieved by adding the `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, and `Access-Control-Allow-Headers` headers. OPTIONS and GET requests are also handled specifically by adding the corresponding headers.

Next, there is another `location` section that matches any request ending in `.php`. In this section, OPTIONS requests are handled similarly to the previous section. Fastcgi configuration parameters are included, and the PHP-FPM socket path is specified to process PHP files.

Furthermore, `listen 443 ssl` is specified to indicate that the server should listen on port 443 for HTTPS connections. The paths to the required SSL certificates are included to enable secure communication. These certificates are managed by Certbot, a tool for automatically obtaining and renewing SSL/TLS certificates.

Finally, another `server` block is present, which redirects HTTP requests to HTTPS. This is achieved using a 301 redirection when the host is `api.alu6852.arkania.es`. Additionally, `listen 80` is specified to listen on the standard HTTP port.

This is the configuration that was used:
 
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
