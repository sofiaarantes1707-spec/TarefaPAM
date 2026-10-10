import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

export default function Concluidas({ tarefas = [], escuro, setEscuro }) {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const concluidas = tarefas.filter((t) => t.concluida);

  const estilo = escuro ? estilosEscuro : estilosClaro;

  const renderItem = ({ item }) => (
    <View style={estilo.itemContainer}>
      <Text style={estilo.itemText}>{item.titulo}</Text>
    </View>
  );

  return (
    <FlatList
      data={concluidas}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={estilo.container}
      ListHeaderComponent={
        <>
          {/* MENU TEMA */}
          <View style={estilo.areaTema}>
            <TouchableOpacity
              style={estilo.botaoTemaPrincipal}
              onPress={() => setMostrarOpcoes(!mostrarOpcoes)}
            >
              <Text style={estilo.textoTemaPrincipal}>Tema</Text>
            </TouchableOpacity>

            {mostrarOpcoes && (
              <View style={estilo.caixaOpcoes}>
                <TouchableOpacity
                  style={[estilo.opcaoBotao, !escuro && estilo.opcaoAtiva]}
                  onPress={() => { setEscuro(false); setMostrarOpcoes(false); }}
                >
                  <Text style={estilo.textoOpcao}>☀️ Modo Claro</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[estilo.opcaoBotao, escuro && estilo.opcaoAtiva]}
                  onPress={() => { setEscuro(true); setMostrarOpcoes(false); }}
                >
                  <Text style={estilo.textoOpcao}>🌙 Modo Escuro</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Text style={estilo.titulo}>Tarefas Concluídas ✔️</Text>
        </>
      }
      ListEmptyComponent={
        <Text style={estilo.textoVazio}>Nenhuma tarefa concluída ainda.</Text>
      }
    />
  );
}

const estilosClaro = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F4F6F8',
  },
  areaTema: {
    alignItems: 'flex-end',
    marginBottom: 15,
    zIndex: 10,
  },
  botaoTemaPrincipal: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textoTemaPrincipal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A202C',
  },
  caixaOpcoes: {
    position: 'absolute',
    top: 48,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 6,
    width: 160,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 8,
    zIndex: 20,
  },
  opcaoBotao: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 2,
  },
  opcaoAtiva: {
    backgroundColor: '#EDF2F7',
  },
  textoOpcao: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
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

const estilosEscuro = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#121214',
  },
  areaTema: {
    alignItems: 'flex-end',
    marginBottom: 15,
    zIndex: 10,
  },
  botaoTemaPrincipal: {
    backgroundColor: '#202024',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#29292E',
  },
  textoTemaPrincipal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E1E1E6',
  },
  caixaOpcoes: {
    position: 'absolute',
    top: 48,
    right: 0,
    backgroundColor: '#202024',
    borderRadius: 14,
    padding: 6,
    width: 160,
    borderWidth: 1,
    borderColor: '#29292E',
    elevation: 8,
    zIndex: 20,
  },
  opcaoBotao: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 2,
  },
  opcaoAtiva: {
    backgroundColor: '#29292E',
  },
  textoOpcao: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E1E1E6',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00e676',
  },
  textoVazio: {
    fontSize: 16,
    color: '#A8A8B3',
  },
  itemContainer: {
    backgroundColor: '#202024',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#29292E',
  },
  itemText: {
    fontSize: 16,
    color: '#E1E1E6',
    textDecorationLine: 'line-through',
  },
});