import firebaseServices from './firebaseServices'
export default {
    async updateUser(userID, formData) {
        let doc = await firebaseServices.getSingleDocumentByID('users', userID)

        if (!doc.exists) {    // No such document exists!
            addTimestamp(userID, "created_at")
            formData['blacklisted'] = false
            return await firebaseServices.addDocumentManualID('users', userID, formData).catch((err) => { console.error(err); })
        } else {
            addTimestamp(userID, "last_updated_at")
            return await firebaseServices.updateSingleDocument('users', userID, formData).catch((err) => { console.error(err); })
        }

        async function addTimestamp(userID, key) {
            return await firebaseServices.updateTimestamp('users', userID, key).catch((err) => { console.error(err); })
        }
    },
}