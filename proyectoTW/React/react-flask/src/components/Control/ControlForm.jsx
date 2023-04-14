import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import * as ControlServer from "./ControlServer"

const ControlForm = () => {
    const history = useHistory();
    const params = useParams();

    const initialState = { id: 0, fecha: "", temperatura: "", humedad: "", radiacion_solar: "", radiacion_uv: "", medicion_agua: "" };

    const [control, setControl] = useState(initialState);

    const handleInputChange = (e) => {
        setControl({ ...control, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res;
            if (!params.id) {
                res = await ControlServer.registerControl(control);
                const data = await res.json();
                if (data.mensaje === "Curso registrado.") {
                    setControl(initialState);
                }
            } else {
                await ControlServer.updateControl(params.id, control);
            }
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    const getControl = async (controlId) => {
        try {
            const res = await ControlServer.getControl(controlId);
            const data = await res.json();
            const { fecha, temperatura, humedad, radiacion_solar, radiacion_uv, medicion_agua } = data.control;
            setControl({ fecha, temperatura, humedad, radiacion_solar, radiacion_uv, medicion_agua });

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params.id) {
            getControl(params.id);
        }
        // eslint-disable-next-line
    }, []);



    return (
        <div className="col-md-3 mx-auto">
            <h2 className="mb-3 text-center">Día</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Fecha de Registro</label>
                    <input type="date" name="fecha" value={control.fecha} data-date-format="yyyy-mm-dd" onChange={handleInputChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Temperatura</label>
                    <input type="text" name="temperatura" value={control.temperatura} onChange={handleInputChange} className="form-control" minLength="1" maxLength="10" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Humedad</label>
                    <input type="text" name="humedad" value={control.humedad} onChange={handleInputChange} className="form-control" minLength="1" maxLength="10" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Radiación Solar</label>
                    <input type="text" name="radiacion_solar" value={control.radiacion_solar} onChange={handleInputChange} className="form-control" minLength="1" maxLength="10" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Radiación UV</label>
                    <input type="text" name="radiacion_uv" value={control.radiacion_uv} onChange={handleInputChange} className="form-control" minLength="1" maxLength="10" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Medición de agua</label>
                    <input type="text" name="medicion_agua" value={control.medicion_agua} onChange={handleInputChange} className="form-control" minLength="1" maxLength="10" required />
                </div>
                <div className="d-grid gap-2">
                    {params.id ? (
                        <button type="submit" className="btn btn-block btn-primary">
                            Modificar
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-block btn-success">
                            Registrar
                        </button>
                    )}
                </div>
                <script type="text/javascript">
                </script>

            </form>
        </div>
    );
};

export default ControlForm;