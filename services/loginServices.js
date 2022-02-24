import firebaseServices from './firebaseServices'
export default {
    async signup(formData) {
        console.log("called")
        formData = {
            user_name: '',
            mobile_number: '',
            alternate_mobile_number: '',
            user_email: '',
            user_alternate_email: '',
            date_joined: 'timestamp',
        }
        return await firebaseServices.addDocumentAutoID('users', formData)
    }
}