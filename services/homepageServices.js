import firebaseServices from './firebaseServices'
export default {
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
                'property_details.BHKtype', BHKtype)
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