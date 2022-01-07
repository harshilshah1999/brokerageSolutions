import firebaseServices from './firebaseServices'

export default {
    async changeLocalityVerificationStatus(documentID, newdata) {
        try {
            //update locality verification status
            await firebaseServices.updateSingleDocument('localities', documentID, { "verified": true })
            //add locality to cities
            await firebaseServices.addArrayElement('cities', newdata['location_details']['city'], 'localities', locality['id']) //update cities array
            //remove locality from pending
            await firebaseServices.deleteSingleDocument('pending_locality_verification', documentID)
        } catch (error) { console.error(error); return error }
    },

    async changeSubLocalityVerificationStatus(documentID, newdata) {
        try {
            //update sub_locality verification status
            await firebaseServices.updateSingleDocument('sub_localities', documentID, { "verified": true })
            //add sub_locality to localities
            await firebaseServices.addArrayElement('localities', newdata['location_details']['locality'], 'sub_localities', sub_locality['id']) //update cities array
            //remove sub_locality from pending
            await firebaseServices.deleteSingleDocument('pending_sublocality_verification', documentID)
        } catch (error) { console.error(error); return error }
    },

    async getUnverifiedLocalities() {
        try {
            return await firebaseServices.getAllDocuments('pending_localities_verification')
        } catch (error) { console.error(error); return error }
    },

    async getUnverifiedSublocalities() {
        try {
            return await firebaseServices.getAllDocuments('pending_sublocalities_verification')
        } catch (error) { console.error(error); return error }
    },
}