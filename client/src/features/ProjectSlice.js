// ProjectSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    project: {
        id: '',
        name: '',
        description: '',
        location: {
            type: '',
            coordinates: [],
        },
        startDate: null,
        endDate: null,
        milestones: [],
    },
};

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        addProject: (state, action) => {
            state.project.name = action.payload.name;
        },
        editProject: (state, action) => {
            state.project = action.payload;
        },
        editProjectTask: (state, action) => {
            const { milestoneIndex, tasks } = action.payload;

            // Ensure that milestones array exists before trying to access its index
            if (state.project.milestones && state.project.milestones[milestoneIndex]) {
                state.project.milestones[milestoneIndex].tasks = tasks;
            }
        },
    },
});

export const { addProject, editProject, editProjectTask } = projectSlice.actions;
export const selectProject = (state) => state.project;

export default projectSlice.reducer;