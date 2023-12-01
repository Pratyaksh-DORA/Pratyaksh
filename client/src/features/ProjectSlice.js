// ProjectSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: null,
    name: '',
    description: '',
    location: {
        type: '',
        coordinates: [],
    },
    startDate: null,
    endDate: null,
    milestones: [],
};

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        addProject: (state, action) => {
            const newState = { ...state, ...action.payload };
            localStorage.setItem("project", JSON.stringify(newState));
            return newState;
        },
        editProject: (state, action) => {
            const newState = { ...state, ...action.payload };
            localStorage.setItem("project", JSON.stringify(newState));
            return newState;
        },
    },
});

export const { addProject, editProject } = projectSlice.actions;
export const selectProject = (state) => state;

export default projectSlice.reducer;
