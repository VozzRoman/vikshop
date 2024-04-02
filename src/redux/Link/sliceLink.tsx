import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
	root: string,

}

const initialState: ProductState = {
	root: '',
}

export const rootSlice = createSlice ({
	name:"root",
	initialState,
	reducers:{
		getLinkRoot(state, action: PayloadAction<string>) {
			state.root = action.payload;	
	},
}})

export const {getLinkRoot} = rootSlice.actions;
export default rootSlice.reducer