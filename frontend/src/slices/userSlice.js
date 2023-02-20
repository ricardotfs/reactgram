import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import userService from '../services/userService'

const initialState ={
    user:{},
    error:false,
    loading:false,
    message:null,
}

//Get user details
export const profile  = createAsyncThunk('user/profile',
    async(user,thunkAPI) =>{

        const token = thunkAPI.getState().auth.user.token

        const data = await userService.profile(user,token)

        return data
    }
)

//Update user profile
export const updateProfile  = createAsyncThunk('user/update',
    async(user,thunkAPI) =>{

        console.log(user);
        
        const token = thunkAPI.getState().auth.user.token

        const data = await userService.updateProfile(user,token)

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errrs[0])
        }
        return data
    }
)

//Get users details
export const getUsersDetails = createAsyncThunk('user/get',
    async(id,thunkAPI) =>{
        const data = await userService.getUsersDetails(id)

        return data;
    }
)

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        resetMessage:(state) =>{
            state.message = null;
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(profile.pending,(state)=> {
            state.loading  = true;
            state.error = false;
            state.success = false;
            state.user = null;
        }).addCase(profile.fulfilled,(state,action)=> {
            state.loading  = false;
            state.error = null;
            state.success = true;
            state.user = action.payload;
        }).addCase(updateProfile.pending,(state)=> {
            state.loading  = true;
            state.error = false;
        }).addCase(updateProfile.fulfilled,(state,action)=> {
            state.loading  = false;
            state.error = null;
            state.success = true;
            state.user = action.payload;
            state.message = 'Usuário atualizado com sucesso!'
        }).addCase(updateProfile.rejected,(state,action)=> {
            state.loading  = false;
            state.error = action.payload;
            state.user = {};
        }).addCase(getUsersDetails.pending,(state)=> {
            state.loading  = true;
            state.error = false;
        }).addCase(getUsersDetails.fulfilled,(state,action)=> {
            state.loading  = false;
            state.error = null;
            state.success = true;
            state.user = action.payload;
        })
    }
});

export const {resetMessage} = userSlice.actions;
export default userSlice.reducer;