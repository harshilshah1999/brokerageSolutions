import firebaseServices from './firebaseServices'
export default {
    async AddUser(userID, formData) {
        return await firebaseServices.addDocumentManualID('users', userID, formData).id
    },
    async updateUser(userID, formData) {
        formData = {
            user_name: '',
            alternate_mobile_number: '',
            user_email: '',
            user_alternate_email: '',
            date_joined: 'timestamp',
        }
        return await firebaseServices.updateSingleDocument('users', userID, formData)
    }
}