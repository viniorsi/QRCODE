import React from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {StyleSheet, Text, Button, Image} from "react-native";
import { NativeBaseProvider, Box, HStack } from "native-base";
import { Ionicons } from '@expo/vector-icons';

const TutorialDigitCode = () => {

    const navigation = useNavigation();

    return(
        <NativeBaseProvider>
           <Box style={styles.container}>
                <HStack paddingLeft={7} paddingBottom={7} w={"100%"}   safeArea>
                    <Ionicons
                          name="arrow-back"
                          size={32}
                          onPress={() => navigation.navigate("Home")}
                      />
                </HStack>
                <HStack flexDirection={"column"} w={"100%"} alignItems="center" justifyContent={"center"} marginBottom={"10"} safeArea> 
                        <Text style={styles.title}>Consulte no bilhete impresso o número ID QRCode</Text>  
                        <Text style={styles.subtitle}>sem  os últimos 3 dígitos</Text>         
                </HStack>    
                <HStack padding={4} height={"50%"}  w={"100%"} alignItems="center"  safeArea>
                    <Image style={styles.image} 
                        source={require('../assets/comprovante-de-venda.png')}
                    />
                </HStack>
                <HStack padding={4} w={"100%"} alignItems="center" marginTop={"10"} safeArea>
                    <TouchableOpacity
                        style={styles.button} onPress={() => navigation.navigate("DigitCode")}>
                        <View>
                           <Text style={styles.textButton}>Ok, Entendi</Text> 
                        </View>
                    </TouchableOpacity>  
                </HStack>
            </Box>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    button: {
      flex:1,  
      padding: 24,
      backgroundColor: '#1B9FA3',
      padding: 20,
      width: 330,
      alignItems: 'center',
      borderRadius: 20,
      elevation:7
    },
    image:{
        flex:1,
        alignItems: 'center',
        height:'120%',
        borderColor:'#1B9FA3',
         borderWidth:1,
    },
    title:{
        fontSize: 17,
        justifyContent: 'center'
    },
    subtitle:{
        fontSize: 16,
        fontWeight:'bold',
        justifyContent: 'center'
    },
    textButton:{
        fontSize: 22,
        fontWeight:'bold',
        justifyContent: 'center',
        color:'white'
    }
  });

export default TutorialDigitCode