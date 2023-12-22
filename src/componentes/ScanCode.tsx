import React,{useState, useEffect} from "react";
import {View, Modal, StyleSheet } from 'react-native'
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Box, Center, Button, Column, Text } from "native-base";
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { BarCodeScanner } from 'expo-barcode-scanner';    

export default function(){
    const navigation = useNavigation();
    const [visivel,setVisivel] = useState(false)

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const handleBarCodeScanned = (data) => {
        console.log(data)
    } 

    const consultar = async (data) => {
    }
     
    return(
        <Box flex={1}  bg="red.500">
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <Modal 
            animationType="slide"
            visible={visivel}
            >
            <Box>
                <Text>Teste</Text>
            </Box>
            </Modal>
            <Box flex={1}  justifyContent={"center"} alignItems={"center"}>    
                   
                  {scanned && 
                    <Box flex={1} w={"55%"} justifyContent={"center"} >
                    <Button bg="#1B9FA3" onPress={() => setScanned(false)}>
                        Aperte para escanear novamente
                    </Button>
                    </Box>
                  }
            </Box>
        </Box>
    );
}