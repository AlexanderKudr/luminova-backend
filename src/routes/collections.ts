import { Express } from "express";
import { collectionControllers } from "../controllers";

const {
  createCollection,
  getProfileCollections,
  editCollection,
  deleteCollection,
  updateImageInCollection,
  openCollectionByID,
} = collectionControllers;

const collections = (app: Express) => {
  const baseURL = "/collections";
  app.post(`${baseURL}/create`, createCollection);
  app.get(`${baseURL}/profile`, getProfileCollections);
  app.put(`${baseURL}/edit`, editCollection);
  app.delete(`${baseURL}/delete`, deleteCollection);
  app.post(`${baseURL}/updateimage`, updateImageInCollection);
  app.post(`${baseURL}/openbyid`, openCollectionByID);
};

export { collections };
