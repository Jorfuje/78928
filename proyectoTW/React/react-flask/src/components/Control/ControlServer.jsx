const API_URL="http://127.0.0.1:5000/invernadero/";

export const listControles = async () => {
    return await fetch(API_URL);
};

export const getControl = async (controlId) => {
    return await fetch(`${API_URL}${controlId}`);
};

export const registerControl = async (newControl) => {
    return await fetch(API_URL,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "fecha":String(newControl.fecha),
            "temperatura":parseFloat(newControl.temperatura),
            "humedad":parseFloat(newControl.humedad),
            "radiacion_solar":parseFloat(newControl.radiacion_solar),
            "radiacion_uv":parseFloat(newControl.radiacion_uv),
            "medicion_agua":parseFloat(newControl.medicion_agua),
        })
    });
};

export const updateControl = async (controlId, updatedControl) => {
    return await fetch(`${API_URL}${controlId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "fecha":String(updatedControl.fecha),
            "temperatura":parseFloat(updatedControl.temperatura),
            "humedad":parseFloat(updatedControl.humedad),
            "radiacion_solar":parseFloat(updatedControl.radiacion_solar),
            "radiacion_uv":parseFloat(updatedControl.radiacion_uv),
            "medicion_agua":parseFloat(updatedControl.medicion_agua),
        })
    });
};

export const deleteControl = async (controlId) => {
    return await fetch (`${API_URL}${controlId}`, {
        method: 'DELETE'
    });
};