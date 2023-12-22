import React,{useState} from "react";
import {View,Text,Button, Modal,TextInput, StyleSheet,TouchableOpacity,Alert} from 'react-native'
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Center, Column } from "native-base";
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 


export default function() {

    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    const navigation = useNavigation();

    const [qrcodeId, setQrcodeId] = useState('');
    const [modalContent, setModalContent] = useState(null)

    const baseURL = 'http://localhost:9092/tickets/qrcodeid';

    const getAPI = () => {
        axios({
            method:"GET",
            url:`${baseURL}`
        }).then(res => console.log(res)).catch(err => console.log(err))
    }


    const consultar = async () => {
        setVisivel(true)

        try {

          if(qrcodeId === null || qrcodeId === ''){
            return(
              setModalContent(
              <View style={styles.card}>
                <View  marginBottom={"50%"} flexDirection={"column"} alignItems={"center"}>
                  <Text style={styles.title} >Nenhum valor inserido</Text>
                  <Text style={styles.subtitle} >Por favor insira um Valor</Text>
                </View>
                
                <TouchableOpacity
                style={styles.button }
                title="Fechar"
                onPress={()=>{setVisivel(false)}}
                safearea
                >
                    <Text>Fechar</Text>
                </TouchableOpacity>
                
                </View>)
            )
          }
          // https://arquiteturaadmin-prd.autopasscorp.com/consulta-ticket-metro/tickets/qrcodeid/${qrcodeId}
          const response = await axios.get(`http:/192.168.88.123/:9092/tickets/qrcodeid/${qrcodeId}`);
          
          // Extrai os dados da resposta da API
          const { status, message, qrcodestation, qrcodeline, qrcodedateuse, qrcodedateusestr, statusdesc, valor, station_buy, data_de_emissao } = response.data;
          
          // Objeto com os atributos
          const objeto = {
            qrcodeId: qrcodeId,
            status: status,
            message: message,
            qrcodestation: qrcodestation,
            qrcodeline: qrcodeline,
            qrcodedateuse: qrcodedateuse,
            qrcodedateusestr: qrcodedateusestr,
            statusdesc: statusdesc,
            valor: valor,
            station_buy: station_buy,
            data_de_emissao: data_de_emissao
          };
    
          showAlert(objeto);
        } catch (error) {
          console.error('Erro na chamada HTTP:', error);
          throw error;
        }
    }
    const showAlert = (objeto) => {
       
        const { qrcodeId, status, message, qrcodestation, qrcodeline, qrcodedateuse, qrcodedateusestr , statusdesc, valor, station_buy, data_de_emissao} = objeto;

        if(status === 'NOT_FOUND' && message === 'Bilhete não encontrado!'){
          setModalContent(
          <View style={styles.card}>
            <View alignItems={"center"}>
              <AntDesign name="closecircleo" size={40} color="red" marginBottom={"5%"} />
              <Text style={styles.title} >QRCode Invalido</Text>
            </View>
            
            <View style={styles.Viewsubtitle}>
              <View alignItems={"center"}>
              <Text  >QRCode id:</Text>
              <Text style={styles.subtitle} >{qrcodeId}</Text>
              </View>
               <Text style={styles.subtitle} fontSize={30}>{message}</Text>
            </View>
            
            
            <TouchableOpacity 
                style={styles.button}
                title="Fechar"
                onPress={()=>{setVisivel(false)}}
                safearea
                >
                    <Text>Fechar</Text>
                </TouchableOpacity>
            </View>
            )
        }

          
        if(status === 'USED' ){
          setModalContent(
            <View style={styles.card}>
              <AntDesign name="closecircleo" size={40} color="red" marginBottom={"5%"} />
              <Text style={styles.title} marginBottom={"5%"}>QRCode Utilizado</Text>
              <View style={styles.Viewsubtitle}>
                <View alignItems={"center"}>
                <Text  >Id QRCode</Text>
                <Text style={styles.subtitle} >{qrcodeId}</Text>
                </View>
                 <View alignItems={"center"}>
                <Text  >Id Transação</Text>
                <Text style={styles.subtitle} >{qrcodeId}</Text>
                </View> 
                <View alignItems={"center"}>
                <Text  >Valor</Text>
                <Text style={styles.subtitle} >{valor}</Text>
                </View> 
                <View alignItems={"center"}>
                <Text  >Local Da Compra</Text>
                <Text style={styles.subtitle} >{station_buy}</Text>
                </View> 
                <View alignItems={"center"}>
                <Text  >Data Da Compra</Text>
                <Text style={styles.subtitle} >{data_de_emissao}</Text>
                </View> 
                <View alignItems={"center"}>
                <Text >Estação</Text>
                <Text style={styles.subtitle} >{qrcodestation}</Text>
                </View> 
                <View alignItems={"center"}>
                <Text  >Linha</Text>
                <Text style={styles.subtitle} >{qrcodeline}</Text>
                </View> 
                <View alignItems={"center"}>
                <Text  >Data de uso</Text>
                <Text style={styles.subtitle} >{qrcodedateusestr}</Text>
                </View> 

                 
              </View>
              
              <TouchableOpacity 
                  style={styles.button}
                  title="Fechar"
                  onPress={()=>{setVisivel(false)}}
                  safearea
                  >
                      <Text>Fechar</Text>
                  </TouchableOpacity>
              </View>
              )
        }

      
        if(status === 'AVAILABLE'){
          setModalContent(
            <View style={styles.card}>
              <View alignItems={"center"}>
                 <AntDesign name="checkcircleo" size={40} color="green" marginBottom={"5%"}/>
              <Text style={styles.title} marginBottom={"5%"}>Bilhete não utilizado</Text>
              </View>
             
                 <View style={styles.Viewsubtitle}>
                      <View alignItems={"center"}>
                      <Text  >Id QRCode</Text>
                      <Text style={styles.subtitle} >{qrcodeId}</Text>
                      </View>
                      <View alignItems={"center"}>
                      <Text  >Id Transação</Text>
                      <Text style={styles.subtitle} >{qrcodeId}</Text>
                      </View> 
                      <View alignItems={"center"}>
                      <Text  >Valor</Text>
                      <Text style={styles.subtitle} >R$ 4,40</Text>
                      </View> 
                      <View alignItems={"center"}>
                      <Text  >Local Da Compra</Text>
                      <Text style={styles.subtitle} >APP</Text>
                      </View> 
                      <View alignItems={"center"}>
                      <Text  >Data Da Compra</Text>
                      <Text style={styles.subtitle} >{qrcodedateusestr}</Text>
                      </View> 
                  </View>
              
              <TouchableOpacity 
                  style={styles.button}
                  title="Fechar"
                  onPress={()=>{setVisivel(false)}}
                  safearea
                  >
                      <Text>Fechar</Text>
                  </TouchableOpacity>
              </View>
              )
        }

        
        if(status === 'CANCELED'){
          setModalContent(
            <View style={styles.card}>
              <View alignItems={"center"}>
                 <AntDesign name="closecircleo" size={40} color="red" marginBottom={"5%"}/>
              <Text style={styles.title} marginBottom={"5%"}>Bilhete cancelado</Text>
              </View>
             
              <View style={styles.Viewsubtitle}>
                <View alignItems={"center"}>
                <Text  >Id QRCode</Text>
                <Text style={styles.subtitle} >{qrcodeId}</Text>
                </View>
                 <View alignItems={"center"}>
                <Text  >Id Transação</Text>
                <Text style={styles.subtitle} >{qrcodeId}</Text>
                </View> 
                <View alignItems={"center"}>
                <Text  >Valor</Text>
                <Text style={styles.subtitle} >R$ 4,40</Text>
                </View> 
                <View alignItems={"center"}>
                <Text  >Data Da Compra</Text>
                <Text style={styles.subtitle} >{qrcodedateusestr}</Text>
                </View> 
              </View>
              
              <TouchableOpacity 
                  style={styles.button}
                  title="Fechar"
                  onPress={()=>{setVisivel(false)}}
                  safearea
                  >
                      <Text>Fechar</Text>
                  </TouchableOpacity>
              </View>
              )
        }

        
        if(status === 'PENDING'){
          setModalContent(
            <View style={styles.card}>
              <View alignItems={"center"}>
                 <MaterialIcons name="pending" size={40} color="#1B9FA3" marginBottom={"5%"}/>
              <Text style={styles.title} marginBottom={"5%"}>Bilhete Pendente</Text>
              </View>
             
              <View style={styles.Viewsubtitle}>
                <View alignItems={"center"}>
                <Text  >Id QRCode</Text>
                <Text style={styles.subtitle} >{qrcodeId}</Text>
                </View>
                 <View alignItems={"center"}>
                <Text  >Id Transação</Text>
                <Text style={styles.subtitle} >{qrcodeId}</Text>
                </View> 
                <View alignItems={"center"}>
                <Text  >Valor</Text>
                <Text style={styles.subtitle} >R$ 4,40</Text>
                </View> 
                <View alignItems={"center"}>
                <Text  >Data Da Compra</Text>
                <Text style={styles.subtitle} >{qrcodedateusestr}</Text>
                </View> 
              </View>
              
              <TouchableOpacity 
                  style={styles.button}
                  title="Fechar"
                  onPress={()=>{setVisivel(false)}}
                  safearea
                  >
                      <Text>Fechar</Text>
                  </TouchableOpacity>
              </View>
              )
        }
      };

    const [visivel,setVisivel] = useState(false)

    return(
     
      
        <View style={styles.tela}>
        
            <Modal 
            animationType="slide"
            visible={visivel}
            >
              {modalContent}
            </Modal> 
            <View>
             
            <TextInput safearea
                              keyboardType='numeric'
                              style={styles.input}
                              placeholder="Digite o QRCode ID"
                              value={qrcodeId}
                              onChangeText={setQrcodeId}
                          />
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>{consultar(qrcodeId)}} safearea>
              <Text style={styles.textButton}>Consultar</Text>
            </TouchableOpacity>
            
        </View>
    );

    }

    const styles = StyleSheet.create({
      button: {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#1B9FA3',
        padding: 20,
        width: 300,
        alignItems: 'center',
        borderRadius:20,
        marginBottom:"7%",
        
      },
      textButton:{
        fontSize: 22,
        fontWeight:'bold',
        justifyContent: 'center',
        color:'white'
    },
    tela:{
      height:"70%",
      flexDirection:'column',
      alignItems:'center'
    },
    input: {
      borderWidth: 1,
      width:330,
      height:50,
      textAlign:'center',
      borderColor:'#1B9FA3',
      alignItems: 'center',
      borderRadius:20,
      marginTop:"30%",
      marginBottom:"40%"

    },
    title:{
      fontSize: 26,
      fontWeight:'bold',
      marginBottom:5,
  },
    card:{
     backgroundColor:"#dcdcdc",
     height:"80%",
     margin:40,
     marginTop:"20%",
     padding:20,
     borderRadius:20,
     elevation:10,
     justifyContent:'space-around',
     alignItems:'center',
    },
  Viewsubtitle:{
    marginBottom:"5%",
    alignItems:"center",
},

  subtitle:{
    fontSize: 17,
    fontWeight:'bold',
    marginBottom:"5%"
},
   

    });

