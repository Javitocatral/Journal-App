import { Savings } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';
import { loadNotes } from '../../helpers';


export const journalSlice = createSlice({
  name: 'journal',
  initialState:{
  isSaving: false,
  messageSaved:'',
  notes:[],
  active:null
//   active:{
//     id:123,
//     title: '',
//     body:'',
//     date:123456,
//     imageUrls:[]
//   }

  },
  reducers: {

    savingNewNotes:(state)=> {
      state.isSaving = true
    },

   addNewEmptyNote:(state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
   },
   setActiveNote:(state, action)=>{
      state.active= action.payload;
      state.messageSaved = '';

   },
   setNotes:(state, action) => {
    state.notes =action.payload

   },
   setSaving:( state ) =>{
    state.isSaving =true;
    state.messageSaved = '';
   },
   updateNote: (state, action) =>{
    state.isSaving= false;
    state.notes=state.notes.map( note => {

      if ( note.id === action.payload.id ) {
          return action.payload;
      }

      return note;
  });
    state.messageSaved= `${action.payload.title}, actualizada correctamente`
   }, 

   setPhotosActiveNote:(state, action) => {
      state.active.imageURL = [...state.active.imageURL, ...action.payload];
      state.isSaving = false;
   },
   clearNoteLogout:(state) =>{
    state.isSaving= false;
    state.messageSaved = '';
    state.notes = [];
    state.active = null

   },
   deleteNoteById:(state, action) =>{
    state.notes = state.notes.filter(note => note.id !== action.payload)
    state.active= null
   }
  }
})
// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote,setNotes, setSaving, updateNote, deleteNoteById, savingNewNotes, setPhotosActiveNote,clearNoteLogout } = journalSlice.actions