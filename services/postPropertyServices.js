import firebaseServices from './firebaseServices'

export default {
    async postConstructionDetails(collectionID, data) {
        try {
            return await firebaseServices.addDocumentAutoID(collectionID, data).catch((err) => { console.error(err); })
        } catch (error) { console.error(error); }
    },

    async postLocationDetails(collectionID, documentID, newdata) {
        try {
            return [
                await firebaseServices.updateSingleDocument(collectionID, documentID, newdata), //update property
                await firebaseServices.addArrayElement('cities', newdata['location_details']['city'], 'properties', documentID), //update cities array
                await firebaseServices.addArrayElement('localities', newdata['location_details']['locality'], 'properties', documentID), //update localities array
                await firebaseServices.addArrayElement('sub_localities', newdata['location_details']['sub_locality'], 'properties', documentID) //update sub_localities array
            ]
        } catch (error) { console.error(error); }
    },

    async postPropertyDetails(collectionID, documentID, newdata) {
        try {
            return await firebaseServices.updateSingleDocument(collectionID, documentID, newdata) //update property
        } catch (error) { console.error(error); }
    },

    async postPricingDetails(collectionID, documentID, newdata) {
        try {
            return await firebaseServices.updateSingleDocument(collectionID, documentID, newdata) //update property
        } catch (error) { console.error(error); }
    },

    async postAmenitiesDetails(collectionID, documentID, newdata) {
        try {
            return await firebaseServices.updateSingleDocument(collectionID, documentID, newdata) //update property
        } catch (error) { console.error(error); }
    },

    async postImage(collectionID, documentID, file, metadata, image_path) {
        try {
            return [
                await firebaseServices.setSingleMedia(image_path, file), //update property
                await firebaseServices.addArrayElement(collectionID, documentID, 'photos', metadata['photos'][0]), //update photos array
            ]
        } catch (error) { console.error(error); }
    },

    async postVisitPreferenceDetails(collectionID, documentID, newdata) {
        try {
            return await firebaseServices.updateSingleDocument(collectionID, documentID, newdata) //update property
        } catch (error) { console.error(error); }
    },

    async postOtherDetails(collectionID, documentID, newdata) {
        try {
            return await firebaseServices.updateSingleDocument(collectionID, documentID, newdata) //update property
        } catch (error) { console.error(error); }
    },

}