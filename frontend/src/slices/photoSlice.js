import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
    photos:[],
    photo:{},
    error:false,
    success:false,
    loading:false,
    message:null
}


//publish user photo

export const publishPhoto = createAsyncThunk('photo/publish',
    async(photo,thunkAPI) =>{

        const token = thunkAPI.getState().auth.user.token

        const data = await photoService.publishPhoto(photo,token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }
        return data;
    }
)

//Get photos users
export const getUsersPhotos = createAsyncThunk('photo/getuser',
    async(id,thunkAPI)=>{

        const token = thunkAPI.getState().auth.user.token

        const data = await photoService.getUsersPhotos(id,token);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;
    }
)

//Delete photo
export const deletePhoto = createAsyncThunk('delete/photo',
    async(id,thunkAPI) =>{

        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.deletePhoto(id,token)

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data;
    }
)

export const photoSlice = createSlice({
    name:'photo',
    initialState,
    reducers:{
        resetMessage: (state) =>{
            state.message = null
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(publishPhoto.pending,(state)=> {
            state.loading  = true;
            state.error = false;
        }).addCase(publishPhoto.fulfilled,(state,action)=> {
            state.loading  = false;
            state.error = null;
            state.success = true;
            state.photo = action.payload;
            state.photos.unshift(state.photo)
            state.message = 'Photo publicada com sucesso!'
        }).addCase(publishPhoto.rejected,(state,action)=> {
            state.loading  = false;
            state.error = action.payload;
            state.photo = {};
        }).addCase(getUsersPhotos.pending,(state)=> {
            state.loading  = true;
            state.error = false;
        }).addCase(getUsersPhotos.fulfilled,(state,action)=> {
            state.loading  = false;
            state.error = null;
            state.success = true;
            state.photos = action.payload;
        }).addCase(deletePhoto.pending,(state)=> {
            state.loading  = true;
            state.error = false;
        }).addCase(deletePhoto.fulfilled,(state,action)=> {
            state.loading  = false;
            state.error = null;
            state.success = true;
            state.photos = state.photos.filter((photo) =>{
                return photo._id !==  action.payload.id;
            });
            state.message = action.payload.message;
            
        }).addCase(deletePhoto.rejected,(state,action)=> {
            state.loading  = false;
            state.error = action.payload;
            state.photo = {};
        })
    }
});

export const {resetMessage} = photoSlice.actions;
export default photoSlice.reducer;