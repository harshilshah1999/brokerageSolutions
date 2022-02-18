<template>
  <div>
    <hr />
    <br />
    <div>
      <v-autocomplete
        v-model="property_type"
        :items="property_types"
        label="Property Type"
        filled
      ></v-autocomplete>
      <v-btn>
        <input type="submit" value="LOCATION DETAILS" v-on:click="location_submit" />
      </v-btn>
      <v-btn>
        <input
          type="submit"
          value="CONSTRUCTION DETAILS"
          v-on:click="construction_submit"
        />
      </v-btn>
      <v-btn>
        <input type="submit" value="PROPERTY DETAILS" v-on:click="detail_submit" />
      </v-btn>
      <v-btn>
        <input type="submit" value="PRICING DETAILS" v-on:click="pricing_submit" />
      </v-btn>
      <v-btn>
        <input type="submit" value="AMENITIES DETAILS" v-on:click="amenities_submit" />
      </v-btn>
      <v-btn>
        <input type="submit" value="VISIT DETAILS" v-on:click="visit_preference_submit" />
      </v-btn>
      <v-btn>
        <input type="submit" value="OTHER DETAILS" v-on:click="other_submit" />
      </v-btn>
    </div>

    <br />
    <v-btn>
      <input type="submit" value="ADD LOCALITY" v-on:click="add_locality" />
    </v-btn>
    <v-btn>
      <input type="submit" value="ADD SUBLOCALITY" v-on:click="add_sublocality" />
    </v-btn>
    <v-btn>
      <input type="submit" value="VERIFY LOCALITY" v-on:click="verify_locality" />
    </v-btn>
    <v-btn>
      <input type="submit" value="VERIFY SUBLOCALITY" v-on:click="verify_sublocality" />
    </v-btn>
    <br /><br /><br /><br />
    <v-file-input
      counter
      multiple
      show-size
      small-chips
      truncate-length="50"
      accept="image/*,video/mp4,video/x-m4v,video/*"
      v-model="chosenFile"
    ></v-file-input>
    <v-btn v-on:click="submit_image">UPLOAD IMAGE</v-btn>

    <!-- <v-text-field
      v-model="property_type"
      :rules="nameRules"
      :counter="10"
      label="Property Type"
      required
    ></v-text-field> -->

    <hr />
    <img id="myimg" src="../assets/image.png" height="125px" width="200px" />
    <span>
      <video width="400" controls>
        <source src="../assets/video2.webm" id="vid" type="video/webm" />
      </video>
    </span>
  </div>
</template>

<script>
import postApartmentServices from "../services/postForm/apartments/postApartmentServices";
// import verificationServices from '../services/verificationServices'
import cities from "../assets/cities.json";
import firebaseServices from "../services/firebaseServices";
import imageCompression from "browser-image-compression";

export default {
  name: "post-form",

  data: () => ({
    property_type: "",
    property_types: ["apartments_sale", "apartments_rent", "apartments_sharing"],
    results: {},
    chosenFile: null,
    documentID: null,
    storage_path: "",
    sale_construction_formData: {
      building_details: {
        construction_type: "Under Construction/New/resale",
        possesion_date: "date",
        oc_status: "string",
        building_age: "string",
        property_available_from: "date",
      },
    },
    rent_construction_formData: {
      building_details: {
        construction_type: "Under Construction/New/resale",
        building_age: "string",
      },
    },
    location_formData: {
      location_details: {
        city: "Achalpur",
        locality_id: null,
        locality_name: "Borivali",
        sublocality_id: null,
        sublocality_name: "Daulat Nagar",
        flat_number: "203",
        building_id: null,
        building_name: "B/43, Mayuri CHS",
        landmark: ["Azam Dairy"],
        google_map_details: {
          google_map_coordinates: "Point",
        },
      },
    },
    details_formData: {
      flat_details: {
        BHKtype: "2BHK",
        carpet_area: "706 sq.ft",
        builtup_area: "900 sq.ft",
        super_builtup_area: "1200 sq.ft",
        floor_number: "19",
        total_floors: "42",
        facing: "East/West/South/North/South-East/...",
        furnishing: "Unfurnished/Semifurnished/Unfurnished",
        bathrooms: "3",
        balconies: "0",
        description: "Auto-generate summary API - lorem ipsum",
      },
    },
    pricing_formData: {
      pricing_details: {
        negotiable_price: "number/string",
        non_negotiable_price: "number/string",
        all_inclusive_price: "number/string",
        inclusions: {
          parking: "boolean",
          clubhouse_membership: "boolean",
          maintenance: "string",
          other_inclusions: "string",
        },
        monthly_maintainence: "number/string",
        annual_maintainence: "number/string",
      },
    },
    rental_formData: {
      rental_details: {
        property_for: "Rent/Lease",
        negotiable_rent: "",
        non_negotiable_rent: "",
        negotiable_deposit: "",
        non_negotiable_deposit: "",
        maintainence_included: "true/false",
        monthly_maintainence: "5000/month",
        annual_maintainence: "70000/year",
        available_from: "Date()",
        tenents_preference: "None/Family/Bachelors/Company",
        inclusions: {
          parking: true,
          clubhouse_membership: false,
          other_inclusions: ["banquet", "something else"],
        },
      },
    },
    amenities_formData: {
      amenities: {
        lift: true,
        gas_pipeline: false,
        visitor_parking: true,
        gym: false,
        swimming_pool: true,
        clubhouse: false,
      },
    },
    visit_preference_formData: {
      scheduling_details: {
        preferred_days: ["Sunday", "Monday"],
        preferred_time: {
          from: "10am",
          to: "9pm",
        },
        alternate_number: "1234567890",
      },
    },
    other_formData: {
      other_details: {
        posted_date: "date()",
        expiration_date: "date()",
        status: "Active/Inactive",
        posted_by: "Somil Shah - 124567890",
        verification_status: "verified/under_verification/rejected",
        times_visited: "increment()",
        user_feedback: {
          user_id: "Harshil Shah - 0987654321",
          user_remark: "Nice property! Good interior!",
        },
      },
    },
    media_formData: {},
  }),

  mounted: async function () {
    // console.log( await firebaseServices.addDocumentAutoID2D('buildings', 'vz0jDwdNDorM01nMvtEu', 'flats', {carpet_area : '900 sq. ft.'}))
    // this.post_dummy_cities()
    // this.getLocalities('Achalpur')
    // this.getSublocalities('rG7d6DZTIskKqMiUWRfB')
    // this.getBuildings('gSuqJckN00ShSaqrFi6y')
    // this.getFlats('Ixe7qQgdDowRYZD0ilbR')
    // this.add_flat('Ixe7qQgdDowRYZD0ilbR')
    // const response =  await postApartmentServices.addNewBuilding(
    //     'YQDvTYvtduZ49W1e2VkQ',
    //     { somil: 'hfkf' }
    //   )
    //   console.log(response,response.id,response['id'])
  },
  methods: {
    getLocalities: async function (cityID) {
      let response = await postApartmentServices.getLocalities(cityID);
      response.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    },
    getSublocalities: async function (localityID) {
      let response = await postApartmentServices.getSublocalities(localityID);
      response.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    },
    getBuildings: async function (sublocalityID) {
      let response = await postApartmentServices.getBuildings(sublocalityID);
      response.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    },
    getFlats: async function (buildingID) {
      let response = await postApartmentServices.getFlats(buildingID);
      response.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    },
    location_submit: async function () {
      try {
        this.property_type;
        let newLocalityID = await this.add_locality();
        let newSublocalityID = await this.add_sublocality(newLocalityID);
        let buildingID = await this.add_building(newSublocalityID);
        console.log("Building added successfully", buildingID);
        const response = await postApartmentServices.postLocationDetails(
          this.property_type,
          this.location_formData,
          newLocalityID,
          newSublocalityID
        );

        this.documentID = response[0];
        this.storage_path = response[0]["path"];

        console.log("New property Added : ", response[0], response);
      } catch (error) {
        console.error(error);
      }
    },
    construction_submit: async function () {
      let construction_formData;
      if (this.property_type == "apartments_sale") {
        construction_formData = this.sale_construction_formData;
      } else {
        //apartments_rent
        construction_formData = this.rent_construction_formData;
      }
      try {
        await postApartmentServices.postBuildingDetails(
          this.property_type,
          construction_formData
        );
      } catch (error) {
        console.error(error);
      }
    },
    add_locality: async function () {
      //add new locality
      try {
        return await postApartmentServices.addNewLocality(this.location_formData, true);
      } catch (error) {
        console.error(error);
      }
    },
    add_sublocality: async function (localityID) {
      //add new sublocality
      try {
        return await postApartmentServices.addNewSubLocality(
          localityID,
          this.location_formData,
          true
        );
      } catch (error) {
        console.error(error);
      }
    },
    add_building: async function (sublocalityID) {
      //add new building
      try {
        return await postApartmentServices.addNewBuilding(
          sublocalityID,
          this.location_formData,
          true
        );
      } catch (error) {
        console.error(error);
      }
    },
    add_flat: async function (buildingID) {
      let flatDataBody = {
        BHKtype: "BHKtype",
        carpet_area: "carpet_area",
        builtup_area: "builtup_area",
        super_builtup_area: "super_builtup_area",
        facing: "facing",
        bathrooms: "bathrooms",
        balconies: "balconies",
        total_floors: 65,
      };

      await postApartmentServices.addNewFlat(buildingID, flatDataBody);
    },
    verify_locality: async function () {
      try {
        await verificationServices.verifyLocality(
          this.property_type,
          this.documentID,
          this.location_formData,
          true
        );
      } catch (error) {
        console.error(error);
      }
    },
    verify_sublocality: async function () {
      try {
        await verificationServices.verifySublocality(
          this.property_type,
          this.documentID,
          this.location_formData,
          true
        );
      } catch (error) {
        console.error(error);
      }
    },
    detail_submit: async function () {
      try {
        await postApartmentServices.postFlatDetails(
          this.property_type,
          this.documentID,
          this.details_formData
        );
        this.add_flat("Ixe7qQgdDowRYZD0ilbR"); //buildingID
      } catch (error) {
        console.error(error);
      }
    },
    pricing_submit: async function () {
      if (this.property_type == "apartments_sale") {
        try {
          await postApartmentServices.postPricingDetails(
            this.property_type,
            this.documentID,
            this.pricing_formData
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          await postApartmentServices.postRentalDetails(
            this.property_type,
            this.documentID,
            this.rental_formData
          );
        } catch (error) {
          console.error(error);
        }
      }
    },
    amenities_submit: async function () {
      try {
        await postApartmentServices.postAmenitiesDetails(
          this.property_type,
          this.documentID,
          this.amenities_formData
        );
      } catch (error) {
        console.error(error);
      }
    },
    submit_image: async function () {
      try {
        this.chosenFile.forEach(async (element, index) => {
          const options = {
            maxSizeMB: 0.4,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
          console.log(`originalFile size ${element.size / 1024 / 1024} MB`);
          const compressedFile = await imageCompression(element, options);
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          (this.media_formData = {
            storage_path: this.storage_path + "/" + index + "_" + element.name, //need image name validation here
            media_type: "Living Room/Bedroom/Kitchen/...",
            thumbnail: true,
          }),
            await postApartmentServices.postMedia(
              this.property_type,
              this.documentID,
              compressedFile,
              this.media_formData,
              this.property_type + "/" + this.documentID + "/" + element.name
            );
        });
      } catch (error) {
        console.error(error);
      }
    },
    visit_preference_submit: async function () {
      try {
        await postApartmentServices.postVisitPreferenceDetails(
          this.property_type,
          this.documentID,
          this.visit_preference_formData
        );
      } catch (error) {
        console.error(error);
      }
    },
    other_submit: async function () {
      try {
        await postApartmentServices.postOtherDetails(
          this.property_type,
          this.documentID,
          this.other_formData
        );
      } catch (error) {
        console.error(error);
      }
    },
    post_dummy_cities: async function () {
      cities.forEach((city) => {
        firebaseServices.addDocumentManualID("cities", city["name"], city);
      });
    },
  },
};
</script>
