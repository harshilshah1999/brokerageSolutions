import firebaseServices from './firebaseServices'
export default {
    async AddUser(userID, formData) {
        return await firebaseServices.addDocumentManualID('users', userID, formData).catch((err) => { console.error(err); })
    },
    async updateUser(userID, formData) {
        await firebaseServices.updateSingleDocument('users', userID, formData).catch((err) => { console.error(err); })
        await firebaseServices.updateTimestamp('users', userID, 'created_at').catch((err) => { console.error(err); })
    }
}