import firebaseServices from './firebaseServices'
export default {

    async getUser(userID) {
        return await firebaseServices.getSingleDocumentByID('users', userID).catch((err) => { console.error(err); })
    },
    async addProperty(collectionID, formData) {
        let property = await firebaseServices.addDocumentAutoID(collectionID, formData).catch((err) => { console.error(err); })
        firebaseServices.addArrayElement('users', formData.posted_by_user_id, 'properties_posted', property.id)
        return property
    },
}