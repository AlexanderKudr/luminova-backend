import { createCollection } from "./createCollection";
import { getProfileCollections } from "./getProfileCollections";
import { editCollection } from "./editCollection";
import { deleteCollection } from "./deleteCollection";
import { updateImageInCollection } from "./updateImageInCollection";
import { openCollectionByID } from "./openCollectionByID";

export const collectionControllers = {
  createCollection,
  getProfileCollections,
  editCollection,
  deleteCollection,
  updateImageInCollection,
  openCollectionByID
};
