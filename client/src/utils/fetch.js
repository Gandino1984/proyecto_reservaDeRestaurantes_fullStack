import { getToken } from "./local";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const fetchData = async (route, method, inputData = null) => {
    console.log("INPUTDATA", inputData)
    console.log("La APIURL es", API_URL)
    console.log("La ruta es", route)
    const url = new URL(API_URL + route);
    console.log("URL", url)
    const fetchOptions = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    };
    if (inputData) {
        if (method === "get") {
            Object.keys(inputData).forEach(key => {
                url.searchParams.append(key, inputData[key]);
            });
        } else if (method === "post" || method === "put" || method === "patch") {
            fetchOptions.body = JSON.stringify(inputData);
        }
    }
    try {
        const result = await fetch(url.toString(), fetchOptions);
        const data = await result.json();
        return data;
    } catch (error) {
        console.error(error);
        return ({ error: error.message });
    }
};

export default fetchData;