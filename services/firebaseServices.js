import { db, storage } from '../plugins/firebase'
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    setDoc,
} from 'firebase/firestore'
import { ref, getDownloadURL } from 'firebase/storage'

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
    },

    async getMedia(image_path) {

        const url = getDownloadURL(ref(storage, image_path))
            .then((url) => {
                // This can be downloaded directly:
                const xhr = new XMLHttpRequest()
                xhr.responseType = 'blob'
                xhr.onload = (event) => {
                    const blob = xhr.response
                }
                xhr.open('GET', url)
                xhr.send()
                return url

            })
            .catch((error) => {
                console.log(error)
            })
        return url
    }
}