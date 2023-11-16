from flask import jsonify, url_for


class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)


def generate_sitemap(app):
    unique_endpoints = set()
    for rule in app.url_map.iter_rules():
        if has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if url != "/" and "/admin/" not in url:
                unique_endpoints.add(url)

    links_html = "".join(["<li style='padding: 10px 0 5px 0;'><a style='text-decoration: none; color: white; text-transform: uppercase;' href='" + y +
                         "' onmouseover='this.style.color=\"darkred\"' onmouseout='this.style.color=\"white\"' onclick='this.style.color=\"blue\"'>" + y + '</a></li>' for y in unique_endpoints])

    additional_data_html = """
        <h2 style="margin: 20px 0px 10px 0px; font-size:40px;">ENDPOINTS REQUESTS GUIDE</h2>
        <div style="text-align: left; padding: 40px; margin: 20px 100px; background-color: #333; border-radius: 10px;">
            <p><strong>SIGNUP:</strong></p>
            <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto; color: black;">
                {
                    "email":"pelado@gmail.com",
                    "password":"123456",
                    "name":"Esteban",
                    "last_name":"Trebuq",
                    "address":"Buenos Aires"
                }
            </pre>
        </div>
        <div style="text-align: left; padding: 40px; margin: 20px 100px; background-color: #333; border-radius: 10px;">
            <p><strong>LOGIN:</strong></p>
            <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto; color: black;">
                {
                    "email":"pelado@gmail.com",
                    "password":"123456"
                }
            </pre>
        </div>
        </div>
        <div style="text-align: left; padding: 40px; margin: 20px 100px; background-color: #333; border-radius: 10px;">
            <p><strong>CREATE NEW INGREDIENT:</strong></p>
            <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto; color: black;">
                {
                "nombre": "Harina",
                "clasificacion": "Almacen",
                "unidad_medida": "Kilos",
                "cantidad": 100,          
                "minimo_stock": 10        
                }
            </pre>
        </div>
        <div style="text-align: left; padding: 40px; margin: 20px 100px; background-color: #333; border-radius: 10px;">
            <p><strong>CREATE RECETA:</strong></p>
            <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto; color: black;">
                {
                "nombre": "Croissants",
                "rinde": 100,
                "unidad_medida": "unidades",
                "ingredientes": [
                    {
                    "materia_prima_id": 1,
                    "cantidad_necesaria": 200
                    },
                    {
                    "materia_prima_id": 2,
                    "cantidad_necesaria": 300
                    }
                    // ... 
                ]
                }
            </pre>
        </div>
        <div style="text-align: left; padding: 40px; margin: 20px 100px; background-color: #333; border-radius: 10px;">
            <p><strong>UPDATE INGREDIENT:</strong></p>
            <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto; color: black;">
                {
                "materia_prima_id": 1,
                "cantidad_stock": 150,  
                "minimo_stock": 20      
                }
            </pre>
        </div>
        <div style="text-align: left; padding: 40px; margin: 20px 100px; background-color: #333; border-radius: 10px;">
            <p><strong>UPDATE RECETA:</strong></p>
            <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto; color: black;">
                {
                "nombre": "Nombre Actualizado de Receta",
                "rinde": 150,
                "unidad_medida": "Kg",
                "ingredientes": [
                    {"materia_prima_id": 1, "cantidad_necesaria": 200},
                    {"materia_prima_id": 2, "cantidad_necesaria": 300},
                    {"materia_prima_id": 3, "cantidad_necesaria": 150}
                ]
                }
            </pre>
        </div>
        <div style="text-align: left; padding: 40px; margin: 20px 100px; background-color: #333; border-radius: 10px;">
            <p><strong>UPDATE PRODUCTO:</strong></p>
            <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto; color: black;">
                {
                "id": 123,
                "cantidad_inventario": 50,
                "clasificacion": "Algo",
                "cantidad_inventario_minimo": 10
                 }
            </pre>
        </div>
        <div style="text-align: left; padding: 40px; margin: 20px 100px; background-color: #333; border-radius: 10px;">
            <p><strong>DELETE PRODUCTO:</strong></p>
            <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto; color: black;">
            {
            "product_id": 123
            }
            </pre>
        </div>
        <div style="text-align: left; padding: 40px; margin: 20px 100px; background-color: #333; border-radius: 10px;">
            <p><strong>DELETE MATERIA PRIMA:</strong></p>
            <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto; color: black;">
            {
            "materia_prima_id": 789
            }
            </pre>
        </div>
    """
    return f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>AlmaCena API</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@700&family=Montserrat&family=Pixelify+Sans&display=swap" rel="stylesheet">
        </head>
        <body style="background-color: #415e4c; color: white; text-align: center; font-family: 'Montserrat', arial;">
        <div style="text-align: center;">
        <img style="max-height: 600px" src="https://i.ibb.co/16FC60X/logoalmacena.png" />
        <div style="position: fixed; bottom: 0; right: 0; margin: 40px;">
                <button style="font-family: 'Barlow', sans-serif; border-radius: 40px;background-color: grey; padding: 20px; box-shadow: 0px 0px 10px 0px white; transition: all 0.3s ease;"
                    onmouseover="this.style.backgroundColor='rgba(65, 94, 76, 1)'; this.style.boxShadow='0px 0px 20px 0px white';"
                    onmouseout="this.style.backgroundColor='grey'; this.style.boxShadow='0px 0px 10px 0px white';">
                    <a style="text-decoration: none; font-size: 20px; color: white;" href="/admin">ADMIN MODE</a>
                </button>
         </div>
        <h1>Welcome to AlmaCena API</h1>
         <p style="font-size:25px;">API HOST <script>document.write('<input style="padding: 10px; margin-left: 20px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <h2 style="margin: 320px 0px 10px 0px; font-size:60px;">ENDPOINTS</h2>
        <div>
        <ul style="text-align: center; font-size: 25px; list-style-type: none; padding-right:30px; margin-bottom: 150px;">{links_html}</ul>
        {additional_data_html}
        </div>
        </body>
        </html>
        """
