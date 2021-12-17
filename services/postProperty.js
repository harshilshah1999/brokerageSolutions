import { db } from '../plugins/firebase'
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    setDoc,
} from 'firebase/firestore'

export default {
    async getHomepageData() {
        const results = []
        const response = await getDocs(collection(db, 'cities')).catch((err) => { console.error(err); })
        response.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() })
        })
        return results
    },

    async postPropertData(formData) {
        const collection_name = collection(db, 'appartments' /*formData.property_type*/)

        await setDoc(
            doc(collection_name /*, use second parameter for manual id name */),
            formData
        ).catch((err) => { console.error(err); })
        return "Property posted successfully" //this works
    }
}