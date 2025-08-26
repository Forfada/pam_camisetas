import React, { useState } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";

export default function Produtos({ navigation }) {
  const [produtos, setProdutos] = useState([
    {
      id: "1",
      nome: "Camiseta Real Madrid 23/24",
      imagem: "https://i.ibb.co/3y7n6kz/realmadrid.png",
    },
    {
      id: "2",
      nome: "Camiseta Flamengo 23/24",
      imagem: "https://i.ibb.co/6w0k6nV/flamengo.png",
    },
    {
      id: "3",
      nome: "Camiseta PSG 23/24",
      imagem: "..assets/camisas/psg.jpg",
    },
  ]);

  const excluirProduto = (id) => {
    setProdutos(produtos.filter((p) => p.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camisetas de Times</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <Card.Title
              title={item.nome}
              titleStyle={{ color: "#fff", fontWeight: "bold" }}
              right={() => (
                <View style={{ flexDirection: "row" }}>
                  <IconButton
                    icon="pencil"
                    iconColor="#fff"
                    containerColor="#001F54"
                    onPress={() =>
                      navigation.navigate("AdicionarProduto", {
                        produtos,
                        setProdutos,
                        editar: item,
                      })
                    }
                  />
                  <IconButton
                    icon="delete"
                    iconColor="#001F54"
                    containerColor="#fff"
                    onPress={() => excluirProduto(item.id)}
                  />
                </View>
              )}
            />
          </Card>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate("AdicionarProduto", { produtos, setProdutos })}
        style={styles.button}
        labelStyle={{ color: "#fff", fontWeight: "bold" }}
        icon="plus"
      >
        Adicionar Camiseta
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FA",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#001F54",
    marginBottom: 15,
    textAlign: "center",
    letterSpacing: 1,
  },
  card: {
    marginBottom: 15,
    backgroundColor: "#111827",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
  },
  imagem: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    backgroundColor: "#001F54",
  },
  button: {
    backgroundColor: "#001F54",
    marginTop: 10,
    borderRadius: 10,
    elevation: 3,
  },
});
