import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../fireBase/config"
import { addNewEmptyNote, setActiveNote, savingNewNotes, setNotes, setSaving, updateNote, setPhotosActiveNote, deleteNoteById } from "./journalSlice"
import { fileUpolad, loadNotes } from "../../helpers";



export const startNewNote = () => {


    return async (dispatch, getState)=>{
        dispatch(savingNewNotes())
    
      const {uid} =  getState().auth
        const newNote ={
            title:'',
            body:'',
            date: new Date().getTime(),
        }
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
       const resp = await setDoc(newDoc, newNote);
         
       newNote.id = newDoc.id;

        dispatch (addNewEmptyNote(newNote));
        dispatch (setActiveNote(newNote));
    }
};

export const startLoadingNote = () => {
    return async (dispatch, getState) => {
        const {uid} =  getState().auth
        if(!uid) throw new Error('El UID del usuario no existe')

       const notes= await loadNotes(uid);

        dispatch(setNotes(notes));
    }
};

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;
    
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await setDoc( docRef, noteToFireStore, { merge: true });
        console.log(docRef)
        dispatch( updateNote( note ) )
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );
            
        const fileUploadPromises = [];
        for ( const file of files ) {
            fileUploadPromises.push( fileUpolad( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch (setPhotosActiveNote(photosUrls));
    }
}

export const startDeletingNote = () =>{
    return async ( dispatch, getState) => {
        const{uid} = getState().auth
        const{active: note} = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

         await deleteDoc(docRef)

        dispatch(deleteNoteById(note.id))
    }
}