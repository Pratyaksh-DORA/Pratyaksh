// FormDataContext.js
import React, { createContext, useContext, useState, useReducer } from 'react';

const FormDataContext = createContext();

// const formReducer = (state, action) => {
//   switch (action.type) {
//     case 'UPDATE_FORM':
//       return { ...state, [action.field]: action.value };
//     default:
//       return state;
//   }
// };

const FormDataProvider = ({ children }) => {
  const initialState = {
    problemsFormData: [],
    markedPoints: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_FORM':
        return { ...state, problemsFormData: { ...state.problemsFormData, [action.field]: action.value } };
      case 'UPDATE_MARKED_POINTS':
        return { ...state, markedPoints: [...state.markedPoints, action.point]}
      // case 'ADD_MARKED_POINT':
      //   return { ...state, markedPoints: [...state.markedPoints, action.point] };
      // case 'REMOVE_MARKED_POINT':
      //   return { ...state, markedPoints: state.markedPoints.filter(point => point.pointId !== action.pointId) };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FormDataContext.Provider value={{ state, dispatch }}>
      {children}
    </FormDataContext.Provider>
  );
};

const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};

export { FormDataProvider, useFormData };
