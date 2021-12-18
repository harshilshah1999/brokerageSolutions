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
import { ref, getDownloadURL } from 'firebase/storage'

export default {

    async createProperty(collectionID, data) { // adds a document in the collection
        const collection_name = collection(db, collectionID)
        return await addDoc(collection_name, data)
            .then((response) => {
                console.log("Document written with ID: ", response.id)
                return response
            })
            .catch((err) => { console.error(err); });
    },
    async getProperty(collectionID, documentID) { //get any single document from the collection
        const document = doc(db, collectionID, documentID);
        await getDoc(document);
    },
    async updateProperty(collectionID, documentID, newdata) { //update any document in a collection
        const document = doc(db, collectionID, documentID);
        await updateDoc(document, newdata);
    },
    async deleteProperty(collectionID, documentID) { //deletes a specific document
        const document = doc(db, collectionID, documentID);
        await deleteDoc(document);
    },
    async readallProperty(collectionID) { //reads all the documents in a collection
        const results = []
        const all_documents = await getDocs(collection(db, collectionID)).catch((err) => { console.error(err); })
        all_documents.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() })
        })
        return results
    },
    async getMedia(media_path) {

        const url = getDownloadURL(ref(storage, media_path))
            .then((url) => {
                // This can be downloaded directly:
                const xhr = new XMLHttpRequest()
                xhr.responseType = 'blob'
                xhr.onload = (event) => {
                    const blob = xhr.response
                }
                xhr.open('GET', url)
                xhr.send()
                return url

            })
            .catch((error) => {
                console.log(error)
            })
        return url
    }
}