import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./tabNavigator";
import StackNavigator from "./stackNavigator";

export default function Routes(){
    return(
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )
}