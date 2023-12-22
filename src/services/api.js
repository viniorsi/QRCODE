import axios from "axios";

const api = axios.create({
    baseURL:'http:/192.168.88.123/:9092/tickets/qrcodeid/',
});

export { api }