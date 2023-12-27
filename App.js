import { NavigationContainer } from '@react-navigation/native';
import { ROUTES } from './src/constants';
import OnbroadingScreen from './src/screens/OnbroadingScreen';
import AuthNavigation from './src/navigations/AuthNavigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    </Provider>
  );
}
export default App;
