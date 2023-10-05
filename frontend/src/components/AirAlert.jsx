import { useState } from "react";

function AirAlert({ strada }) {

    const [show, setShow] = useState(true);

    return (
        <div onClick={() => setShow(false)} className={`bg-red-100 border border-red-400 text-red-700 px-4 py-5 rounded relative alert text-sm ${show ? null : 'hide'}`} role="alert">
            <strong className="font-bold">Atentie! </strong>
            <p className="inline">Concentratia din zona <strong>{strada}</strong> este ridicata!</p>
        </div>
    );
}

export default AirAlert;