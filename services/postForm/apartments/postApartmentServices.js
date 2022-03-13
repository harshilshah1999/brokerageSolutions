import firebaseServices from '../../firebaseServices'
import verificationServices from '../../verificationServices';
export default {
    // CREATE
    async postLocationDetails(collectionID, newdata, sublocalityID) {
        let apartment = await firebaseServices.addDocumentAutoID(collectionID, newdata).catch((err) => { console.error(err); })
        // await firebaseServices.addArrayElement('sublocalities', sublocalityID, collectionID, apartment['id']).catch((err) => { console.error(err); }) //update sublocalities array
        return apartment['id']
    },
    async updateLocationDetails(collectionID, apartmentID, newdata) {
        this.updateApartmentDetails(collectionID, apartmentID, newdata)
    },
    async postBuildingDetails(collectionID, apartmentID, buildingID, newdata) {
        this.updateApartmentDetails(collectionID, apartmentID, newdata)
        this.updateBuildingDetails(buildingID, newdata['building_details'])
    },
    async postFlatDetails(collectionID, apartmentID, newdata) {
        this.updateApartmentDetails(collectionID, apartmentID, newdata)
    },
    async postPricingDetails(collectionID, apartmentID, flatID, newdata) {
        this.updateApartmentDetails(collectionID, apartmentID, newdata)
    },
    async postRentalDetails(collectionID, apartmentID, flatID, newdata) {
        this.updateApartmentDetails(collectionID, apartmentID, newdata)
    },
    async postAmenitiesDetails(collectionID, buildingID, apartmentID, newdata) {
        this.updateApartmentDetails(collectionID, apartmentID, newdata)
        this.updateBuildingDetails(buildingID, newdata)
    },
    async postOtherDetails(collectionID, apartmentID, other_details) {
        other_details = {
            posted_date: "Date and Time",
            posting_status: "Complete",
            posted_by_user_id: "ObjectID",
            posted_by_user_name: "Somil Shah",
            verification_status: "verified/under_verification/rejected",
        }
        this.updateApartmentDetails(collectionID, apartmentID, { other_details })
    },
    async postMedia(collectionID, apartmentID, mediaData) {
        try {
            return await firebaseServices.addDocumentAutoID2D(collectionID, apartmentID, 'media', mediaData) // update in firerstore
        } catch (error) { console.error(error); return error }
    },
    async postOtherDetails(collectionID, apartmentID, newdata) {
        this.updateApartmentDetails(collectionID, apartmentID, newdata)
    },

    async addNewLocality(newdata) {
        let localityForm = {
            locality_name: newdata['locality_name'],
            city: newdata['city'],
            verified: newdata['verified']/* depends on who is posting the property [staff=true,other=false] */
        }

        let locality = await firebaseServices.addDocumentAutoID('localities', localityForm).catch((err) => { console.error(err); }) //enter new locality
        if (!newdata['verified']) { await firebaseServices.addDocumentManualID('pending_locality_verification', locality['id'], localityForm).catch((err) => { console.error(err); }) } //add locality for verification
        return locality['id']
    },
    async addNewSubLocality(newdata) {
        let sublocalityForm = {
            sublocality_name: newdata['sublocality_name'],
            city: newdata['city'],
            locality_id: newdata['locality_id'],
            locality_name: newdata['locality_name'],
            verified: newdata['verified'] /* depends on who is posting the property [staff=true,other=false] */
        }

        let sublocality = await firebaseServices.addDocumentAutoID('sublocalities', sublocalityForm).catch((err) => { console.error(err); }) //enter new sublocality
        if (!newdata['verified']) { await firebaseServices.addDocumentManualID('pending_sublocality_verification', sublocality['id'], sublocalityForm).catch((err) => { console.error(err); }) }//enter new sublocality
        return sublocality['id']
    },
    async addNewBuilding(newdata) {
        let building = await firebaseServices.addDocumentAutoID('buildings', newdata).catch((err) => { console.error(err); }) //enter new building
        if (!newdata['verified']) { await firebaseServices.addDocumentManualID('pending_building_verification', building['id'], newdata).catch((err) => { console.error(err); }) }//enter new building
        return building['id']
    },
    // async addNewFlat(buildingID, flatData) {
    //     let flat = await firebaseServices.addDocumentAutoID2D('buildings', buildingID, 'flats', flatData).catch((err) => { console.error(err); }) //enter new falt
    //     return flat
    // },
    async addLandmark(buildingID, landmark) {
        return await firebaseServices.addArrayElement('buildings', buildingID, 'landmark', landmark).catch((err) => { console.error(err); })
    },
    // READ
    async getLocalities(cityID) { //get localities within a city
        try {
            return await firebaseServices.singleEqualsQuery('localities', 'city', cityID)
        } catch (error) { console.error(error); return error }
    },
    async getSublocalities(localityID) { //get subloaclities within a locality
        try {
            return await firebaseServices.singleEqualsQuery('sublocalities', 'locality_id', localityID)
        } catch (error) { console.error(error); return error }
    },
    async getBuildings(sublocalityID) { //get buildings within a sublocality
        try {
            return await firebaseServices.singleEqualsQuery('buildings', 'sublocality_id', sublocalityID)
        } catch (error) { console.error(error); return error }
    },
    // async getFlats(buildingID) {
    //     try {
    //         return await firebaseServices.getAllDocuments2D('buildings', buildingID, 'flats')
    //     } catch (error) { console.error(error); return error }
    // },

    async getApartmentDetails(collectionID, apartmentID) {
        try {
            return await firebaseServices.getSingleDocumentByID(collectionID, apartmentID)
        } catch (error) { console.error(error); return error }
    },
    async getBuildingDetails(buildingID) {
        try {
            return await firebaseServices.getSingleDocumentByID('buildings', buildingID)
        } catch (error) { console.error(error); return error }
    },
    // async getFlatDetails(buildingID, flatID) {
    //     try {
    //         return await firebaseServices.getSingleDocumentByID2D('buildings', buildingID, 'flats', flatID)
    //     } catch (error) { console.error(error); return error }
    // },
    async getMediaDetails(collectionID, apartmentID) {
        try {
            return await firebaseServices.getAllDocuments2D(collectionID, apartmentID, 'media')
        } catch (error) { console.error(error); return error }
    },
    async getMedia(media_path) {
        try {
            return await firebaseServices.getSingleMedia(media_path)
        } catch (error) { console.error(error); return error }
    },

    //UPDATE
    async updateApartmentDetails(collectionID, apartmentID, newdata) {
        try {
            return await firebaseServices.updateSingleDocument(collectionID, apartmentID, newdata) //update property
        } catch (error) { console.error(error); return error }
    },
    async updateLocalityDetails(localityID, newdata) {
        try {
            return await firebaseServices.updateSingleDocument('localities', localityID, newdata)
        } catch (error) { console.error(error); return error }
    },
    async updateSublocalityDetails(sublocalityID, newdata) {
        try {
            return await firebaseServices.updateSingleDocument('sublocalities', sublocalityID, newdata)
        } catch (error) { console.error(error); return error }
    },
    async updateBuildingDetails(buildingID, newdata) {
        try {
            return await firebaseServices.updateSingleDocument('buildings', buildingID, newdata)
        } catch (error) { console.error(error); return error }
    },
    // async updateFlatDetails(buildingID, flatID, flatData) {
    //     try {
    //         return await firebaseServices.updateSingleDocument2D('buildings', buildingID, 'flats', flatID, flatData)
    //     } catch (error) { console.error(error); return error }

    // },
    async updateMedia(collectionID, apartmentID, mediaID, mediaData) { //don't update image path,wont be updated in storage
        try {
            return await firebaseServices.updateSingleDocument2D(collectionID, apartmentID, 'media', mediaID, mediaData).catch((err) => { console.error(err); })
        } catch (error) { console.error(error); return error }
    },

    //DELETE
    async removeApartment(collectionID, apartmentID) {
        //remove all occurances of that property not just one collection.
        await firebaseServices.deleteSingleDocument(collectionID, apartmentID).catch((err) => { console.error(err); })
        await firebaseServices.removeArrayElement('sublocalities', sublocalityID, collectionID, apartmentID).catch((err) => { console.error(err); }) //update sublocalities array
    },
    async removeMedia(collectionID, apartmentID, mediaID, media_path) {
        try {
            await firebaseServices.deleteSingleMedia(media_path)
            await firebaseServices.deleteSingleDocument2D(collectionID, apartmentID, 'media', mediaID)
        } catch (error) { console.error(error); return error }
    },
    async removeLocality(localityID) {
        await firebaseServices.deleteSingleDocument('localities', localityID).catch((err) => { console.error(err); })
        await firebaseServices.removeArrayElement('cities', cityID, 'localities', localityID)
    },
    async removeSublocality(sublocalityID) {
        await firebaseServices.deleteSingleDocument('sublocalities', sublocalityID).catch((err) => { console.error(err); })
        await firebaseServices.removeArrayElement('localities', localityID, 'sublocalities', sublocalityID)
    },
    async removeBuilding(buildingID) {
        await firebaseServices.deleteSingleDocument('buildings', buildingID).catch((err) => { console.error(err); })
        await firebaseServices.removeArrayElement('sublocalities', sublocalityID, 'buildings', buildingID)
    },
    // async removeFlat(buildingID, flatID) {
    //     await firebaseServices.deleteSingleDocument2D('buildings', buildingID, 'flats', flatID).catch((err) => { console.error(err); })
    // },

    async removeLandmark(buildingID, landmark) {
        return await firebaseServices.removeArrayElement('buildings', buildingID, 'landmark', landmark).catch((err) => { console.error(err); })
    },
}