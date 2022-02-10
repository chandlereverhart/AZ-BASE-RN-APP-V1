import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

// Firebase
import {
  auth,
  db,
  storage,
  UPLOAD_STATE_CHANGED,
} from "../../../Firebase/firebase";

const initialState = {
  isLoading: false,
  progress: 0,
  error: false,
  exitsItems: [],
  exits: null,
};

const slice = createSlice({
  name: "exits",
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
    getExitItemsSuccess(state, action) {
      state.isLoading = false;
      state.exitsItems = action.payload;
    },

    // Add Exit
    getExitAddSuccess(state, action) {
      state.isLoading = false;
    },

    // // DELETE NOTIFICATION
    deleteExitSuccess(state, action) {
      state.isLoading = false;
      state.exitsItems = state.exitsItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

// Reducer
export default slice.reducer;

// deleteExitItems in storage-----------------------//
export function deleteExit(exit) {
  return async (dispatch) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const exitObj = db
          .collection("users")
          .doc(user.uid)
          .collection("exits")
          .where("id", "==", exit.id);
        exitObj.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
          });
        });
        dispatch(slice.actions.deleteExitSuccess(exit.id));
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };
}

// getExitItems in storage-----------------------//
/* eslint-disable */

export function getExits() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const user = auth.currentUser;
      if (user) {
        const snapshot = await db
          .collection("users")
          .doc(user.uid)
          .collection("exits")
          .orderBy("exitName", "asc")
          .get();
        const response = snapshot.docs.map((doc) => doc.data());
        dispatch(slice.actions.getExitItemsSuccess(response));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

// ----------------------------------------------------------------------

// export function addExit(values) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     let exitRef;
//     const user = auth.currentUser;
//     const docId = values.id;
//     if (values.id !== "") {
//       exitRef = db
//         .collection("users")
//         .doc(user.uid)
//         .collection("exits")
//         .doc(docId);
//     } else {
//       exitRef = db.collection("users").doc(user.uid).collection("exits").doc();
//     }

//     const firebaseObject = {
//       ...values,
//       id: exitRef.id,
//     };
//     try {
//       await exitRef.set(firebaseObject, { merge: true });

//       dispatch(slice.actions.getExitAddSuccess());
//     } catch (error) {
//       console.log(error);
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// ----------------------------------------------------------------------
export function addExit(values) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    let exitRef;
    const user = auth.currentUser;
    const docId = values.id;
    if (values.id !== "") {
      exitRef = db
        .collection("users")
        .doc(user.uid)
        .collection("exits")
        .doc(docId);
    } else {
      exitRef = db.collection("users").doc(user.uid).collection("exits").doc();
    }

    const firebaseObject = {
      ...values,
      id: exitRef.id,
    };
    try {
      // If File Begin Upload

      if (values.photoUrl.uri !== undefined) {
        const file = values.photoUrl.uri;
        const response = await fetch(file);
        const blob = await response.blob();
        const extension = uuid();
        const storageRef = storage.ref(`users/${user.uid}/photo_${extension}`);
        const task = storageRef.put(blob);
        task.on(UPLOAD_STATE_CHANGED, () => {
          task
            .then(() => storageRef.getDownloadURL())
            .then(async (downloadURL) => {
              firebaseObject.photoUrl = downloadURL;
              await exitRef.set(firebaseObject, { merge: true });
            });
        });
      } else {
        firebaseObject.photoUrl = values.photoUrl;
        await exitRef.set(firebaseObject, { merge: true });
      }
      dispatch(slice.actions.getExitAddSuccess());
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
