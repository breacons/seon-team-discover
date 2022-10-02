import { FirebaseReducer, firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import {Thermometer} from "@/interfaces/heater";

// Optional: If you use the user profile option
export interface Profile {}

// Optional: You can define the schema of your Firebase Redux store.
// This will give you type-checking for state.firebase.data.todos and state.firebase.ordered.todos
interface Schema {
  sensors:  Record<string, Thermometer>
}

// with both reducer types
export interface RootState {
  firebase: FirebaseReducer.Reducer<Profile, Schema>;
}

// with only Profile type
// interface RootState {
//   firebase: FirebaseReducer.Reducer<Profile>;
// }

// with only Schema type
// interface RootState {
//   firebase: FirebaseReducer.Reducer<{}, Schema>;
// }

// without reducer types
// interface RootState {
//   firebase: FirebaseReducer.Reducer;
// }

export const rootReducer = combineReducers<RootState>({
  firebase: firebaseReducer,
});
