import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import ProductosSection from "../../screens/ProductosSection";

export type MainStackParamList = {
  dashboard: undefined;
  ProductosSection: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="dashboard"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProductosSection"
        component={ProductosSection}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}
