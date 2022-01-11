import firebaseServices from '../firebaseServices'

export default {

    async postLocationDetails(collectionID, newdata) {
        let appartmentID = await firebaseServices.addDocumentAutoID(collectionID, data).catch((err) => { console.error(err); })
        return [
            appartmentID,
            await firebaseServices.addArrayElement('localities', newdata['location_details']['locality_id'], collectionID, appartmentID).catch((err) => { console.error(err); }), //update localities array
            await firebaseServices.addArrayElement('sublocalities', newdata['location_details']['sublocality_id'], collectionID, appartmentID).catch((err) => { console.error(err); }), //update sublocalities array
        ]
    },

    async addNewLocality(collectionID, appartmentID, newdata, verification_status /* depends on who is posting the property [staff=true,other=false] */) {
        let localityForm = {
            locality_name: newdata['location_details']['locality'],
            city: newdata['location_details']['city'],
            sublocality_name: newdata['location_details']['sublocality'],
            verified: verification_status
        }

        //adding new locality
        let locality = await firebaseServices.addDocumentAutoID('localities', localityForm).catch((err) => { console.error(err); }) //enter new locality
        this.updateApartmentDetails(collectionID, appartmentID, { location_details: { locality_id: locality['id'] } })
        await firebaseServices.addDocumentManualID('pending_locality_verification', locality['id'], localityForm).catch((err) => { console.error(err); }) //add locality for verification

        if (newdata['location_details']['sublocality']) { //user might add or not add sublocality for new locality
            this.addNewSubLocality(collectionID, appartmentID, newdata, locality['id'], verification_status)  //adding new sublocality
        }
    },
    //when only new sublocality is added and not locality
    async addNewSubLocality(collectionID, appartmentID, newdata, localityID, verification_status /* depends on who is posting the property [staff=true,other=false] */) {
        let sublocalityForm = {
            sublocality_name: newdata['location_details']['sublocality'],
            city: newdata['location_details']['city'],
            locality_id: localityID,
            locality_name: newdata['location_details']['locality'],
            verified: verification_status
        }

        //adding new sublocality
        let sublocality = await firebaseServices.addDocumentAutoID('sublocalities', sublocalityForm).catch((err) => { console.error(err); }) //enter new sublocality
        this.updateApartmentDetails(collectionID, appartmentID, { location_details: { sublocality_id: sublocality['id'] } })
        await firebaseServices.addDocumentManualID('pending_sublocality_verification', sublocality['id'], sublocalityForm).catch((err) => { console.error(err); }) //enter new sublocality
    },
    //adding new building
    async addNewBuilding(newdata, localityID, sublocalityID, verification_status /* depends on who is posting the property [staff=true,other=false] */) {
        let buildingData = {
            locality_id: localityID,
            locality_name: newdata['location_details']['locality'],
            sublocality_id: sublocalityID,
            sublocality_name: newdata['location_details']['sublocality'],
            verified: verification_status,
            city: newdata['location_details']['city'],
            landmark: newdata['location_details']['landmark'],
        }

        //adding new building
        let building = await firebaseServices.addDocumentAutoID('buildings', buildingData).catch((err) => { console.error(err); }) //enter new building
        this.updateApartmentDetails(collectionID, appartmentID, { location_details: { building_id: building['id'] } })
        await firebaseServices.addDocumentManualID('pending_building_verification', building['id'], buildingData).catch((err) => { console.error(err); }) //enter new building
    },

    async postConstructionDetails(collectionID, appartmentID, newdata) {
        this.updateApartmentDetails(collectionID, appartmentID, newdata)
    },

    async postPropertyDetails(collectionID, appartmentID, newdata) {
        this.updateApartmentDetails(collectionID, appartmentID, newdata)
    },

    async postPricingDetails(collectionID, appartmentID, newdata) {
        this.updateApartmentDetails(collectionID, appartmentID, newdata)
    },

    async postRentalDetails(collectionID, appartmentID, newdata) {
        this.updateApartmentDetails(collectionID, appartmentID, newdata)
    },

    async postAmenitiesDetails(collectionID, appartmentID, newdata) {
        this.updateApartmentDetails(collectionID, appartmentID, newdata)
    },

    async postVisitPreferenceDetails(collectionID, appartmentID, newdata) {
        this.updateApartmentDetails(collectionID, appartmentID, newdata)
    },

    async postOtherDetails(collectionID, appartmentID, newdata) {
        this.updateApartmentDetails(collectionID, appartmentID, newdata)
    },

    async updateApartmentDetails(collectionID, appartmentID, newdata) {
        try {
            return await firebaseServices.updateSingleDocument(collectionID, appartmentID, newdata) //update property
        } catch (error) { console.error(error); return error }
    },

    async postMedia(collectionID, appartmentID, file, metadata, image_path) {
        try {
            return [
                await firebaseServices.setSingleMedia(image_path, file), //update property
                await firebaseServices.addArrayElement(collectionID, appartmentID, 'media', metadata['media'][0]), //update media array
            ]
        } catch (error) { console.error(error); return error }
    },

    async getCities() {
        try {
            return await firebaseServices.singleEqualsQuery('cities', 'status', 'active')
        } catch (error) { console.error(error); return error }

    },

    async getLocalities(cityID) {
        try {
            return await firebaseServices.doubleEqualsQuery('localities', 'city', cityID, 'verified', true)
        } catch (error) { console.error(error); return error }
    },

    async getSublocalities(localityID) {
        try {
            return await firebaseServices.doubleEqualsQuery('sublocalities', 'locality_id', localityID, 'verified', true)
        } catch (error) { console.error(error); return error }
    },

    async getBuildings(sublocalityID) {
        try {
            return await firebaseServices.doubleEqualsQuery('buildings', 'sublocality_id', sublocalityID, 'verified', true)
        } catch (error) { console.error(error); return error }
    }
}