import { db, storage } from '../plugins/firebase'
import {
    doc,
    collection,
    addDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    query,
    where,
} from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'

export default {

    async createProperty(collectionID, data) { // adds a document in the collection
        const collectionLocation = collection(db, collectionID)
        return await addDoc(collectionLocation, data)
            .then((response) => { return response })
            .catch((err) => { console.error(err); })
    },
    async getProperty(collectionID, documentID) { //get any single document from the collection
        const documentLocation = doc(db, collectionID, documentID);
        return await getDoc(documentLocation)
            .then((response) => { return response })
            .catch((err) => { console.error(err); });
    },
    async updateProperty(collectionID, documentID, newdata) { //update any document in a collection
        const documentLocation = doc(db, collectionID, documentID);
        return await updateDoc(documentLocation, newdata)
            .then((response) => { return response })
            .catch((err) => { console.error(err); });
    },
    async deleteProperty(collectionID, documentID) { //deletes a specific document from the collection
        const documentLocation = doc(db, collectionID, documentID);
        return await deleteDoc(documentLocation)
            .then((response) => { return response })
            .catch((err) => { console.error(err); })
    },
    async readallProperty(collectionID) { //reads all the documents in a collection
        const collectionLocation = collection(db, collectionID)
        return await getDocs(collectionLocation)
            .then((response) => { return response })
            .catch((err) => { console.error(err); })
    },
    async getMedia(media_path) {
        const downloadLocation = ref(storage, media_path);
        return await getDownloadURL(downloadLocation)
            .then((url) => { return url })
            .catch((error) => { console.log(error) })
    },
    async setMedia(media_path, file) {
        const uploadLocation = ref(storage, media_path);
        return await uploadBytes(uploadLocation, file).then((snapshot) => {
            return snapshot;
        });
    }
}