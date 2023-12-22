import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons"
import Home from "../screens/Home";
import Doubt from "../screens/Doubt"

const Tab = createBottomTabNavigator();

export default function TabNavigator(){
    return(
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                    tabBarIcon: ({color, size}) => <Feather name="home" color={color} size={size} />,
                    tabBarLabel: 'Home',
                    headerShown:false   
                }}/>

            <Tab.Screen 
                name="Dúvidas" 
                component={Doubt} 
                options={{
                    tabBarIcon: ({color, size}) => <Feather name="help-circle" color={color} size={size} />,
                    tabBarLabel: 'Dúvidas',
                    headerShown:false
                }}/>
        </Tab.Navigator>
    )
}