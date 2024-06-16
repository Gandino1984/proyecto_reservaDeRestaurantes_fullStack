import { getToken } from "./local";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const fetchData = async (route, method, inputData = null) => {
    console.log("INPUTDATA", inputData);
    console.log("La API URL es", API_URL);
    console.log("La ruta es", route);

    const url = new URL(`${API_URL}${route}`);
    console.log("URL", url);

    const fetchOptions = {
        method: method.toUpperCase(), // Asegúrate de que el método esté en mayúsculas
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    };

    if (inputData) {
        if (method.toLowerCase() === "get") {
            Object.keys(inputData).forEach(key => {
                url.searchParams.append(key, inputData[key]);
            });
        } else if (["post", "put", "patch"].includes(method.toLowerCase())) {
            fetchOptions.body = JSON.stringify(inputData);
        }
    }

    try {
        const response = await fetch(url.toString(), fetchOptions);

        // Verifica si la respuesta HTTP no es exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return { error: error.message };
    }
};

export default fetchData;
