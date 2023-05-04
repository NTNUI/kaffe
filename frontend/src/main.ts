import axios from "axios";
import "./app.css";
import App from "./App.svelte";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const app = new App({
  target: document.getElementById("app"),
});

export default app;
