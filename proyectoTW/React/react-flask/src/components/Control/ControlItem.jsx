import React from "react";
import { useHistory } from "react-router-dom";

import * as ControlServer from "./ControlServer";

const ControlItem = ({ control, listControles }) => {
    const history = useHistory();
    
    const handleDelete = async (controlId) =>  { 
        await ControlServer.deleteControl(controlId);
        listControles();
    };

    return (
        <div className="col-md-4">
            <div className="card card-body">
                <h3 className="card-title">
                <button onClick={() => history.push(`/updateControl/${control.id}`)} className="ms-2 btn btn-sm btn-info">
                    Modificar
                </button>
                </h3>
                <p className="card-text">Fecha: <strong>{control.fecha}</strong></p>
                <p className="card-text">temperatura: <strong>{control.temperatura}</strong></p>
                <p className="card-text">humedad: <strong>{control.humedad}</strong></p>
                <p className="card-email">radiacion_solar: <strong>{control.radiacion_solar}</strong></p>
                <p className="card-text">radiacion_uv: <strong>{control.radiacion_uv}</strong></p>
                <p className="card-text">medicion_agua: <strong>{control.medicion_agua}</strong></p>
                <button onClick={() =>control.id && handleDelete(control.id)} className="btn btn-danger my-2" >Eliminar</button>
            </div>
        </div>
    );
};

export default ControlItem;