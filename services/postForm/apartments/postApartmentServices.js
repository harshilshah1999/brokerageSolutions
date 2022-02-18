import firebaseServices from '../../firebaseServices'
import verificationServices from '../../verificationServices';
// @TODO - CREATE NESTED COLLECTIONS TO SAVE READS
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
    async postConstructionDetails(collectionID, apartmentID, buildingID, newdata) {
        this.updateApartmentDetails(collectionID, apartmentID, newdata)
        this.updateBuildingDetails(buildingID, newdata)

    },
    async postPropertyDetails(collectionID, apartmentID, newdata) {
        this.updateApartmentDetails(collectionID, apartmentID, newdata)
    },
    async postPricingDetails(collectionID, apartmentID, flatID, newdata) {
        this.updateApartmentDetails(collectionID, apartmentID, newdata)
        let maintenanceData = {
            monthly_maintainence: newdata['monthly_maintainence'],
            annual_maintainence: newdata['annual_maintenance']
        }
        this.updateFlatDetails(buildingID, flatID, maintenanceData)
    },
    async postRentalDetails(collectionID, apartmentID, flatID, newdata) {
        this.updateApartmentDetails(collectionID, apartmentID, newdata)
        let maintenanceData = {
            monthly_maintainence: newdata['monthly_maintainence'],
            annual_maintainence: newdata['annual_maintenance']
        }
        this.updateFlatDetails(buildingID, flatID, maintenanceData)
    },
    async postAmenitiesDetails(collectionID, apartmentID, newdata) {
        this.updateApartmentDetails(collectionID, apartmentID, newdata)
        this.updateBuildingDetails(buildingID, newdata)
    },
    async postVisitPreferenceDetails(collectionID, apartmentID, newdata, other_details) {
        other_details = {
            posted_date: "Date and Time",
            posting_status: "Complete",
            posted_by_user_id: "ObjectID",
            posted_by_user_name: "Somil Shah",
            verification_status: "verified/under_verification/rejected",
        }
        //merge these two
        await firebaseServices.updateSingleDocument(collectionID, apartmentID, newdata)
        await firebaseServices.updateSingleDocument(collectionID, apartmentID, { other_details })
        this.updateApartmentDetails(collectionID, apartmentID, newdata)
        let flatData = {
            BHKtype: newdata['location_details']['city'],
            carpet_area: newdata['location_details']['city'],
            builtup_area: newdata['location_details']['city'],
            super_builtup_area: newdata['location_details']['city'],
            total_floors: newdata['location_details']['city'],
            facing: newdata['location_details']['city'],
            bathrooms: newdata['location_details']['city'],
            balconies: newdata['location_details']['city'],
            monthly_maintainence: "5000/month",
            annual_maintainence: "70000/year"
        }
        this.updateFlatDetails(buildingID, flatID, flatData)
    },
    async postMedia(collectionID, apartmentID, file, mediaData, image_path) {
        try {
            return [
                await firebaseServices.setSingleMedia(image_path, file), //update property in storage
                await firebaseServices.addDocumentAutoID2D(collectionID, apartmentID, 'media', mediaData) // update in firerstore
            ]
        } catch (error) { console.error(error); return error }
    },
    async postOtherDetails(collectionID, apartmentID, newdata) {
        this.updateApartmentDetails(collectionID, apartmentID, newdata)
    },

    async addNewLocality(newdata /* depends on who is posting the property [staff=true,other=false] */) {
        let localityForm = {
            locality_name: newdata['locality_name'],
            city: newdata['city'],
            verified: newdata['verified']
        }

        let locality = await firebaseServices.addDocumentAutoID2D('cities', newdata['city'], 'localities', localityForm).catch((err) => { console.error(err); }) //enter new locality
        await firebaseServices.addDocumentManualID('pending_locality_verification', locality['id'], localityForm).catch((err) => { console.error(err); }) //add locality for verification
        if (newdata['verified']) await verificationServices.verifyLocality(locality['id'], newdata['city'], true)
        return locality['id']
    },
    async addNewSubLocality(localityID, newdata /* depends on who is posting the property [staff=true,other=false] */) {
        let sublocalityForm = {
            sublocality_name: newdata['sublocality_name'],
            city: newdata['city'],
            locality_id: localityID,
            locality_name: newdata['locality_name'],
            verified: newdata['verified']
        }

        let sublocality = await firebaseServices.addDocumentAutoID3D('cities', newdata['city'], 'localities', localityID, 'sublocalities', sublocalityForm).catch((err) => { console.error(err); }) //enter new sublocality
        await firebaseServices.addDocumentManualID('pending_sublocality_verification', sublocality['id'], sublocalityForm).catch((err) => { console.error(err); }) //enter new sublocality
        if (newdata['verified']) await verificationServices.verifySublocality(sublocality['id'], localityID, true)
        return sublocality['id'];
    },
    async addNewBuilding(sublocalityID, newdata /* depends on who is posting the property [staff=true,other=false] */) {

        //adding new building
        let building = await firebaseServices.addDocumentAutoID4D('cities', newdata['city'], 'localities', newdata['locality_id'], 'sublocalities', newdata['sublocality_id'], 'buildings', newdata).catch((err) => { console.error(err); }) //enter new building
        await firebaseServices.addDocumentManualID('pending_building_verification', building['id'], newdata).catch((err) => { console.error(err); }) //enter new building
        if (newdata['verified']) await verificationServices.verifyBuilding(building['id'], sublocalityID, true)
        return building
    },
    async addNewFlat(city, localityID, sublocalityID, buildingID, flatData) {
        let flat = await firebaseServices.addDocumentAutoID5D('cities', city, 'localities', localityID, 'sublocalities', sublocalityID, 'buildings', buildingID, 'flats', flatData).catch((err) => { console.error(err); }) //enter new falt
        return flat
    },
    async addLandmark(city, localityID, sublocalityID, buildingID, landmark) {
        return await firebaseServices.addArrayElement4D('cities', city, 'localities', localityID, 'sublocalities', sublocalityID, 'buildings', buildingID, 'landmark', landmark).catch((err) => { console.error(err); })
    },
    // READ
    async getLocalities(city) {
        try {
            return await firebaseServices.getAllDocuments2D('cities', city, 'localities')
        } catch (error) { console.error(error); return error }
    },
    async getSublocalities(city, localityID) {
        try {
            return await firebaseServices.getAllDocuments3D('cities', city, 'localities', localityID, 'sublocalities')
        } catch (error) { console.error(error); return error }
    },
    async getBuildings(city, localityID, sublocalityID) {
        try {
            return await firebaseServices.getAllDocuments4D('cities', city, 'localities', localityID, 'sublocalities', sublocalityID, 'buildings')
        } catch (error) { console.error(error); return error }
    },
    async getFlats(city, localityID, sublocalityID, buildingID) {
        try {
            return await firebaseServices.getAllDocuments5D('cities', city, 'localities', localityID, 'sublocalities', sublocalityID, 'buildings', buildingID, 'flats')
        } catch (error) { console.error(error); return error }
    },

    async getApartmentDetails(collectionID, apartmentID) {
        try {
            return await firebaseServices.getSingleDocumentByID(collectionID, apartmentID)
        } catch (error) { console.error(error); return error }
    },
    async getBuildingDetails(city, localityID, sublocalityID, buildingID) {
        try {
            return await firebaseServices.getSingleDocumentByID4D('cities', city, 'localities', localityID, 'sublocalities', sublocalityID, 'buildings', buildingID)
        } catch (error) { console.error(error); return error }
    },
    async getFlatDetails(buildingID, flatID) {
        try {
            return await firebaseServices.getSingleDocumentByID2D('buildings', buildingID, 'flats', flatID)
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
            return await firebaseServices.updateSingleDocument('buildings', buildingID, newdata) //update property
        } catch (error) { console.error(error); return error }
    },
    async updateFlatDetails(buildingID, flatID, flatData) {
        await this.updateApartmentDetails('buildings', buildingID, { total_floors: flatData['total_floors'] })
        return await firebaseServices.updateSingleDocument2D('buildings', buildingID, 'flats', flatID, flatData)
    },
    async updateMedia(collectionID, apartmentID, mediaID, mediaData) { //don't update image path,wont be updated in storage
        return await firebaseServices.updateSingleDocument2D(collectionID, apartmentID, 'media', mediaID, mediaData).catch((err) => { console.error(err); })
    },

    //DELETE
    async removeApartment(collectionID, apartmentID) {
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
    async removeFlat(buildingID, flatID) {
        await firebaseServices.deleteSingleDocument2D('buildings', buildingID, 'flats', flatID).catch((err) => { console.error(err); })
    },

    async removeLandmark(buildingID, landmark) {
        return await firebaseServices.removeArrayElement('buildings', buildingID, 'landmark', landmark).catch((err) => { console.error(err); })
    },
}