import React, { useState, useEffect } from 'react';
import { Box, Button, HStack, Center, Heading, VStack, IconButton, View } from "native-base";
import { StyleSheet, Text } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult, PermissionStatus } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';
import { Camera, FlashMode } from 'expo-camera';
import { useNavigation, useRoute , } from "@react-navigation/native";





const ScanQRCode = () => {

  const navigation = useNavigation();
  const route = useRoute();

  const [scanned, setScanned] = useState(false);

  const [cameraFlash, setCameraFlash] = useState(false);

  const [flashMode, setFlashMode] = useState(FlashMode.off);


  const [hasStatusPermission, setHasStatusPermission] = useState(null)

  const goBack = () => {
    navigation.goBack()
  }

  const handleToggleFLash = () => {
    setCameraFlash(!cameraFlash)
  }

  const handleBarCodeScanned = (qrScanned: BarCodeScannerResult) => {
    const texto: string | null = padraoRegexData(qrScanned.data);

    function padraoRegexData(minhaString: string | undefined): string | null {
      if (minhaString && typeof minhaString === 'string') {
        const padraoRegex = /u:(\d+);/;
        const resultado = minhaString.match(padraoRegex);

        if (resultado && resultado.length === 2) {
          const numeroDesejado = resultado[1];
          return numeroDesejado;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
    navigation.navigate('ScanQRCodeResult', {
      qrCode: texto
    });
  }
      

  


  useEffect(() => {
   

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasStatusPermission(status === 'granted');
    })();
  }, []);

  if (hasStatusPermission === null) {
    return
    <View />
  }

  if (hasStatusPermission === false) {
    return
    <Center flex="1">
      <Heading size="sm">Você precisa conceder permissão</Heading>
      <Button>Concender permissão</Button>
    </Center>

  }


  // if (hasStatusPermission === PermissionStatus.DENIED) {
  //   return (
  //     <Center flex="1">
  //       <Heading size="sm">Você precisa conceder permissão</Heading>
  //       <Button>Concender permissão</Button>
  //     </Center>
  //   )
  // }
  
  return (
    <Box flex={1} justifyContent={'center'}>
      <Camera style={{ flex: 1 }}
        onBarCodeScanned={ scanned ? undefined : handleBarCodeScanned}
        // {scanned && <Button title={'Aperte para escanear novamente'} onPress={() => setScanned(false)} />}
        flashMode={flashMode}
        ratio='16:9'
      >

      </Camera>
      <Ionicons
        style={styles.back}
        name="arrow-back"
        size={32}
        onPress={goBack}
      />
      
      <Ionicons name="md-scan-outline" size={350} color="white" style={styles.icon} />
      <Text style={styles.Titulo} >Escaneie o QRCode</Text>
      <Button style={styles.button}
        onPress={() => navigation.navigate("DigitCode")}>
        <Text>Digitar Código</Text>

      </Button>

      <IconButton
                                size="lg"
                                variant="ghost"
                                onPress={() => {
                                  handleToggleFLash();
                                  setFlashMode((prevMode) =>
                                    prevMode === FlashMode.off ? FlashMode.torch : FlashMode.off
                                  );
                                }}
                                style={styles.flash}
                                borderRadius="full"
                                _icon={{
                                    as: Ionicons,
                                    name: cameraFlash ? "flash-outline" : "flash-off-outline",
                                    color: 'white'
                                }}
                            />



    </Box>
  )
}
const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -160 }, { translateY: -175 }],
  },
  Titulo: {
    fontSize: 30,
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -130 }, { translateY: -305 }],
  },
  back: {
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -175 }, { translateY: -380 }],
  },
  button: {
    backgroundColor: '#fff',
    width: 300,
    borderRadius: 20,
    marginBottom: "15%",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: 320 }],
  },
  flash:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: 110 }, { translateY: -380 }],
  }
});

export default ScanQRCode;