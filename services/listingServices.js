import firebaseServices from './firebaseServices'
export default {

    async getUser(userID) {
        return await firebaseServices.getSingleDocumentByID('users', userID).catch((err) => { console.error(err); })
    },
    async addProperty(collectionID, formData) {
        let property = await firebaseServices.addDocumentAutoID(collectionID, formData).catch((err) => { console.error(err); })
        firebaseServices.addArrayElement('users', formData.posted_by_user_id, 'properties_posted', collectionID + '-' + property.id).catch((err) => { console.error(err); })
        firebaseServices.updateTimestamp(collectionID, property.id, 'created_date').catch((err) => { console.error(err); })
        return property
    },
    async getProperty(collectionID, documentID) {
        return await firebaseServices.getSingleDocumentByID(collectionID, documentID).catch((err) => { console.error(err); })
    }
}