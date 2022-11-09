import React, { useState, useEffect } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Navbar from "./components/Navbar";
import { getCustomerDetails, recordFuelSale } from "../../services/FuelStationServices";

function RecordFuelSale({ route, navigation }) {
  const [fuel, setFuel] = useState("");
  const [fuelValidity, setFuelValidity] = useState(false);
  const [fuelSale, setFuelSale] = useState("");
  const [fuelSaleValidity, setFuelSaleValidity] = useState(false);
  const [fuelRecordErrMsg, setFuelRecordErrMsg] = useState("");
  const [customerDetails, setCustomerDetails] = useState({});
  const [customerDetailErrMsg, setCustomerDetailErrMsg] = useState("");

  const { userNIC, registrationNumber} = route.params;

  // get details of the customer
  useEffect(() => {
    async function fetchCustomerDetails() {
      const customerDetails = await getCustomerDetails({registrationNumber: registrationNumber, userNIC: userNIC});

      if (!customerDetails.data.success)
        setCustomerDetailErrMsg(customerDetails.data.message);
      else
        setCustomerDetails(customerDetails.data.customerDetails);
    }

    fetchCustomerDetails();
  }, [userNIC, registrationNumber]);

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

  const handleRecordFuelSale = async () => {
    if (Object.keys(customerDetails.fuelSaleEligibleVehicles).includes(fuel)) {
      if (customerDetails.customer.remainingFuel[fuel] >= fuelSale && customerDetails.fuelStation.remainingFuel[fuel] >= fuelSale) {

        // record fuel sale
        const result = await recordFuelSale({customerDetails: customerDetails, fuel: fuel, fuelSale: fuelSale});

        if (!result.data.success)
          faliureAlert(); 
        else
          successAlert();

      }
      else
        setFuelRecordErrMsg("Invalid Fuel Amount!")
    }
    else
      setFuelRecordErrMsg("Invalid Fuel!")

  };

  const cancel = () => {
    navigation.navigate('Home', {
      registrationNumber: registrationNumber
    });  
  }

  const validateFuel = (value) => {
    return (value.toLowerCase() === "petrol" || value.toLowerCase() === "diesel")
  };

  const validateFuelSale = (value) => {
    return !isNaN(value) && value != "" && value.toString().indexOf('.') != 0 && value > 0;   
  }

  const faliureAlert = () =>
    Alert.alert(
      "Fuel sale recording failed",
      "Fuel sale recording failed, please try again later.",
      [
        { text: "OK", onPress: () => {
          navigation.navigate('Home', {
            registrationNumber: registrationNumber
          });
        } }
      ]
    );

  const successAlert = () =>
  Alert.alert(
    "Fuel sale recording succesful",
    "Fuel sale recording successful, a notification will be sent to the customer.",
    [
      { text: "OK", onPress: () => {
        navigation.navigate('Home', {
          registrationNumber: registrationNumber
        });
      } }
    ]
  );

  return (
    <>
      <StatusBar style='light'/>
      <View style={styles.appContainer}>
        <Navbar navigation={navigation}/>
        <View style={styles.body}>
          <ScrollView>
          {Object.keys(customerDetails).length !== 0 ? (
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
                    <Text style={styles.customerDetail}>Name                    :   {customerDetails.customer.firstName} {customerDetails.customer.lastName}</Text>
                    <Text style={styles.customerDetail}></Text>
                  </View>
                  <View style={styles.customerDetailField}>
                    <Text style={styles.customerDetail}>Requested Fuel    :   {Object.keys(customerDetails.fuelSaleEligibleVehicles).join('  ,  ')}</Text>
                  </View>
                  <View style={styles.customerDetailField}>
                    <Text style={styles.customerDetail}>Remaning Fuel     :   Petrol : {customerDetails.customer.remainingFuel["Petrol"]}L</Text>
                  </View>
                    <Text style={styles.customerDetail}>                                   Diesel : {customerDetails.customer.remainingFuel["Diesel"]}L</Text>
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
                    onPress={handleRecordFuelSale}
                  />
                </View>
              }
            </View>
          ) : (
            <View style={styles.error}>
              <Text style={styles.errorText}>{customerDetailErrMsg}</Text>
            </View>
          ) }
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
    borderRadius: 8,
    margin: 16,
    paddingVertical: 8,
    backgroundColor: '#ffe0e0',
    alignItems: 'center'
  },
  errorText: {
    color: "red"
  }
});

export default RecordFuelSale;
