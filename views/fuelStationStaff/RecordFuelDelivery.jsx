import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

function RecordFuelDelivery() {
  const [fuel, setFuel] = useState("");
  const [fuelValidity, setFuelValidity] = useState(false);
  const [fuelSale, setFuelSale] = useState("");
  const [fuelSaleValidity, setFuelSaleValidity] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // get customer fuel data
  const userFuelData = {"petrol": 10, "diesel": 20}

  const handleFuelChange = (inputFuel) => {
    setFuel(inputFuel);
    setFuelValidity(validateFuel(inputFuel));
    setErrMsg("");
  };

  const handleFuelSaleChange = (inputFuelSale) => {
    setFuelSale(inputFuelSale);
    setFuelSaleValidity(validateFuelSale(inputFuelSale));
    setErrMsg("");
  };

  const recordFuelSale = () => {
    if (userFuelData[fuel] >= fuelSale) {
      console.log("fuel", fuel);
      console.log("fuelSale", fuelSale);
      // record fuel sale
    }
    else {
      setErrMsg("Invalid Fuel Amount!")
    }
  };

  const validateFuel = (value) => {
    return (value.toLowerCase() === "petrol" || value.toLowerCase() === "diesel")
  };

  const validateFuelSale = (value) => {
    return !isNaN(value) && value != "" && value.toString().indexOf('.') != 0 && value > 0;   
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Fuel Token Issuer and Queue Management System</Text>
        <Button color="#d63447" title='Logout'/>
      </View>
      <View style={styles.body}>
        <View style={styles.recordFuelForm}>
          <Text style={styles.inputLabel}>Fuel</Text>
          <TextInput style={styles.textInput} placeholder='Enter Fuel' onChangeText={handleFuelChange}/>
          <Text style={styles.inputLabel}>Fuel Sale</Text>
          <TextInput style={styles.textInput} placeholder='Enter Fuel Amount' onChangeText={handleFuelSaleChange}/>
          {errMsg !== "" ? (
            <View style={styles.error}>
              <Text style={styles.errorText}>{errMsg}</Text>
            </View>
          ) : null}
          <Button 
            color="#ff5722" 
            disabled={fuelValidity && fuelSaleValidity ? false : true} 
            title='Record Fuel Sale' 
            onPress={recordFuelSale}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    flex: 1
  },
  navbar: {
    flexDirection: "row",
    backgroundColor: "#d63447",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    width: '60%',
    margin: 8
  },
  body: {
    flex: 1,
    backgroundColor: "#d1cebd"
  },
  recordFuelForm: {
    backgroundColor: "white",
    margin: '10%',
    padding: 10,
    borderRadius: 10
  },
  inputLabel: {
    fontSize: 20,
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

export default RecordFuelDelivery;
