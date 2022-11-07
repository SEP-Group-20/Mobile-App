import React, { useState, useEffect } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Navbar from "./components/Navbar";

function RecordFuelSale({ route, navigation }) {
  const [fuel, setFuel] = useState("");
  const [fuelValidity, setFuelValidity] = useState(false);
  const [fuelSale, setFuelSale] = useState("");
  const [fuelSaleValidity, setFuelSaleValidity] = useState(false);
  const [fuelRecordErrMsg, setFuelRecordErrMsg] = useState("");
  const [customerDetailErrMsg, setCustomerDetailErrMsg] = useState("");

  const { userNIC } = route.params;

  // TODO: Before submitting the record fuel sale when the page is loaded for the first time
  // TODO: IN THE FRONTEND
  //       get the NIC number (from QR code scan and pass it here) and fuel station registration number
  // TODO: IN THE BACKEND
  //       get the user Object id, name, fuel allocation, fuel remaining, and registred fuel stations using NIC
  //       get the fuel station oid and fuel queues using the registration number
  //       check if the customer is registered in this fuel station
  //       using the oid of the customer get the vehicles that has been queued and received fuel available notifications
  //       if there are such vehicles get their vid and fuel types.
  //       check if those vehicles are queued in this fuel station.
  //       response if successful
  //       res = {
  //         "success": true,
  //         "userNIC": "123456789V",
  //         "userName": "Thivindu Paranayapa",
  //         "fuelAllocation": {
  //           "Petrol": 20,
  //           "Diesel": 50
  //         },
  //         "fuelReamining": {
  //           "Petrol": 10,
  //           "Diesel": 25
  //         },
  //         "fuelRequestedVehicles": {
  //           "233dr454ftv5hvyv5ye4640": "Petrol",
  //           "esft798ye34764365hbjbjn": "Diesel"
  //         }
  //       }
  //       if there are no problems display the record fuel delivery form
  //       else display the relevant error message along with the user details
  //       Ex :- "User not registered in system" - if user cannot be found for the given NIC
  //             "Not registered in this fuel station" - if user is not registered in this fuel station
  //             "Vehicle not queued or not notified" - if vehicle is not queued or not notified
  //             "Vehicle not queued in this fuel station" - if vehicle is not queued in this fuel station
  //       response if failure
  //       res = {
  //         "success": false,
  //         "message": "User not registered in system"
  //       }
  //
  // TODO: After submitting the record fuel sale
  // TODO: IN THE FRONTEND
  //       check if the recorded fuel sale is less than the remaming fuel of the customer
  //       send the record fuel sale to backend with customer oid fuel type, amount and vehicle oid corresponding to that fuel
  //       else diaplay error message
  // TODO: IN THE BACKEND
  //       deduct the fuel amount form the respective fuel of customer remaining fuel
  //       remove the vehicle oid from the respective fuel queue
  //       set the isQueued status of the vehcile to false and notofications sent to 0
  //       get the mobile number of the customer and send a success notification
  // TODO: IN THE FRONTEND
  //       display success message and navigate to home

  // get customer fuel data
  const userFuelData = {"petrol": 10, "diesel": 20}

  const handleFuelChange = (inputFuel) => {
    setFuel(inputFuel);
    setFuelValidity(validateFuel(inputFuel));
    setFuelRecordErrMsg("");
  };

  const handleFuelSaleChange = (inputFuelSale) => {
    setFuelSale(inputFuelSale);
    setFuelSaleValidity(validateFuelSale(inputFuelSale));
    setFuelRecordErrMsg("");
  };

  const recordFuelSale = () => {
    if (userFuelData[fuel] >= fuelSale) {
      console.log("fuel", fuel);
      console.log("fuelSale", fuelSale);
      // record fuel sale
      // display success message
      // go to home page
    }
    else {
      setFuelRecordErrMsg("Invalid Fuel Amount!")
    }
  };

  const cancel = () => {
    console.log("cancel");
    navigation.navigate('Home');
  }

  const validateFuel = (value) => {
    return (value.toLowerCase() === "petrol" || value.toLowerCase() === "diesel")
  };

  const validateFuelSale = (value) => {
    return !isNaN(value) && value != "" && value.toString().indexOf('.') != 0 && value > 0;   
  }

  return (
    <>
      <StatusBar style='light'/>
      <View style={styles.appContainer}>
        <Navbar navigation={navigation}/>
        <View style={styles.body}>
          <ScrollView>
            <View style={styles.customerDetails_recordFuelSale}>
              <View>
                <View style={styles.formHead}>
                  <Text style={styles.formTitle}>Customer Details</Text>
                </View>
                <View style={styles.customerDetailForm}>
                  <View style={styles.customerDetailField}>
                    <Text style={styles.customerDetail}>NIC                        :   {userNIC}</Text>
                  </View>
                  <View style={styles.customerDetailField}>
                    <Text style={styles.customerDetail}>Name                    :   Thivindu Paranayapa</Text>
                    <Text style={styles.customerDetail}></Text>
                  </View>
                  <View style={styles.customerDetailField}>
                    <Text style={styles.customerDetail}>Requested Fuel    :   Petrol  ,  Diesel</Text>
                  </View>
                  <View style={styles.customerDetailField}>
                    <Text style={styles.customerDetail}>Remaning Fuel     :   Petrol : 10L</Text>
                  </View>
                    <Text style={styles.customerDetail}>                                   Diesel : 25L</Text>
                </View>
              </View>
              {customerDetailErrMsg !== "" ? (
                <View style={styles.error}>
                  <Text style={styles.errorText}>{customerDetailErrMsg}</Text>
                </View>
              ) : 
                <View style={styles.recordFuelSaleForm}>
                <View style={styles.formHead}>
                  <Text style={styles.formTitle}>Record Fuel Sale</Text>              
                </View>
                <Text style={styles.inputLabel}>Fuel</Text>
                <TextInput style={styles.textInput} placeholder='Enter Fuel' onChangeText={handleFuelChange}/>
                <Text style={styles.inputLabel}>Fuel Sale</Text>
                <TextInput style={styles.textInput} placeholder='Enter Fuel Amount' onChangeText={handleFuelSaleChange}/>
                {fuelRecordErrMsg !== "" ? (
                  <View style={styles.error}>
                    <Text style={styles.errorText}>{fuelRecordErrMsg}</Text>
                  </View>
                ) : null}
                <Button 
                  color="#ff5722" 
                  disabled={fuelValidity && fuelSaleValidity ? false : true} 
                  title='Record Fuel Sale' 
                  onPress={recordFuelSale}
                />
              </View>
              }
            </View>
            <View style={styles.cancelButton}>
              <Button 
                  color="red" 
                  title='cancel' 
                  onPress={cancel}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  body: {
    flex: 1,
    backgroundColor: "#d1cebd"
  },
  customerDetails_recordFuelSale: {
    backgroundColor: "white",
    marginHorizontal: '10%',
    marginTop: '10%',
    padding: 10,
    borderRadius: 10
  },
  formHead: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  formTitle: {
    fontSize: 20,
    marginBottom: 5
  },
  customerDetailForm: {
    marginVertical: 16
  },
  customerDetailField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8
  },
  customerDetail: {
    fontSize: 15
  },
  recordFuelSaleForm: {
    borderTopWidth: 1,
    paddingTop: 16
  },
  inputLabel: {
    fontSize: 15,
    marginBottom: 5
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    width: '100%',
    padding: 8,
    marginBottom: 16
  },
  cancelButton: {
    marginTop: 16,
    alignItems: 'center'
  },
  error: {
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: '#ffe0e0',
    borderRadius: 8,
    marginBottom: 16,
    paddingVertical: 8,
    alignItems: 'center'
  },
  errorText: {
    color: "red"
  }
});

export default RecordFuelSale;
