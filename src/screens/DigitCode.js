import React, { useState,useEffect  } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView, TouchableWithoutFeedback,Platform, Button, Keyboard} from "react-native";
import { NativeBaseProvider, Box, HStack, Center, Column, Modal,IconButton, Icon, KeyboardAvoidingView  } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import InfosCode from '../componentes/InfosCode';



const DigitCode = () => {
  const navigation = useNavigation();
   const [qrcodeId, setQrcodeId] = useState('');
   const [scanned, setScanned] = useState(false);
   const [inputError, setInputError] = useState(false);

   const goBack = () => {
     navigation.goBack()
}

const handleConsultar = () => {
  if (qrcodeId.trim() === '') {
    setInputError(true);
  } else {
    setInputError(false);
    navigation.navigate('ScanQRCodeResult', {
      qrCode: qrcodeId,
    });
  }
};

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    setQrcodeId(''); 
  });

  return unsubscribe;
}, [navigation]);



    return(
      
     
      

      
      
      <Box style={styles.container} flex={1} safeArea>
        
        <HStack style={styles.icons}>
        <Ionicons 
                          
                          name="arrow-back"
                          size={32}
                          onPress={goBack}
                          
                      />
        <Box backgroundColor={"#1B9FA3"} borderRadius={"10"} w={"15%"} h={"100%"} justifyContent={"center"} alignItems={"center"}>
          <Ionicons 
                          color={"#fff"}
                          name="camera"
                          size={32}
                          onPress={() => navigation.navigate("ScanQRCode")}
                      />
        </Box>
         
                      
                      
        </HStack>

        <HStack flexDirection={"column"} w={"100%"} justifyContent={"center"} alignItems={"center"} marginBottom={"10%"}  safeArea>
            <Text style={styles.title}>Digitar Código </Text>
            <Text>Consultar no bilhete impresso o número ID QRCODE:</Text>
        </HStack>
        <HStack flexDirection={'column'} alignItems={'center'}  >
          {inputError && <Text style={styles.errorText}>Por favor, insira um valor válido.</Text>}
             <TextInput safearea
                               keyboardType='numeric'
                               style={styles.input}
                               placeholder="Digite o QRCode ID"
                               value={qrcodeId}
                              onChangeText={(text) => {
                                setQrcodeId(text);
                                setInputError(false); 
                              }}
                           />
             </HStack>
             
      <TouchableOpacity style={styles.button} onPress={handleConsultar} safearea>
        <Text style={styles.textButton}>Consultar</Text>
      </TouchableOpacity>
  
      </Box>
    

    )
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"space-around"
  },
  input: {
    borderWidth: 1,
    width:330,
    height:50,
    textAlign:'center',
    borderColor:'#1B9FA3',
    alignItems: 'center',
    borderRadius:20,
    marginBottom:"10%"
  },
    button: {
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: '#1B9FA3',
      padding: 20,
      width: 300,
      alignItems: 'center',
      borderRadius:20,
      marginBottom:"15%",
      elevation:7,
      marginTop:"10%"
      
    },
      title:{
        fontSize: 26,
        fontWeight:'bold',
        marginBottom:5,
    },
    textButton:{
        fontSize: 22,
        fontWeight:'bold',
        justifyContent: 'center',
        color:'white'
    },
    errorText:{
      color:'red'
    },
    icons:{
      width:"80%",
      height:50,
       justifyContent:'space-between',
       alignItems:'center',
       

    }
  });  

export default DigitCode