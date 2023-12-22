import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Box, HStack, Pressable, VStack, Text, Icon, Button, Row } from "native-base";
import { Feather } from "@expo/vector-icons"

const Home = () => {
    const navigation = useNavigation();

    return (
        <Box flex="1" safeAreaY>
            <VStack flex={1} space="12" justifyContent={"center"} alignItems={"center"} p="4" >
                <VStack alignItems="center">
                    <Text fontSize="3xl" bold color="#1ecad3" textAlign="center">Consultar Bilhete Digital</Text>
                    <Text fontSize="2xl" bold color="#1ecad3" textAlign="center">QR Code</Text>
                </VStack>
                <VStack py={4} space="6" px="6" alignItems="center" marginTop={'20%'}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => navigation.navigate("ScanQRCode")}>

                        <Icon name="camera" color="#1ecad3" as={<Feather />} />

                        <Text>Escanear Bilhete</Text>

                        <Icon name="arrow-right" color="#1ecad3" as={<Feather />} />

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}
                        onPress={() => navigation.navigate("TutorialDigitCode")}>


                        <Icon name="command" color="#1ecad3" as={<Feather />} />

                        <Text>Digitar Código</Text>

                        <Icon name="arrow-right" color="#1ecad3" as={<Feather />} />

                    </TouchableOpacity>
                </VStack>
            </VStack>
            <Box py="6" safeAreaBottom justifyContent="center" alignItems="center">
                <Text>VERSÃO 1.0.0</Text>
            </Box>
        </Box>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        width: 300,
        borderRadius: 20,
        marginBottom: "15%",
        elevation: 7

    },
})

export default Home