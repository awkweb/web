import { camelize } from "@ridi/object-case-converter";
import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.butter.so/v1/"
    : "https://api.butter.local/v1/";

export default axios.create({
  baseURL,
  transformResponse: [
    data => {
      if (data) {
        return camelize(JSON.parse(data), { recursive: true });
      }
    }
  ]
});
