import firebaseServices from './firebaseServices'

export default {
    async verifyLocality(localityID, cityID) {
        try {
            //update locality verification status
            await firebaseServices.updateSingleDocument('localities', localityID, { "verified": true })
            //add locality to cities
            await firebaseServices.addArrayElement('cities', cityID, 'localities', localityID) //update cities array
            //remove locality from pending
            await firebaseServices.deleteSingleDocument('pending_locality_verification', localityID)
        } catch (error) { console.error(error); return error }
    },
    async verifySublocality(sublocalityID, localityID) {
        try {
            //update sublocality verification status
            await firebaseServices.updateSingleDocument('sublocalities', sublocalityID, { "verified": true })
            //add sublocality to localities
            await firebaseServices.addArrayElement('localities', localityID, 'sublocalities', sublocalityID) //update cities array
            //remove sublocality from pending
            await firebaseServices.deleteSingleDocument('pending_sublocality_verification', sublocalityID)
        } catch (error) { console.error(error); return error }
    },
    async verifyBuilding(buildingID, sublocalityID) {
        try {
            //update building verification status
            await firebaseServices.updateSingleDocument('buildings', buildingID, { "verified": true })
            //add building to localities
            await firebaseServices.addArrayElement('sublocalities', sublocalityID, 'buildings', buildingID) //update cities array
            //remove building from pending
            await firebaseServices.deleteSingleDocument('pending_building_verification', buildingID)
        } catch (error) { console.error(error); return error }
    },

    async getAllUnverifiedLocalities() {
        try {
            return await firebaseServices.getAllDocuments('pending_locality_verification')
        } catch (error) { console.error(error); return error }
    },
    async getAllUnverifiedSublocalities() {
        try {
            return await firebaseServices.getAllDocuments('pending_sublocality_verification')
        } catch (error) { console.error(error); return error }
    },
    async getAllUnverifiedBuildings() {
        try {
            return await firebaseServices.getAllDocuments('pending_building_verification')
        } catch (error) { console.error(error); return error }
    },

}