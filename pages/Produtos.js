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
    {
      id: "4",
      nome: "Camiseta Corinthians 23/24",
      imagem: "..assets/camisas/psg.jpg",
    },
    {
      id: "5",
      nome: "Camiseta PSV 23/24",
      imagem: "..assets/camisas/psg.jpg",
    },
    {
      id: "6",
      nome: "Camiseta Ajax 23/24",
      imagem: "..assets/camisas/psg.jpg",
    },
    {
      id: "7",
      nome: "Camiseta Milan 23/24",
      imagem: "..assets/camisas/psg.jpg",
    },
    {
      id: "8",
      nome: "Camiseta Mirassol 23/24",
      imagem: "..assets/camisas/psg.jpg",
    },
    {
      id: "9",
      nome: "Camiseta São Paulo 23/24",
      imagem: "..assets/camisas/psg.jpg",
    },
    {
      id: "10",
      nome: "Camiseta Santos 23/24",
      imagem: "..assets/camisas/psg.jpg",
    },
    {
      id: "11",
      nome: "Camiseta Al Hilal 23/24",
      imagem: "..assets/camisas/psg.jpg",
    },
  ]);

  const itensPorPagina = 4;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(produtos.length / itensPorPagina);
  const produtosPaginados = produtos.slice(
    (page - 1) * itensPorPagina,
    page * itensPorPagina
  );

  const excluirProduto = (id) => {
    setProdutos(produtos.filter((p) => p.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camisetas de Times</Text>
      <FlatList
        data={produtosPaginados}
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
        contentContainerStyle={{ paddingBottom: 20}}
        ListFooterComponent={
          totalPages > 1 && (
            <View style={[styles.paginationContainer, { marginHorizontal: 0, paddingHorizontal: 10 }]}>
              <Button
                mode="contained"
                onPress={() => setPage(page - 1)}
                disabled={page === 1}
                style={[
                  styles.paginationButton,
                  page === 1 && styles.paginationButtonDisabled,
                ]}
                labelStyle={styles.paginationLabel}
                icon="chevron-left"
              >
                Anterior
              </Button>
              <Text style={styles.paginationText}>
                {page} de {totalPages}
              </Text>
              <Button
                mode="contained"
                onPress={() => setPage(page + 1)}
                disabled={page === totalPages}
                style={[
                  styles.paginationButton,
                  page === totalPages && styles.paginationButtonDisabled,
                ]}
                labelStyle={styles.paginationLabel}
                icon="chevron-right"
                contentStyle={{ flexDirection: "row-reverse" }}
              >
                Próxima
              </Button>
            </View>
          )
        }
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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
    width: "100%",
  },
  paginationButton: {
    backgroundColor: "#001F54",
    borderRadius: 8,
    minWidth: 90, // diminui para caber melhor
    marginHorizontal: 0,
    elevation: 2,
  },
  paginationButtonDisabled: {
    backgroundColor: "#B0B8C1",
  },
  paginationLabel: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  paginationText: {
    color: "#001F54",
    fontWeight: "bold",
    fontSize: 15,
    marginHorizontal: 10,
  },
});
