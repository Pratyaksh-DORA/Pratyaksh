import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name: "",
    description: "",
    location: {
        type: "",
        coordinates: []
    },
    StartDate: null,
    endDate: null,
    milestones: []
}

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        addProject: (state, action) => {
            state.name = action.payload.name;
        }

    }
})

