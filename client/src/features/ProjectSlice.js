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
            const { _id, name, description, location, startDate, endDate, milestones } = action.payload;
            state._id = _id;
            state.name = name;
            state.description = description;
            state.location = location;
            state.startDate = startDate;
            state.endDate = endDate;
            state.milestones = milestones;
            localStorage.setItem("project", JSON.stringify(state));
        },
        editProject: (state, action) => {
            const { name, _id, description, location, startDate, endDate, milestones } = action.payload;
            state._id = _id;
            state.name = name;
            state.description = description;
            state.location = location;
            state.startDate = startDate;
            state.endDate = endDate;
            state.milestones = milestones;
            localStorage.setItem("project", JSON.stringify(state));
        },
    },
});

export const { addProject, editProject } = projectSlice.actions;
export const selectProject = (state) => state.project;

export default projectSlice.reducer;
