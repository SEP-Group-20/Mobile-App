import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View, ImageBackground } from 'react-native';
import { Icon } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { FSSLogin } from "../../services/AuthServices";
import LoginNavbar from "../fuelStationStaff/components/LoginNavBar";

const image = { uri: "https://images.pexels.com/photos/9216590/pexels-photo-9216590.jpeg?cs=srgb&dl=pexels-erik-mclean-9216590.jpg&fm=jpg&_gl=1*b55um7*_ga*NjE4NDcwNTA3LjE2Njg1MzM4MTY.*_ga_8JE65Q40S6*MTY2ODUzMzgxNy4xLjEuMTY2ODUzMzk5MS4wLjAuMA.." };

function Login({ navigation }) {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [registrationNumber, pwd]);

  const handleRegistrationNumberChange = (inputRegistrationNumber) => {
    setRegistrationNumber(inputRegistrationNumber);
    setErrMsg("");
  };

  const handlePwdChange = (inputPwd) => {
    setPwd(inputPwd);
    setErrMsg("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (registrationNumber.trim() === "")
        setErrMsg("Enter fuel station registration number!");
      else if (pwd.trim() === "")
        setErrMsg("Enter password!");
      else {
        const res = await FSSLogin({registrationNumber, pwd});

        if (res.status === 200){
          setRegistrationNumber("");
          setPwd("");
          navigation.navigate('Home', {
            registrationNumber: res.data.user.registrationNumber
          });          
        }

      }
    } catch (error) {
      if (!error?.response) {
        setErrMsg("Something went wrong!");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing Registration Number or Password!");
      } else if (error.response?.status === 401) {
        setErrMsg("Invalid registration number, password pair!");
      } else {
        setErrMsg("No server response!");
      }
    }
  };

  return (
    <>
      <StatusBar style='light'/>
      <LoginNavbar />
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.appContainer} opacity={0.85}>
        <View style={styles.loginForm}>
          <View style={styles.formHead}>
            <Icon name='lock' reverse color="#9c27b0" />
            <Text style={styles.formTitle}>Log In</Text>              
          </View>
          <Text style={styles.inputLabel}>Registration Number</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Enter Registration Number'
            onChangeText={handleRegistrationNumberChange}
            value={registrationNumber}
            />
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Enter Password'
            onChangeText={handlePwdChange}
            secureTextEntry={true}
            value={pwd}
            />
          {errMsg !== "" ? (
            <View style={styles.error}>
              <Text style={styles.errorText}>{errMsg}</Text>
            </View>
          ) : null}
          <Button 
            title='Login'
            color="#1976d2"
            onPress={handleSubmit}
            />
        </View>
      </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url("https://images.pexels.com/photos/9216590/pexels-photo-9216590.jpeg?cs=srgb&dl=pexels-erik-mclean-9216590.jpg&fm=jpg&_gl=1*b55um7*_ga*NjE4NDcwNTA3LjE2Njg1MzM4MTY.*_ga_8JE65Q40S6*MTY2ODUzMzgxNy4xLjEuMTY2ODUzMzk5MS4wLjAuMA..")`,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  loginForm: {
    width: '80%',
    borderRadius: 16,
    padding: 8,
    backgroundColor: 'white',
  },
  formHead: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  formTitle: {
    fontSize: 32,
    marginBottom: 32
  },
  inputLabel: {
    fontSize: 20,
    marginBottom: 8
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

export default Login;
