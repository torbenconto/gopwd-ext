import axios from 'axios';

export const detectApi = async function (host = "127.0.0.1", port = "8076") {
    try {
        const response = await axios.get(`https://${host}:${port}/ping`, { httpsAgent: {
                rejectUnauthorized: false
            } });
        return response.data.message === "pong";
    } catch (error) {
        return false;
    }
}

export const fetchPasswords = async function (host = "127.0.0.1", port = "8076") {
    try {
        const response = await axios.get(`https://${host}:${port}/list`, { httpsAgent: {
                rejectUnauthorized: false
            } });
        return response.data.services;
    } catch (error) {
        return [];
    }
}

export const decryptPassword = async function (host = "127.0.0.1", port = "8076", file, password) {
    try {
        const response = await axios.post(`https://${host}:${port}/get`, {
            service:file,
            gpg_password: password
        }, { httpsAgent: {
                rejectUnauthorized: false
            } });
        return response.data.password;
    } catch (error) {
        return '';
    }
}

export const deletePassword = async function (host = "127.0.0.1", port = "8076", file) {
    try {
        await axios.post(`https://${host}:${port}/delete`, {
            service:file
        }, { httpsAgent: {
                rejectUnauthorized: false
            } });
    } catch (error) {
        return '';
    }
}

export const generatePassword = async function (host = "127.0.0.1", port = "8076", service, length, humanized, symbols, numbers, lowercase, uppercase) {
    const payload = {
        service,
        length,
        humanized,
        symbols,
        numbers,
        lowercase,
        uppercase,
    };
    try {
        const response = await axios.post(`https://${host}:${port}/generate`, payload, {
            httpsAgent: {
                rejectUnauthorized: false
            },
        });
        return response.data.password;
    } catch (error) {
        console.error('Error generating password:', error.message);
        return '';
    }
}

export const insertPassword = async function (host = "127.0.0.1", port = "8076", service, content) {
    try {
        await axios.post(`https://${host}:${port}/insert`, {
            service,
            content
        }, { httpsAgent: {
                rejectUnauthorized: false
            } });
    } catch (error) {
        return '';
    }
}