/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import { useState, useEffect } from "react";

export const AdminContext = createContext();

// Define reducer function
const adminReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ADMIN":
      return [action.payload];
    case "UPDATE_ADMIN":
      return [
        state[0].map((admin) =>
          admin._id === action.payload._id
            ? { ...admin, ...action.payload.data }
            : admin
        ),
      ];
    case "DELETE_ADMIN":
      console.log(state, action.payload);
      return [state[0].filter((admin) => admin._id !== action.payload)];
    default:
      return state;
  }
};

export const AdminProvider = ({ children }) => {
  const [admin, dispatch] = useReducer(adminReducer, []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URI}/admin`);
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: "ADD_ADMIN", payload: data });
        } else {
          throw new Error("Failed to fetch admin data");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addAdmin = (adminData) => {
    dispatch({ type: "ADD_ADMIN", payload: adminData });
  };

  const updateAdmin = (adminId, adminData) => {
    dispatch({
      type: "UPDATE_ADMIN",
      payload: { id: adminId, data: adminData },
    });
  };

  const deleteAdmin = (adminId) => {
    dispatch({ type: "DELETE_ADMIN", payload: adminId });
  };

  return (
    <AdminContext.Provider
      value={{ admin, loading, addAdmin, updateAdmin, deleteAdmin }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
