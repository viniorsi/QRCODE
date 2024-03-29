import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, Center, Text, useToast, Button } from "native-base";
import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
// import { api } from '../services/api';

interface Objeto {
    qrcodeId: String,
    status: String,
    message: String,
    qrcodestation: String,
    qrcodeline: String,
    qrcodedateuse: any,
    qrcodedateusestr: any,
    statusdesc: String,
    valor: Double,
    station_buy: String,
    data_de_emissao: any,
    qrcodedatecancellationstr : any
    reimpresso : any
}





const ScanQRCodeResult = () => {
    const toast = useToast()
    const navigation = useNavigation();
    const { params } = useRoute()
    // const [qrInfo, setQrInfo] = useState<ItemType | null>(null);
    const [cd, setObjeto] = useState<Objeto | null>(null);
    const qrcode = params?.qrCode as string
  

    const goBack = () => {
        navigation.goBack()
    }


    const consultar = useCallback(async (qrcode: string) => {
        
        try {
            
            // local
            //   const response = await axios.get(`http://192.168.88.64:9092/tickets/qrcodeid/${qrcode}`);
              
            // hml
            // const response = await axios.get(`https://arquiteturaadmin-prd.autopasscorp.com/consulta-ticket-metro/tickets/qrcodeid/${qrcode}`);
            // prd
             const response = await axios.get(`https://arquiteturaadmin-prd.autopasscorp.com/consulta-ticket-metro/tickets/qrcodeid/${qrcode}`);
            // Extrai os dados da resposta da API
            console.log('render')
            setObjeto(response.data)
            console.log(response.data)


        } catch (error) {
            console.error('Erro na chamada HTTP:', error);
            throw error;
        }


    }, []);

        

    function formateDate(date: any): string {
        let dateFormat: string = '';
        try {
          //formata a data e atribui para a variavel
          dateFormat = format(new Date(date), 'dd/MM/yyyy HH:mm');
        }
        catch {
          dateFormat = date;
        }
        return dateFormat;
      }


    useEffect(() => {

        if (qrcode) {
            consultar(qrcode);
        }


    }, [qrcode, consultar]);

   
  
     
    return (
        <Box flex={1}>
            <Center flex="1">
                {cd?.status === 'AVAILABLE' && (
                    <Box borderRadius={10} h={"80%"} w={"80%"} shadow={"7"} backgroundColor={'gray.200'}  >
                        <Box flex={1} borderRadius={10} padding={5} backgroundColor={'gray.300'} alignItems={"center"} justifyContent={'space-around'}>
                            <AntDesign name="checkcircleo" size={40} color="green" />
                            <Text marginBottom={"5%"} fontSize={26} fontWeight={'bold'}>Bilhete Ativo</Text>
                            <Box alignItems={"center"}>
                                <Text  >Id QRCode</Text>
                                <Text fontSize={17} fontWeight={'bold'}>{cd.qrcodeId}</Text>
                            </Box>

                            <Box alignItems={"center"}>
                                <Text  >Valor</Text>
                                <Text fontSize={17} fontWeight={'bold'} >{"R$ "+(cd.valor/100).toFixed(2).replace('.',',')}</Text>
                                {/* <Text fontSize={17} fontWeight={'bold'}>4,40</Text> */}
                            </Box>

                            <Box alignItems={"center"}>
                                <Text  >Local Da Compra</Text>
                                <Text fontSize={17} fontWeight={'bold'}>{cd.station_buy}</Text>
                                {/* <Text fontSize={17} fontWeight={'bold'}>App</Text> */}
                            </Box>

                            <Box alignItems={"center"}>
                                <Text  >Data Da Compra</Text>
                                
                                <Text fontSize={17} fontWeight={'bold'} >{formateDate(cd.data_de_emissao)}</Text>
                               
                            </Box>
                            {cd.reimpresso === 'IMPRESSO' && (
                                                            <Box alignItems={"center"}>
                                                            <Text  fontSize={17} fontWeight={'bold'} >IMPRESSO</Text>
                                                        </Box>
                             )}
                            {cd.reimpresso != "IMPRESSO" && (
                                 <Box alignItems={"center"}>
                                <Text fontSize={17} fontWeight={'bold'} >REIMPRESSO</Text>
                            </Box>
                            )}
                           

                            <Button
                                height={"7%"}
                                width={"70%"}
                                backgroundColor={"#1ecad3"}
                                // size="20%"
                                borderRadius="lg"
                                onPress={goBack}
                                marginTop={"20%"}
                                marginBottom={"10%"}
                                shadow={7}
                            >Fechar</Button>
                        </Box>
                    </Box>
                )}
                {cd?.status === 'USED' && (
                    <Box borderRadius={10} h={"80%"} w={"80%"} shadow={"7"} backgroundColor={'gray.200'}  >
                        <Box flex={1} borderRadius={10} padding={5} backgroundColor={'gray.300'} alignItems={"center"} justifyContent={'space-around'}>
                            <AntDesign name="closecircleo" size={40} color="red" />
                            <Text marginBottom={"5%"} fontSize={26} fontWeight={'bold'} >QRCode Utilizado</Text>
                            <Box alignItems={"center"}>
                                <Text  >Id QRCode</Text>
                                <Text fontSize={17} fontWeight={'bold'}>{cd.qrcodeId}</Text>
                            </Box>

                            <Box alignItems={"center"}>
                                <Text  >Valor</Text>
                                <Text fontSize={17} fontWeight={'bold'} >{"R$ "+(cd.valor/100).toFixed(2).replace('.',',')}</Text>
                            
                            </Box>

                            <Box alignItems={"center"}>
                                <Text  >Local Da Compra</Text>
                                <Text fontSize={17} fontWeight={'bold'} >{cd.station_buy}</Text>
                        
                            </Box>

                            <Box alignItems={"center"}>
                                <Text  >Data Da Compra</Text>
                                <Text fontSize={17} fontWeight={'bold'} >{formateDate(cd.data_de_emissao)}</Text>
                                
                            </Box>

                            <Box alignItems={"center"}>
                                <Text >Estação de uso</Text>
                                <Text fontSize={17} fontWeight={'bold'} >{cd.qrcodestation}</Text>
                            </Box>

                            <Box alignItems={"center"}>
                                <Text  >Linha de uso</Text>
                                <Text fontSize={17} fontWeight={'bold'}>{cd.qrcodeline}</Text>
                            </Box>

                            <Box alignItems={"center"}>
                                <Text  >Data de uso</Text>
                                <Text fontSize={17} fontWeight={'bold'} >{formateDate(cd.qrcodedateusestr)}</Text>
                            </Box>
                            {cd.reimpresso === 'IMPRESSO' && (
                                                            <Box alignItems={"center"}>
                                                            <Text  fontSize={17} fontWeight={'bold'} >IMPRESSO</Text>
                                                        </Box>
                             )}
                            {cd.reimpresso != 'IMPRESSO' && (
                                 <Box alignItems={"center"}>
                                <Text fontSize={17} fontWeight={'bold'} >REIMPRESSO</Text>
                            </Box>
                            )}
                            <Button
                                height={"7%"}
                                width={"70%"}
                                backgroundColor={"#1ecad3"}
                                // size="20%"
                                borderRadius="lg"
                                onPress={goBack}
                                marginTop={"10%"}
                                shadow={7}
                            >Fechar</Button>
                        </Box>
                    </Box>
                )}
                {cd?.status === 'PENDING' && (
                    <Box borderRadius={10} h={"80%"} w={"80%"} shadow={"7"} backgroundColor={'gray.200'}  >
                        <Box flex={1} borderRadius={10} padding={5} backgroundColor={'gray.300'} alignItems={"center"} justifyContent={'space-around'}>
                            <AntDesign name="closecircleo" size={40} color="red" />
                            <Text marginBottom={"5%"} fontSize={26} fontWeight={'bold'} >QRCode pendente</Text>
                            <Box alignItems={"center"}>
                                <Text  >Id QRCode</Text>
                                <Text fontSize={17} fontWeight={'bold'}>{cd.qrcodeId}</Text>
                            </Box>

                            <Box alignItems={"center"}>
                                <Text  >Valor</Text>
                                <Text fontSize={17} fontWeight={'bold'} >{"R$ "+(cd.valor/100).toFixed(2).replace('.',',')}</Text>
                                {/* <Text fontSize={17} fontWeight={'bold'}>4,40</Text> */}
                            </Box>

                            <Box alignItems={"center"}>
                                <Text  >Data Da Compra</Text>
                                <Text fontSize={17} fontWeight={'bold'} >{formateDate(cd.data_de_emissao)}</Text>
                               
                            </Box>

                            <Button
                                height={"7%"}
                                width={"70%"}
                                backgroundColor={"#1ecad3"}
                                // size="20%"
                                borderRadius="lg"
                                onPress={goBack}
                                marginTop={"10%"}
                                shadow={7}
                            >Fechar</Button>
                        </Box>
                    </Box>
                )}
                {cd?.status === 'CANCELED' && (
                    <Box borderRadius={10} h={"80%"} w={"80%"} shadow={"7"} backgroundColor={'gray.200'}  >
                        <Box flex={1} borderRadius={10} padding={5} backgroundColor={'gray.300'} alignItems={"center"} justifyContent={'space-around'}>
                            <AntDesign name="closecircleo" size={40} color="red" />
                            <Text marginBottom={"5%"} fontSize={26} fontWeight={'bold'} >QRCode Cancelado</Text>
                            <Box alignItems={"center"}>
                                <Text  >Id QRCode</Text>
                                <Text fontSize={17} fontWeight={'bold'}>{cd.qrcodeId}</Text>
                            </Box>

                            <Box alignItems={"center"}>
                                <Text  >Valor</Text>
                                <Text fontSize={17} fontWeight={'bold'} >{"R$ "+(cd.valor/100).toFixed(2).replace('.',',')}</Text>
                                {/* <Text fontSize={17} fontWeight={'bold'}>4,40</Text> */}
                            </Box>

                            <Box alignItems={"center"}>
                                <Text  >Data Da Compra</Text>
                                {/* <Text  >{cd.data_de_emissao}</Text> */}
                                <Text fontSize={17} fontWeight={'bold'} >{formateDate(cd.qrcodedateusestr)}</Text>
                            </Box>

                            <Box alignItems={"center"}>
                                <Text  >Data de cancelamento</Text>
                                {/* <Text  >{cd.data_de_emissao}</Text> */}
                                <Text fontSize={17} fontWeight={'bold'} >{formateDate(cd.qrcodedatecancellationstr)}</Text>
                            </Box>

                            <Button
                                height={"7%"}
                                width={"70%"}
                                backgroundColor={"#1ecad3"}
                                // size="20%"
                                borderRadius="lg"
                                onPress={goBack}
                                marginTop={"10%"}
                                shadow={7}
                            >Fechar</Button>
                        </Box>
                    </Box>
                )}
                {cd === null && (
                    <Box borderRadius={10} h={"80%"} w={"80%"} shadow={"7"} backgroundColor={'gray.200'}  >
                        <Box flex={1} borderRadius={10} padding={5} backgroundColor={'gray.300'} alignItems={"center"} justifyContent={'space-around'}>
                            <Box alignItems={"center"} >
                                <Text marginBottom={"5%"} fontSize={26} fontWeight={'bold'}  >Nenhum valor inserido</Text>
                                <Text fontSize={17} fontWeight={'bold'} >Por favor insira um Valor</Text>
                            </Box>
                            <Button
                                height={"7%"}
                                width={"70%"}
                                backgroundColor={"#1ecad3"}
                                // size="20%"
                                borderRadius="lg"
                                onPress={goBack}
                                marginTop={"10%"}
                                shadow={7}
                            >Fechar</Button>
                        </Box>
                    </Box>

                )}
                {cd?.status === "NOT_FOUND" && (
                    <Box borderRadius={10} h={"50%"} w={"80%"} shadow={"7"} backgroundColor={'gray.200'}  >
                        <Box flex={1} borderRadius={10} padding={5} backgroundColor={'gray.300'} alignItems={"center"}>
                            <Box alignItems={"center"} marginTop={"30%"} >
                                <AntDesign name="closecircleo" size={40} color="red" marginBottom={"5%"} />
                                <Text marginBottom={"5%"} fontSize={26} fontWeight={'bold'}  >QRCode não encontrado</Text>
                                <Text  >QRCode id:</Text>
                                <Text fontSize={17} fontWeight={'bold'}>{qrcode}</Text>
                            </Box>
                            <Button
                                height={"15%"}
                                width={"70%"}
                                backgroundColor={"#1ecad3"}
                                borderRadius="lg"
                                onPress={goBack}
                                marginTop={"10%"}
                                shadow={7}
                            >Fechar</Button>
                        </Box>
                    </Box>
                )}


            </Center>
            <StatusBar style="light" />
        </Box>
    )
}

export default ScanQRCodeResult;