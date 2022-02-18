import firebaseServices from './firebaseServices'

export default {
    async verifyLocality(localityID, cityID,/* other_details, */ already_true) {
        try {
            if (!already_true) {
                //update locality verification status to true
                await firebaseServices.updateSingleDocument('localities', localityID, { "verified": true })
            }
            //add locality to cities
            await firebaseServices.deleteSingleDocument('pending_locality_verification', localityID)
            // other_details = {
            //     verification_date: "Date and Time",
            //     verification_status: "Verified",
            //     expiration_date: "Date and Time + 6 months",
            // }
            // await firebaseServices.updateSingleDocument('apartments_sale', apartmentID, other_details)
        } catch (error) { console.error(error); return error }
    },
    async verifySublocality(sublocalityID, localityID, already_true) {
        try {
            if (!already_true) {
                //update sublocality verification status
                await firebaseServices.updateSingleDocument('sublocalities', sublocalityID, { "verified": true })
            }
            //remove sublocality from pending
            await firebaseServices.deleteSingleDocument('pending_sublocality_verification', sublocalityID)
        } catch (error) { console.error(error); return error }
    },
    async verifyBuilding(buildingID, sublocalityID, already_true) {
        try {
            if (!already_true) {
                //update building verification status
                await firebaseServices.updateSingleDocument('buildings', buildingID, { "verified": true })
            }
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