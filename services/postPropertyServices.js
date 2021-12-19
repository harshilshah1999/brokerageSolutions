import firebaseServices from './firebaseServices'

export default {
    async postConstructionDetails(collectionID, data) {
        return await firebaseServices.addDocumentAutoID(collectionID, data).catch((err) => { console.error(err); })
    },
    async postLocationDetails(collectionID, documentID, newdata) {
        return [
            firebaseServices.updateSingleDocument(collectionID, documentID, newdata) //update property
                .then((res) => { return res })
                .catch((err) => { console.error(err); })
            ,
            firebaseServices.addArrayElement('cities', newdata['location_details']['city'], 'properties', documentID)
                .then((res) => { return res })
                .catch((err) => { console.error(err); })
        ]
    },
    async postPropertyDetails(collectionID, documentID, newdata) {
        return firebaseServices.updateSingleDocument(collectionID, documentID, newdata) //update property
            .then((res) => { return res })
            .catch((err) => { console.error(err); })
    }
}