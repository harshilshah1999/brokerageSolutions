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
        return await addDoc(collectionLocation, data)
            .then((response) => { return response })
            .catch((err) => { console.error(err); })
    },
    async addDocumentManualID(collectionID, custom_documentID, data) { // adds a document with ID in the collection
        const documentLocation = doc(db, collectionID, custom_documentID)
        return await setDoc(documentLocation, data)
            .then((response) => { return response })
            .catch((err) => { console.error(err); })
    },
    async getSingleDocumentByID(collectionID, documentID) { //get any single document from the collection
        const documentLocation = doc(db, collectionID, documentID);
        return await getDoc(documentLocation)
            .then((response) => { return response })
            .catch((err) => { console.error(err); });
    },
    async updateSingleDocument(collectionID, documentID, newdata) { //update any document in a collection
        const documentLocation = doc(db, collectionID, documentID);
        return await updateDoc(documentLocation, newdata)
            .then((response) => { return response })
            .catch((err) => { console.error(err); });
    },
    async addArrayElement(collectionID, documentID, key, value) {
        const washingtonRef = doc(db, collectionID, documentID);
        return await updateDoc(washingtonRef, {
            [key]: arrayUnion(value)
        })
            .then((response) => { return response })
            .catch((err) => { console.error(err); })
    },
    async removeArrayElement(collectionID, documentID, key, value) {
        const washingtonRef = doc(db, collectionID, documentID);
        return await updateDoc(washingtonRef, {
            [key]: arrayRemove(value)
        })
            .then((response) => { return response })
            .catch((err) => { console.error(err); })
    },
    async deleteSingleDocument(collectionID, documentID) { //deletes a specific document from the collection
        const documentLocation = doc(db, collectionID, documentID);
        return await deleteDoc(documentLocation)
            .then((response) => { return response })
            .catch((err) => { console.error(err); })
    },
    async getAllDocuments(collectionID) { //reads all the documents in a collection
        const collectionLocation = collection(db, collectionID)
        return await getDocs(collectionLocation)
            .then((response) => { return response })
            .catch((err) => { console.error(err); })
    },
    async getSingleMedia(media_path) { // get url for a single media file
        const downloadLocation = ref(storage, media_path);
        return await getDownloadURL(downloadLocation)
            .then((url) => { return url })
            .catch((error) => { console.log(error) })
    },
    async setSingleMedia(media_path, file) { // add single media to storage
        const uploadLocation = ref(storage, media_path);
        return await uploadBytes(uploadLocation, file).then((snapshot) => {
            return snapshot;
        });
    }
}