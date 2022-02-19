import firebaseServices from './firebaseServices'

export default {
    async verifyLocality(localityID, cityID,/* other_details, */ already_true) {
        //update locality verification status to true
        await firebaseServices.updateSingleDocument('localities', localityID, { "verified": true }).catch((err) => { console.error(err); })

        //add locality to cities
        await firebaseServices.deleteSingleDocument('pending_locality_verification', localityID).catch((err) => { console.error(err); })


        // other_details = {
        //     verification_date: "Date and Time",
        //     verification_status: "Verified",
        //     expiration_date: "Date and Time + 6 months",
        // }
        // await firebaseServices.updateSingleDocument('apartments_sale', apartmentID, other_details)

    },
    async verifySublocality(sublocalityID, localityID, already_true) {
        //update sublocality verification status
        await firebaseServices.updateSingleDocument('sublocalities', sublocalityID, { "verified": true }).catch((err) => { console.error(err); })

        //remove sublocality from pending
        await firebaseServices.deleteSingleDocument('pending_sublocality_verification', sublocalityID).catch((err) => { console.error(err); })
    },
    async verifyBuilding(buildingID, sublocalityID, already_true) {
        //update building verification status
        await firebaseServices.updateSingleDocument('buildings', buildingID, { "verified": true }).catch((err) => { console.error(err); })

        //remove building from pending
        await firebaseServices.deleteSingleDocument('pending_building_verification', buildingID).catch((err) => { console.error(err); })
    },


    async getAllUnverifiedLocalities() {
        return await firebaseServices.getAllDocuments('pending_locality_verification').catch((err) => { console.error(err); })
    },
    async getAllUnverifiedSublocalities() {
        return await firebaseServices.getAllDocuments('pending_sublocality_verification').catch((err) => { console.error(err); })
    },
    async getAllUnverifiedBuildings() {
        return await firebaseServices.getAllDocuments('pending_building_verification').catch((err) => { console.error(err); })
    },
}