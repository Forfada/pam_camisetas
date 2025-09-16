import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Alert } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { listarProdutos, excluirProduto, seedProdutosPadrao } from "../Portland/DB";

export default function Produtos({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const itensPorPagina = 4;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(produtos.length / itensPorPagina);
  const produtosPaginados = produtos.slice(
    (page - 1) * itensPorPagina,
    page * itensPorPagina
  );

  // Seed só na primeira montagem
  useEffect(() => {
    async function inicializar() {
      await seedProdutosPadrao();
      await carregarProdutos();
    }
    inicializar();
    // Listener de foco só recarrega produtos, não roda seed
    const unsubscribe = navigation.addListener("focus", carregarProdutos);
    return unsubscribe;
  }, [navigation]);

  async function carregarProdutos() {
    setLoading(true);
    const lista = await listarProdutos();
    setProdutos(lista);
    setLoading(false);
  }

  const handleExcluirProduto = (id) => {
    Alert.alert(
      "Excluir",
      "Tem certeza que deseja excluir esta camiseta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await excluirProduto(id);
            carregarProdutos();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camisetas de Times</Text>
      <FlatList
        data={produtosPaginados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => navigation.navigate("ViewProduto", { id: item.id })}
          >
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
                        editar: item,
                      })
                    }
                  />
                  <IconButton
                    icon="delete"
                    iconColor="#001F54"
                    containerColor="#fff"
                    onPress={() => handleExcluirProduto(item.id)}
                  />
                </View>
              )}
            />
          </Card>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
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
        refreshing={loading}
        onRefresh={carregarProdutos}
      />

      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("AdicionarProduto", {})
        }
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
    height: 220, // Mais quadrado
    resizeMode: "cover",
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
    minWidth: 90,
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
