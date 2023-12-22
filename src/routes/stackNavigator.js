import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import DigitCode from '../screens/DigitCode'
import TutorialDigitCode from '../screens/TutorialDigitCode'
import ScanQRCode from '../screens/ScanQRCode'
import ScanQRCodeResult from '../screens/ScanQRCodeResult';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return(
       <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Group>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ScanQRCode" component={ScanQRCode} />
                <Stack.Screen name="ScanQRCodeResult" component={ScanQRCodeResult} />
                <Stack.Screen name="TutorialDigitCode" component={TutorialDigitCode} />
                <Stack.Screen name="DigitCode" component={DigitCode}
                 options={{
                    title: 'My home' }}
            
                />
            </Stack.Group>
       </Stack.Navigator>
    )
}

export default StackNavigator;