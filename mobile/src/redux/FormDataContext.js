import React, { createContext, useContext, useEffect, useReducer } from 'react';
const FormDataContext = createContext();
import * as Location from 'expo-location';
import axios from 'axios';

const FormDataProvider = ({ children }) => {
  const initialState = {
    problemsFormData: [],
    markedPoints: [],
    projectId: '',
    userId: '',
    updateDate: new Date(),
    materialsFormData: [],
    weatherInformation: [],
  };


  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_FORM':
        return { ...state, problemsFormData: { ...state.problemsFormData, [action.field]: action.value } };
      case 'UPDATE_MARKED_POINTS':
        return { ...state, markedPoints: [...state.markedPoints, action.point]}
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const weatherAPI = "30850ce0829e6915c1330748984e0878";

  const fetchWeatherDetails = async (lat, lon) => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPI}&units=metric`);
      const aqiResponse = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPI}`);
      state.weatherInformation = response.data.list[0].main;
      state.weatherInformation.aqi = aqiResponse.data.list[0].main.aqi;
      console.log(state.weatherInformation);
    } catch (error) {
      console.error('Error fetching weather details:', error);
    }
  };

  useEffect(() => {
    (async() => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError("Permission to access location was denied!!");
          return;
        }
      let location = await Location.getCurrentPositionAsync({});
      const deviceLat = location.coords.latitude;
      const deviceLon = location.coords.longitude;
      await fetchWeatherDetails(deviceLat, deviceLon);
    })()
  }, []);

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
