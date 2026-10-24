import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigations/AuthNavigation";
import { Provider } from "react-redux";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import * as encoding from "text-encoding"; // for websocket
function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <AlertNotificationRoot>
          <NavigationContainer navigationInChildEnabled>
            <AuthNavigation />
          </NavigationContainer>
        </AlertNotificationRoot>
      </Provider>
    </GestureHandlerRootView>
  );
}
export default App;
