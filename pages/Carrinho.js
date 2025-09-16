import React from "react";
import { View, StyleSheet, FlatList, Image, Text, Alert } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useCart } from "../CartContext";

export default function Carrinho() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.quantidade || 1), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.desc}>{item.descricao}</Text>
              <View style={styles.qtdRow}>
                <IconButton
                  icon="minus"
                  size={20}
                  onPress={() => updateQuantity(item.id, (item.quantidade || 1) - 1)}
                  disabled={item.quantidade <= 1}
                />
                <Text style={styles.qtd}>{item.quantidade || 1}</Text>
                <IconButton
                  icon="plus"
                  size={20}
                  onPress={() => updateQuantity(item.id, (item.quantidade || 1) + 1)}
                />
                <IconButton
                  icon="delete"
                  size={20}
                  onPress={() => removeFromCart(item.id)}
                />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#001F54", textAlign: "center", marginTop: 40 }}>
            Seu carrinho está vazio.
          </Text>
        }
      />
      {cart.length > 0 && (
        <Button
          mode="contained"
          style={styles.finalizar}
          onPress={() => {
            Alert.alert("Compra finalizada!", "Obrigado pela preferência!");
            clearCart();
          }}
        >
          Finalizar Compra ({total} itens)
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F6FA", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#001F54",
    marginBottom: 15,
    textAlign: "center",
    letterSpacing: 1,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    padding: 10,
    alignItems: "center",
    elevation: 2,
  },
  imagem: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: "#001F54",
  },
  nome: {
    color: "#001F54",
    fontWeight: "bold",
    fontSize: 16,
  },
  desc: {
    color: "#001F54",
    fontSize: 13,
    opacity: 0.8,
  },
  qtdRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  qtd: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#001F54",
    marginHorizontal: 8,
  },
  finalizar: {
    backgroundColor: "#001F54",
    marginTop: 10,
    borderRadius: 10,
    elevation: 3,
  },
});