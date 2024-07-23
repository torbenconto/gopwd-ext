import {useEffect} from "react";
import { detectApi } from "./util/api.js";


function Api( { valid, setValid, host, setHost, port, setPort } ) {
    const checkApi = async () => {
        const isApiValid = await detectApi(host, port);
        setValid(isApiValid);
    };

    useEffect(() => {
        checkApi();
    }, []);

    return (
        <div className="flex flex-col space-y-1 px-1">
            <input
                type="text"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="px-4 py-2 border border-white rounded shadow-sm text-black"
                placeholder="Host"
            />
            <input
                type="text"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="px-4 py-2 border rounded shadow-sm text-black"
                placeholder="Port"
            />
            <button
                onClick={checkApi}
                className="px-4 py-2 text-white border rounded"
            >
                Check
            </button>
        </div>
    );
}

export default Api;