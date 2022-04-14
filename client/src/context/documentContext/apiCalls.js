import axios from "axios";
import {
  createDocumentFailure,
  createDocumentStart,
  createDocumentSuccess,
  deleteDocumentFailure,
  deleteDocumentStart,
  deleteDocumentSuccess,
  getDocumentsFailure,
  getDocumentsStart,
  getDocumentsSuccess,
} from "./DocumentActions";

export const getDocuments = async (dispatch) => {
  dispatch(getDocumentsStart());
  try {
    const res = await axios.get("/documents", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getDocumentsSuccess(res.data));
  } catch (err) {
    dispatch(getDocumentsFailure());
  }
};

//create
export const createDocument = async (document, dispatch) => {
  dispatch(createDocumentStart());
  try {
    const res = await axios.post("/documents", document, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createDocumentSuccess(res.data));
  } catch (err) {
    dispatch(createDocumentFailure());
  }
};

//delete
export const deleteDocument = async (id, dispatch) => {
  dispatch(deleteDocumentStart());
  try {
    await axios.delete("/documents/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteDocumentSuccess(id));
  } catch (err) {
    dispatch(deleteDocumentFailure());
  }
};
