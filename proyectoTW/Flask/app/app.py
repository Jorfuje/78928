from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin

from config import config


app = Flask(__name__)

CORS(app)

conexion = MySQL(app)

@cross_origin
@app.route('/invernadero/', methods=['GET'])
#def invernadero():
 #   return jsonify({"Control Invernadero" + "- semana 1" : control})
def listar_dias():
    try:
        cursor = conexion.connection.cursor()
        sql = "SELECT id, fecha, temperatura, humedad, radiacion_solar, radiacion_uv, medicion_agua  FROM control"
        cursor.execute(sql)
        datos = cursor.fetchall()
        controles = []
        for fila in datos:
            cnt={'id':fila[0], 'fecha':fila[1],'temperatura':fila[2],'humedad':fila[3], 'radiacion_solar':fila[4], 'radiacion_uv':fila[5], 'medicion_agua':fila[6]}
            controles.append(cnt)
        return jsonify({'controles':controles, 'mensaje':"Controles listados."}) 
    except Exception as ex:
        return jsonify({'mensaje': "Error"})

def pagina_no_econtrada(error):
    return "<h1>La página que intentas buscar no existe ...</h1>", 404

@cross_origin
@app.route('/invernadero/<id>', methods=['GET'])
def leer_control(id):
    try:
        cursor = conexion.connection.cursor()
        sql = "SELECT id, fecha, temperatura, humedad, radiacion_solar, radiacion_uv, medicion_agua  FROM control WHERE id = '{0}'".format(id)
        cursor.execute(sql)
        datos = cursor.fetchone()
        if datos != None:
            cnt={'id':datos[0], 'fecha':datos[1],'temperatura':datos[2],'humedad':datos[3], 'radiacion_solar':datos[4], 'radiacion_uv':datos[5], 'medicion_agua':datos[6]}
            return jsonify({'control':cnt, 'mensaje':"Control listado."})
        else:
            return jsonify({'mensaje': "Control no encontrado"})
    except Exception as ex:
        return jsonify({'mensaje': "Error"})
    
@cross_origin
@app.route('/invernadero/', methods=['POST'])
def registrar_dia():
    # print(request.json)
    try:
        cursor = conexion.connection.cursor()
        sql = """INSERT INTO control (fecha, temperatura, humedad, radiacion_solar, radiacion_uv, medicion_agua) 
            VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}')""".format(request.json['fecha'],request.json['temperatura'],request.json['humedad'], 
                                                                               request.json['radiacion_solar'],request.json['radiacion_uv'],request.json['medicion_agua'])
        cursor.execute(sql)
        conexion.connection.commit()  # Confirma la acción de inserción.
        return jsonify({'mensaje': "Curso registrado."})
    except Exception as ex:
        return jsonify({'mensaje': "Error"})

@cross_origin        
@app.route('/invernadero/<id>', methods=['PUT'])
def actualizar_dia(id):
    try:
        cursor = conexion.connection.cursor()
        sql =  """UPDATE control SET fecha = '{0}', temperatura = '{1}', humedad = '{2}', radiacion_solar = '{3}', radiacion_uv = '{4}', 
        medicion_agua = {5} WHERE  id = '{6}'""".format(request.json['fecha'],request.json['temperatura'],request.json['humedad'], 
                                                                               request.json['radiacion_solar'],request.json['radiacion_uv'],request.json['medicion_agua'], id)
        cursor.execute(sql)
        conexion.connection.commit()  # Confirma la acción de actualización.
        return jsonify({'mensaje': "Control actualizado."})
    except Exception as ex:
        return jsonify({'mensaje': "Error"})


@cross_origin
@app.route('/invernadero/<id>', methods=['DELETE'])
def eliminar_curso(id):
    try:
        cursor = conexion.connection.cursor()
        sql = "DELETE FROM control WHERE id = '{0}'".format(id)
        cursor.execute(sql)
        conexion.connection.commit()  # Confirma la acción de eliminación.
        return jsonify({'mensaje': "Control eliminado."})
    except Exception as ex:
        return jsonify({'mensaje': "Error"})
   
"""@app.route('/invernadero/<int:control_fecha>')
def getDatos(control_fecha):
    datos = [dato for dato in control if dato['fecha'] == control_fecha]
    return jsonify(datos[0])"""

if __name__=='__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404, pagina_no_econtrada)
    app.run()