import { addImage, getImages } from "../../controllers/images.js";
const routesImages = (app) => {
    const baseURL = "/api/images";
    app.get(baseURL, getImages);
    app.post(baseURL, addImage);
};
export { routesImages };
//# sourceMappingURL=images.js.map