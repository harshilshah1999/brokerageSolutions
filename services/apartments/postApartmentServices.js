import firebaseServices from '../firebaseServices'

export default {

    async postRentalDetails(collectionID, documentID, newdata) {
        try {
            return await firebaseServices.updateSingleDocument(collectionID, documentID, newdata) //update property
        } catch (error) { console.error(error); return error }
    },

    async postConstructionDetails(collectionID, data) {
        try {
            return await firebaseServices.addDocumentAutoID(collectionID, data).catch((err) => { console.error(err); })
        } catch (error) { console.error(error); return error }
    },

    async addNewLocality(newdata, verification_status /* depends on who is posting the property [staff=true,other=false] */) {
        let localityForm = {
            "locality_name": newdata['location_details']['locality'],
            "verified": verification_status,
            "city_id": newdata['location_details']['city'],
            "sub_localities": newdata['location_details']['sub_locality'],
        }

        let sub_localityForm = {
            "sub_locality_name": newdata['location_details']['locality'],
            "verified": verification_status,
            "city_id": newdata['location_details']['city'],
            "locality_id": locality['id'],
        }

        //adding new locality
        let locality = await firebaseServices.addDocumentAutoID('localities', localityForm).catch((err) => { console.error(err); }) //enter new locality
        await firebaseServices.addDocumentManualID('pending_locality_verification', locality['id'], localityForm).catch((err) => { console.error(err); }) //add locality for verification
        if (newdata['location_details']['sub_locality']) { //user might add or not add sublocality for new locality
            //adding new sublocality
            let sub_locality = await firebaseServices.addDocumentAutoID('sub_localities', sub_localityForm).catch((err) => { console.error(err); }) //enter new locality
            await firebaseServices.addDocumentManualID('pending_sublocality_verification', sub_locality['id'], sub_localityForm).catch((err) => { console.error(err); }) //enter new locality
        }
    },
    //when only new sublocality is added, not locality
    async addNewSubLocality(newdata, verification_status /* depends on who is posting the property [staff=true,other=false] */) {
        let sub_localityForm = {
            "sub_locality_name": newdata['location_details']['locality'],
            "verified": verification_status,
            "city_id": newdata['location_details']['city'],
            "locality_id": locality['id'],
        }

        //adding new sublocality
        let sub_locality = await firebaseServices.addDocumentAutoID('sub_localities', sub_localityForm).catch((err) => { console.error(err); }) //enter new locality
        await firebaseServices.addDocumentManualID('pending_sublocality_verification', sub_locality['id'], sub_localityForm).catch((err) => { console.error(err); }) //enter new locality
    },

    async postLocationDetails(collectionID, documentID, newdata) {
        try {
            return [
                await firebaseServices.updateSingleDocument(collectionID, documentID, newdata), //add location details to the property
                await firebaseServices.addArrayElement('cities', newdata['location_details']['city'], collectionID, documentID), //update cities array
                await firebaseServices.addArrayElement('localities', newdata['location_details']['locality'], collectionID, documentID), //update localities array
                await firebaseServices.addArrayElement('sub_localities', newdata['location_details']['sub_locality'], collectionID, documentID), //update sub_localities array
            ]
        } catch (error) { console.error(error); return error }
    },

    async postPropertyDetails(collectionID, documentID, newdata) {
        try {
            return await firebaseServices.updateSingleDocument(collectionID, documentID, newdata) //update property
        } catch (error) { console.error(error); return error }
    },

    async postPricingDetails(collectionID, documentID, newdata) {
        try {
            return await firebaseServices.updateSingleDocument(collectionID, documentID, newdata) //update property
        } catch (error) { console.error(error); return error }
    },

    async postAmenitiesDetails(collectionID, documentID, newdata) {
        try {
            return await firebaseServices.updateSingleDocument(collectionID, documentID, newdata) //update property
        } catch (error) { console.error(error); return error }
    },

    async postMedia(collectionID, documentID, file, metadata, image_path) {
        try {
            return [
                await firebaseServices.setSingleMedia(image_path, file), //update property
                await firebaseServices.addArrayElement(collectionID, documentID, 'media', metadata['media'][0]), //update media array
            ]
        } catch (error) { console.error(error); return error }
    },

    async postVisitPreferenceDetails(collectionID, documentID, newdata) {
        try {
            return await firebaseServices.updateSingleDocument(collectionID, documentID, newdata) //update property
        } catch (error) { console.error(error); return error }
    },

    async postOtherDetails(collectionID, documentID, newdata) {
        try {
            return await firebaseServices.updateSingleDocument(collectionID, documentID, newdata) //update property
        } catch (error) { console.error(error); return error }
    },

    async getCities() {
        try {
            return await firebaseServices.singleEqualsQuery('cities', 'status', 'active')
        } catch (error) { console.error(error); return error }

    },

    async getLocalities(cityID) {
        try {
            return await firebaseServices.doubleEqualsQuery('localities', 'city_id', cityID, 'verified', true)
        } catch (error) { console.error(error); return error }

    },

    async getSublocalities(localityID) {
        try {
            return await firebaseServices.doubleEqualsQuery('sub_localities', 'locality_id', localityID, 'verified', true)
        } catch (error) { console.error(error); return error }
    }
}