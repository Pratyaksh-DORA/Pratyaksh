import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FormDataProvider } from './src/redux/FormDataContext';
import Login from './src/screens/Login';
import Form from './src/components/Form';
import TagImage from './src/components/TagImage';
import MarkedPoints from './src/components/MarkedPoints';
import ImageCapture from './src/components/ImageCapture';
import MaterialsForm from './src/components/MaterialsForm';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <FormDataProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Form" component={Form} />
          <Stack.Screen name="TagImage" component={TagImage} />
          <Stack.Screen name="MarkedPoints" component={MarkedPoints} />
          <Stack.Screen name="ImageCapture" component={ImageCapture} />
          <Stack.Screen name="MaterialsForm" component={MaterialsForm} />
        </Stack.Navigator>
      </FormDataProvider>
    </NavigationContainer>
  );
}