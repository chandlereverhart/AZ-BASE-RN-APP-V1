import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

// Firebase
import { auth, db } from "../../../Firebase/firebase";

const initialState = {
  isLoading: false,
  progress: 0,
  error: false,
  logBookItems: [],
  logBook: null,
};

const slice = createSlice({
  name: "logBook",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    // START UPLOADING
    startUploading(state, action) {
      state.progress = action.payload;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET NOTIFICATIONS
    getLogbookItemsSuccess(state, action) {
      state.isLoading = false;
      state.logBookItems = action.payload;
    },

    // Add Logbook
    getLogbookAddSuccess(state, action) {
      state.isLoading = false;
    },

    // // DELETE NOTIFICATION
    deleteLogbookSuccess(state, action) {
      state.isLoading = false;
      state.logBookItems = state.logBookItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

// Reducer
export default slice.reducer;

// deleteLogbookItems in storage-----------------------//
export function deleteLogBook(jump) {
  return async (dispatch) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const jumpObj = db
          .collection("users")
          .doc(user.uid)
          .collection("logBook")
          .where("id", "==", jump.id);
        jumpObj.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
          });
        });
        dispatch(slice.actions.deleteLogbookSuccess(jump.id));
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };
}

// getLogbookItems in storage-----------------------//
/* eslint-disable */

export function getLogBook() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const user = auth.currentUser;
      if (user) {
        const snapshot = await db
          .collection("users")
          .doc(user.uid)
          .collection("logBook")
          .orderBy("jumpNumber", "desc")
          .get();
        const response = snapshot.docs.map((doc) => doc.data());
        dispatch(slice.actions.getLogbookItemsSuccess(response));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

// ----------------------------------------------------------------------

export function addLogBook(values) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const user = auth.currentUser;
      const docId = values.id;

      if (values.id !== "") {
        const jumpObj = db
          .collection("users")
          .doc(user.uid)
          .collection("logBook")
          .where("id", "==", docId);
        jumpObj.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.update({
              ...values,
              jumpNumber: Number(values.jumpNumber),
            });
          });
        });
      } else if (user) {
        db.collection("users")
          .doc(user.uid)
          .collection("logBook")
          .add({
            ...values,
            jumpNumber: Number(values.jumpNumber),
            id: uuid(),
          });
      }
      dispatch(slice.actions.getLogbookAddSuccess());
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };
}
