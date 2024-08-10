import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigations/AuthNavigation";
import { Provider } from "react-redux";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AlertNotificationRoot>
          <NavigationContainer>
            <AuthNavigation />
          </NavigationContainer>
        </AlertNotificationRoot>
      </PersistGate>
    </Provider>
  );
}
export default App;
