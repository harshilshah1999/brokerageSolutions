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
    increment,
    collectionGroup, //collection group queries
    orderBy,
    limit,
    serverTimestamp,
    enableIndexedDbPersistence //for offline data and caching
} from 'firebase/firestore'
import { ref, deleteObject, uploadBytesResumable, getDownloadURL, uploadBytes } from 'firebase/storage'

export default {

    async addDocumentAutoID(collectionID, data) { // adds a document in the collection
        const collectionLocation = collection(db, collectionID)
        try {
            return await addDoc(collectionLocation, data) //(parameter) response: DocumentReference<any>
        } catch (error) { console.error(error); return error }
    },
    async addDocumentAutoID2D(collectionID1, documentID, collectionID2, data) { // adds a document in the collection
        const collectionLocation = collection(db, collectionID1, documentID, collectionID2)
        try {
            let response = await addDoc(collectionLocation, data) //(parameter) response: DocumentReference<any>
            return response

        } catch (error) { console.error(error); return error }
    },
    async addDocumentAutoID3D(collectionID1, documentID1, collectionID2, documentID2, collectionID3, data) { // adds a document in the collection
        const collectionLocation = collection(db, collectionID1, documentID1, collectionID2, documentID2, collectionID3)
        try {
            let response = await addDoc(collectionLocation, data) //(parameter) response: DocumentReference<any>
            return response

        } catch (error) { console.error(error); return error }
    },
    async addDocumentAutoID4D(collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, data) { // adds a document in the collection
        const collectionLocation = collection(db, collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4)
        try {
            let response = await addDoc(collectionLocation, data) //(parameter) response: DocumentReference<any>
            return response

        } catch (error) { console.error(error); return error }
    },
    async addDocumentAutoID5D(collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, documentID4, collectionID5, data) { // adds a document in the collection
        const collectionLocation = collection(db, collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, documentID4, collectionID5)
        try {
            let response = await addDoc(collectionLocation, data) //(parameter) response: DocumentReference<any>
            return response
        } catch (error) { console.error(error); return error }
    },

    async addDocumentManualID(collectionID, custom_documentID, data) { // adds a document with ID in the collection
        const documentLocation = doc(db, collectionID, custom_documentID)
        try {
            await setDoc(documentLocation, data)
            return "Document Added Successfully With Manual ID"
        } catch (error) { console.error(error); return error }
    },
    async addDocumentManualID2D(collectionID1, documentID1, collectionID2, custom_documentID, data) { // adds a document with ID in the collection
        const documentLocation = doc(db, collectionID1, documentID1, collectionID2, custom_documentID)
        try {
            await setDoc(documentLocation, data)
            return "Document Added Successfully With Manual ID"
        } catch (error) { console.error(error); return error }
    },
    async addDocumentManualID3D(collectionID1, documentID1, collectionID2, documentID2, collectionID3, custom_documentID, data) { // adds a document with ID in the collection
        const documentLocation = doc(db, collectionID1, documentID1, collectionID2, documentID2, collectionID3, custom_documentID)
        try {
            await setDoc(documentLocation, data)
            return "Document Added Successfully With Manual ID"
        } catch (error) { console.error(error); return error }
    },
    async addDocumentManualID4D(collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, custom_documentID, data) { // adds a document with ID in the collection
        const documentLocation = doc(db, collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, custom_documentID)
        try {
            await setDoc(documentLocation, data)
            return "Document Added Successfully With Manual ID"
        } catch (error) { console.error(error); return error }
    },
    async addDocumentManualID5D(collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, documentID4, collectionID5, custom_documentID, data) { // adds a document with ID in the collection
        const documentLocation = doc(db, collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, documentID4, collectionID5, custom_documentID)
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
    async getSingleDocumentByID2D(collectionID1, documentID1, collectionID2, documentID2) { //get any single document from the collection
        const documentLocation = doc(db, collectionID1, documentID1, collectionID2, documentID2);
        try {
            return await getDoc(documentLocation) //(parameter) response: DocumentSnapshot<DocumentData>
        } catch (error) { console.error(error); return error }
    },
    async getSingleDocumentByID3D(collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3) { //get any single document from the collection
        const documentLocation = doc(db, collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3);
        try {
            return await getDoc(documentLocation) //(parameter) response: DocumentSnapshot<DocumentData>
        } catch (error) { console.error(error); return error }
    },
    async getSingleDocumentByID4D(collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, documentID4) { //get any single document from the collection
        const documentLocation = doc(db, collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, documentID4);
        try {
            return await getDoc(documentLocation) //(parameter) response: DocumentSnapshot<DocumentData>
        } catch (error) { console.error(error); return error }
    },
    async getSingleDocumentByID5D(collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, documentID4, collectionID5, documentID5) { //get any single document from the collection
        const documentLocation = doc(db, collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, documentID4, collectionID5, documentID5);
        try {
            return await getDoc(documentLocation) //(parameter) response: DocumentSnapshot<DocumentData>
        } catch (error) { console.error(error); return error }
    },

    async updateSingleDocument(collectionID, documentID, newdata) { //update any document in a collection
        const documentLocation = doc(db, collectionID, documentID);
        try {
            await setDoc(documentLocation, newdata, { merge: true })  //(parameter) response: void
            return "Document Updated Successfully"
        } catch (error) { console.error(error); return error }
    },
    async updateSingleDocument2D(collectionID1, documentID1, collectionID2, documentID2, newdata) { //update any document in a collection
        const documentLocation = doc(db, collectionID1, documentID1, collectionID2, documentID2);
        try {
            await setDoc(documentLocation, newdata, { merge: true })  //(parameter) response: void
            return "Document Updated Successfully"
        } catch (error) { console.error(error); return error }
    },
    async updateSingleDocument3D(collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, newdata) { //update any document in a collection
        const documentLocation = doc(db, collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3);
        try {
            await setDoc(documentLocation, newdata, { merge: true })  //(parameter) response: void
            return "Document Updated Successfully"
        } catch (error) { console.error(error); return error }
    },
    async updateSingleDocument4D(collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, documentID4, newdata) { //update any document in a collection
        const documentLocation = doc(db, collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, documentID4);
        try {
            await setDoc(documentLocation, newdata, { merge: true })  //(parameter) response: void
            return "Document Updated Successfully"
        } catch (error) { console.error(error); return error }
    },
    async updateSingleDocument5D(collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, documentID4, collectionID5, documentID5, newdata) { //update any document in a collection
        const documentLocation = doc(db, collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, documentID4, collectionID5, documentID5);
        try {
            await setDoc(documentLocation, newdata, { merge: true })  //(parameter) response: void
            return "Document Updated Successfully"
        } catch (error) { console.error(error); return error }
    },

    async incrementElement(collectionID, documentID, key, incrementBy) {
        const documentLocation = doc(db, collectionID, documentID);
        try {
            await updateDoc(documentLocation, { [key]: increment(incrementBy) }) //(parameter) response: void
            return "Item Added Successfully"
        } catch (error) { console.error(error); return error }
    },

    async updateTimestamp(collectionID, documentID, key) { //update any document in a collection
        const documentLocation = doc(db, collectionID, documentID);
        try {
            await updateDoc(documentLocation, { [key]: serverTimestamp() }); //(parameter) response: void
            return "Timestamp Updated Successfully"
        } catch (error) { console.error(error); return error }
    },

    async addArrayElement(collectionID, documentID, key, value) {
        const documentLocation = doc(db, collectionID, documentID);
        try {
            await updateDoc(documentLocation, { [key]: arrayUnion(value) }) //(parameter) response: void
            return "Item Added Successfully"
        } catch (error) { console.error(error); return error }
    },
    async addArrayElement4D(collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, documentID4, key, value) {
        const documentLocation = doc(db, collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, documentID4);
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
    async deleteSingleDocument2D(collectionID1, documentID1, collectionID2, documentID2) { //deletes a specific document from the collection
        const documentLocation = doc(db, collectionID1, documentID1, collectionID2, documentID2);
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
    async getAllDocuments2D(collectionID1, documentID1, collectionID2, doc_limit) { //reads all the documents in a collection

        const collectionLocation = collection(db, collectionID1, documentID1, collectionID2)
        try {
            return await getDocs(query(collectionLocation, limit(doc_limit || Infinity)))//(parameter) response: DocumentReference<any>
        } catch (error) { console.error(error); return error }
    },
    async getAllDocuments3D(collectionID1, documentID1, collectionID2, documentID2, collectionID3) { //reads all the documents in a collection
        const collectionLocation = collection(db, collectionID1, documentID1, collectionID2, documentID2, collectionID3)
        try {
            return await getDocs(collectionLocation)//(parameter) response: DocumentReference<any>
        } catch (error) { console.error(error); return error }
    },
    async getAllDocuments4D(collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4) { //reads all the documents in a collection
        const collectionLocation = collection(db, collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4)
        try {
            return await getDocs(collectionLocation)//(parameter) response: DocumentReference<any>
        } catch (error) { console.error(error); return error }
    },
    async getAllDocuments5D(collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, documentID4, collectionID5) { //reads all the documents in a collection
        const collectionLocation = collection(db, collectionID1, documentID1, collectionID2, documentID2, collectionID3, documentID3, collectionID4, documentID4, collectionID5)
        try {
            return await getDocs(collectionLocation)//(parameter) response: DocumentReference<any>
        } catch (error) { console.error(error); return error }
    },

    /*
    For searching records starting with name queryText
    collectionRef.where('name', '>=', queryText).where('name', '<=', queryText+ '\uf8ff').
    Because it is after most regular characters in Unicode, the query matches all values that start with queryText.
    */

    async getSingleMedia(media_path) { // get url for a single media file
        const downloadLocation = ref(storage, media_path);
        try {
            return await getDownloadURL(downloadLocation) //(parameter) url: string
        } catch (error) { console.error(error); return error }
    },

    setSingleMedia(media_path, file, progress, load, abort, error, collectionID, apartmentID, vueRef, vuePondRef) { // add single media to storage
        const uploadLocation = ref(storage, media_path);
        progress(true, 0, 1024)
        try {
            // return await uploadBytes(uploadLocation, file) //(parameter) snapshot: UploadResult
            const uploadTask = uploadBytesResumable(uploadLocation, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    progress(true, snapshot.bytesTransferred, snapshot.totalBytes);
                },
                (e) => {
                    // Handle unsuccessful uploads
                    error(e.message)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        load(downloadURL);
                        const response = await this.addDocumentAutoID2D(collectionID, apartmentID, 'media', {
                            downloadURL,
                            thumbnail: false,
                            media_type: '',
                            name: file.name
                        })
                        vueRef.push({
                            media_type: '',
                            thumbnail: vueRef.length ? false : true,
                            id: response.id,
                            downloadURL
                        })
                        vuePondRef.push({
                            source: downloadURL,
                            options: {
                              type: "limbo",
                            },
                        });
                    });
                }
            );
            return uploadTask;
        } catch (error) { console.error(error); return error }
    },

    async deleteSingleMedia(media_path, error) { // add single media to storage
        const deleteLocation = ref(storage, media_path);
        try {
            return await deleteObject(deleteLocation)
        } catch (e) {
            error(e.message)
        }
    },

    async singleEqualsQuery(collectionID, parameter1, parameter2) {
        const q = query(collection(db, collectionID),
            where(parameter1, "==", parameter2));
        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data());
        // });
        return await getDocs(q)
    },

    async startWithQuery(collectionID, parameter1, parameter2, parameter3, parameter4) { //returns all results that start with parameter2
        const q = query(collection(db, collectionID),
            where(parameter1, ">=", parameter2),
            where(parameter1, "<=", parameter2 + '~'),
            where(parameter3, "==", parameter4),
        );
        return await getDocs(q)
    },

    async doubleEqualsQuery(collectionID, parameter1, parameter2, parameter3, parameter4) {
        const q1 = query(collection(db, collectionID),
            where(parameter1, "==", parameter2),
            where(parameter3, "==", parameter4))
        return await getDocs(q1)
    },

    async doubleEqualsQuery2D(collectionID1, documentID1, collectionID2, parameter1, parameter2, parameter3, parameter4) {
        const q1 = query(collection(db, collectionID1, documentID1, collectionID2),
            where(parameter1, "==", parameter2),
            where(parameter3, "==", parameter4))
        return await getDocs(q1)
    },

    async fourEqualsQuery(collectionID, parameter1, parameter2, parameter3, parameter4, parameter5, parameter6, parameter7, parameter8) {
        const q1 = query(collection(db, collectionID),
            where(parameter1, "==", parameter2),
            where(parameter3, "==", parameter4),
            where(parameter5, "==", parameter6),
            where(parameter7, "==", parameter8),
            orderBy("location_details.city"), limit(10))
        return await getDocs(q1)
    }

}