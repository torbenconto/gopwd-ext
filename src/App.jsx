import {useEffect, useState} from 'react';
import ListPasswords from "./ListPasswords.jsx";
import Api from "./Api.jsx";
import {detectApi} from "./util/api.js";

function App() {
    const [valid, setValid] = useState(false);
    const [host, setHost] = useState("127.0.0.1");
    const [port, setPort] = useState("8076");
    const [activeTab, setActiveTab] = useState("passwords"); // Step 1

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        async function checkApi() {
            const isApiValid = await detectApi(host, port);
            setValid(isApiValid);
        }

        checkApi();
    }, [])

    return (
        <div className="bg-gopwd-gray text-white">
            <div className="flex items-center justify-between p-1">
                <div className="flex-grow">
                    <div className="flex justify-center space-x-1">
                        <button onClick={() => handleTabClick("passwords")} className={`px-2 py-1 rounded border border-black ${activeTab === "passwords" ? "border-white" : ""}`}>Passwords</button>
                        <button onClick={() => handleTabClick("settings")} className={`px-2 py-1 rounded border border-black ${activeTab === "settings" ? "border-white" : ""}`}>Settings</button>
                    </div>
                </div>
                <div className="flex justify-end flex-shrink fixed right-1">
                    {valid ? (
                        <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                    ) : (
                        <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                    )}
                </div>
            </div>
            {valid ? (activeTab === "passwords" && <ListPasswords host={host} port={port} />) : (<p className="px-4 break-words">api not found, try running gopwd api up or changing your settings to use a custom port.</p>)}
            {activeTab === "settings" && <Api valid={valid} setValid={setValid} host={host} setHost={setHost} port={port} setPort={setPort} />}
        </div>
    );
}

export default App;