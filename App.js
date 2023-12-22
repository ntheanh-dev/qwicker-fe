import { NavigationContainer } from '@react-navigation/native';
import { ROUTES } from './src/constants';
import OnbroadingScreen from './src/screens/OnbroadingScreen';
import AuthNavigation from './src/navigations/AuthNavigation';

function App() {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
}
export default App;
