import firebaseServices from './firebaseServices'
export default {

    async getLocationsDropdown(city, query) {
        let dropdown = []
        let localities = []
        let sublocalities = []
        let buildings = []

        localities = await firebaseServices.startWithQuery('localities', 'locality_name', query, 'city', city).catch((err) => { console.error(err); })
        localities.forEach(async (locality) => {
            dropdown.push({
                id: locality.id,
                name: locality.data().locality_name,
                type: 'locality'
            })

        });
        sublocalities = await firebaseServices.startWithQuery('sublocalities', 'sublocality_name', query, 'city', city).catch((err) => { console.error(err); })
        sublocalities.forEach(async (sublocality) => {
            dropdown.push({
                id: sublocality.id,
                name: sublocality.data().sublocality_name + ' , ' + sublocality.data().locality_name,
                type: 'sublocality'
            })
        });


        // buildings = await firebaseServices.startWithQuery('buildings', 'building_name', query, 'city', city).catch((err) => { console.error(err); })
        // buildings.forEach(building => {
        //     dropdown.push({
        //         id: building.id,
        //         name: building.data().building_name + ' , ' + building.data().sublocality_name + ' , ' + building.data().locality_name,
        //         type: 'building'
        //     })
        // })
        console.log(dropdown)
        return dropdown
    },

    async getMostVisitedApartments() {
        // const collectionLocation = collection(db, 'apartments_sale')
        // try {
        //     return await getDocs(collectionLocation)//(parameter) response: DocumentReference<any>
        // } catch (error) { console.error(error); return error }
    },
    async getApartments(collectionID, city, locality_name, sublocality_name, BHKtype) {
        collectionID = 'apartments_sale'
        city = 'Achalpur'
        locality_name = 'Dahisar'
        sublocality_name = "Anand Nagar"
        try {
            return await firebaseServices.fourEqualsQuery(collectionID,
                'location_details.city', city,
                'location_details.locality_name', locality_name,
                'location_details.sublocality_name', sublocality_name,
                'flat_details.BHKtype', BHKtype)
        } catch (error) { console.error(error); return error }
    },
    // MOST Visited
    // Most enquired
    // Most viewed
    // Ready to move properties from new projects
    // Properties from upcoming projects
    // Resale Properties
    // Most Luxurious/Expensive properties
    // Most Affordable/Cheap properties

}