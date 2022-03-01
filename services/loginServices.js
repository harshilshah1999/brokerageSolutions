import firebaseServices from './firebaseServices'
export default {
    async updateUser(userID, formData) {
        let doc = await firebaseServices.getSingleDocumentByID('users', userID)
        if (!doc.exists) {    // No such document exists!
            this.addTimestamp(userID, "created_at")
            formData['blacklisted'] = false
            return await firebaseServices.addDocumentManualID('users', userID, formData).catch((err) => { console.error(err); })
        } else {
            this.addTimestamp(userID, "last_updated_at")
            return await firebaseServices.updateSingleDocument('users', userID, formData).catch((err) => { console.error(err); })
        }
    },
    async addTimestamp(userID, key) {
        return await firebaseServices.updateTimestamp('users', userID, key).catch((err) => { console.error(err); })
    }
}