import { db, storage } from '../plugins/firebase'
import {
    doc,
    collection,
    addDoc,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    arrayUnion,
    arrayRemove,
    query,
    where,
} from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'

export default {

    async addDocumentAutoID(collectionID, data) { // adds a document in the collection
        const collectionLocation = collection(db, collectionID)
        try {
            return await addDoc(collectionLocation, data) //(parameter) response: DocumentReference<any>
        } catch (error) { console.error(error); return error }
    },

    async addDocumentManualID(collectionID, custom_documentID, data) { // adds a document with ID in the collection
        const documentLocation = doc(db, collectionID, custom_documentID)
        try {
            await setDoc(documentLocation, data)
            return "Document Added Successfully With Manual ID"
        } catch (error) { console.error(error); return error }
    },

    async getSingleDocumentByID(collectionID, documentID) { //get any single document from the collection
        const documentLocation = doc(db, collectionID, documentID);
        try {
            return await getDoc(documentLocation) //(parameter) response: DocumentSnapshot<DocumentData>
        } catch (error) { console.error(error); return error }
    },

    async updateSingleDocument(collectionID, documentID, newdata) { //update any document in a collection
        const documentLocation = doc(db, collectionID, documentID);
        try {
            await updateDoc(documentLocation, newdata)  //(parameter) response: void
            return "Document Updated Successfully"
        } catch (error) { console.error(error); return error }
    },

    async addArrayElement(collectionID, documentID, key, value) {
        const documentLocation = doc(db, collectionID, documentID);
        try {
            await updateDoc(documentLocation, { [key]: arrayUnion(value) }) //(parameter) response: void
            return "Item Added Successfully"
        } catch (error) { console.error(error); return error }
    },

    async removeArrayElement(collectionID, documentID, key, value) {
        const documentLocation = doc(db, collectionID, documentID);
        try {
            await updateDoc(documentLocation, { [key]: arrayRemove(value) }) //(parameter) response: void
            return "Item Removed Successfully"
        } catch (error) { console.error(error); return error }
    },

    async deleteSingleDocument(collectionID, documentID) { //deletes a specific document from the collection
        const documentLocation = doc(db, collectionID, documentID);
        try {
            await deleteDoc(documentLocation) //(parameter) response: void
            return "Document Deleted Successfully"
        } catch (error) { console.error(error); return error }
    },

    async getAllDocuments(collectionID) { //reads all the documents in a collection
        const collectionLocation = collection(db, collectionID)
        try {
            return await getDocs(collectionLocation)//(parameter) response: DocumentReference<any>
        } catch (error) { console.error(error); return error }
    },

    async getSingleMedia(media_path) { // get url for a single media file
        const downloadLocation = ref(storage, media_path);
        try {
            return await getDownloadURL(downloadLocation) //(parameter) url: string
        } catch (error) { console.error(error); return error }
    },

    async setSingleMedia(media_path, file) { // add single media to storage
        const uploadLocation = ref(storage, media_path);
        try {
            return await uploadBytes(uploadLocation, file) //(parameter) snapshot: UploadResult
        } catch (error) { console.error(error); return error }
    }
}