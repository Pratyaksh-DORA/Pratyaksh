import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    project: {
        id: "",
        name: "",
        description: "",
        location: {
            type: "",
            coordinates: []
        },
        startDate: null,
        endDate: null,
        milestones: []
    }
}

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        addProject: (state, action) => {
            state.project.name = action.payload.name;
            console.log(state)
        },
        editProject: (state, action) => {
            state.project = action.payload.project
        },

    }
})

export const { addProject, editProject } = projectSlice.actions;
export const selectAuth = (state) => state.project;

export default projectSlice.reducer;
