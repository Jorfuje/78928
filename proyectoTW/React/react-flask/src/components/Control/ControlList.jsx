import React, { useEffect, useState } from "react";

import ControlItem from "./ControlItem";

import * as ControlServer from './ControlServer'

const ControlList=()=>{
    const [controles, setControles]=useState([]);

    const listControles = async () => {
        try{
            const res = await ControlServer.listControles();
            const data = await res.json();
            setControles(data.controles);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        listControles();
    },[]);

    return( 
        <div className="row">
            {controles.map((control) => (
                <ControlItem key={control.id} control={control} listControles={listControles} />
            ))}
        </div>
    );
};

export default ControlList;