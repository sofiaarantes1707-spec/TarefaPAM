import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function Concluidas({ tarefas = [] }) {
  const concluidas = tarefas.filter((t) => t.concluida);

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.titulo}>Tarefas Concluídas ✔️</Text>

      {concluidas.length === 0 ? (
        <Text style={estilos.textoVazio}>Nenhuma tarefa concluída ainda.</Text>
      ) : (
        concluidas.map((item) => (
          <View key={item.id} style={estilos.itemContainer}>
            <Text style={estilos.itemText}>{item.titulo}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F4F6F8',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#28a745',
  },
  textoVazio: {
    fontSize: 16,
    color: '#718096',
  },
  itemContainer: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  itemText: {
    fontSize: 16,
    color: '#2D3748',
    textDecorationLine: 'line-through',
  },
});