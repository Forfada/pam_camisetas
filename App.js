import * as React from "react";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import AdicionarProduto from "./pages/AdicionarProduto";
import Contato from "./pages/Contato";
import ViewProduto from "./pages/ViewProduto";
import Carrinho from "./pages/Carrinho";
import { CartProvider } from "./CartContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000", borderTopColor: "#001F54" },
        tabBarActiveTintColor: "#5f8ee0ff",
        tabBarInactiveTintColor: "#ffffffff",
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 13 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "soccer-field";
          else if (route.name === "Produtos") iconName = "tshirt-crew";
          else if (route.name === "Contato") iconName = "account-box";
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Produtos" component={Produtos} />
      <Tab.Screen name="Contato" component={Contato} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              options={{
                header: () => (
                  <Appbar.Header style={{ backgroundColor: "#001F54" }}>
                    <Appbar.Content
                      title="FERRA Camisas"
                      titleStyle={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 22,
                        letterSpacing: 1,
                      }}
                    />
                  </Appbar.Header>
                ),
              }}
            />
            <Stack.Screen
              name="AdicionarProduto"
              component={AdicionarProduto}
              options={{
                headerStyle: { backgroundColor: "#001F54" },
                headerTintColor: "#fff",
                title: "Adicionar Camiseta",
              }}
            />
            <Stack.Screen
              name="ViewProduto"
              component={ViewProduto}
              options={{
                headerStyle: { backgroundColor: "#001F54" },
                headerTintColor: "#fff",
                title: "Detalhes da Camiseta",
              }}
            />
            <Stack.Screen
              name="Carrinho"
              component={Carrinho}
              options={{
                headerStyle: { backgroundColor: "#001F54" },
                headerTintColor: "#fff",
                title: "Carrinho",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </PaperProvider>
  );
}
