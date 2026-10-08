import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Pressable, FlatList } from 'react-native';

function Home() {

  const [tituloT, setTituloT] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [escuro, setEscuro] = useState(false);

  const AdicionaTarefa = () => {

    if (tituloT.trim() === '') {
      return;
    }

    const novaTarefa = {
      id: String(new Date().getTime()),
      titulo: tituloT,
    };

    setTarefas([...tarefas, novaTarefa]);
    setTituloT('');
  };


  const ExcluirTarefa = (index) => {
    let novaLista = [...tarefas];
    novaLista.splice(index, 1);
    setTarefas(novaLista);
  };

  let estilo = escuro ? estilosEscuro : estilosClaro;

  return (

    <ScrollView contentContainerStyle={estilo.container}>

      <Pressable
        style={estilo.botaoTema}
        onPress={() => setEscuro(!escuro)}
      >
        <Text style={estilo.textoTema}>
          {escuro ? '☀️' : '🌙'}
        </Text>
      </Pressable>

      <View style={estilo.headerContainer}>

        <Text style={estilo.Titulo}>
          TO DO LIST
        </Text>

      </View>

      <View style={estilo.formContainer}>

        <Text style={estilo.label}>
          Digite a tarefa que você deseja adicionar à sua To Do List:
        </Text>

        <TextInput
          style={estilo.input}
          placeholder="Digite aqui..."
          placeholderTextColor={escuro ? '#aaa' : '#666'}
          value={tituloT}
          onChangeText={(texto) => setTituloT(texto)}
        />

        <Pressable
          style={estilo.BtnAdicionar}
          onPress={AdicionaTarefa}
        >
          <Text style={estilo.btnText}>
            Clique aqui para adicionar a sua tarefa
          </Text>
        </Pressable>

      </View>

      <FlatList
        data={tarefas}

        keyExtractor={(item) => item.id}

        renderItem={({ item, index }) => (

          <View style={estilo.itemContainer}>

            <Text style={estilo.itemText}>
              {item.titulo}
            </Text>

            <Pressable
              style={estilo.BtnExcluir}
              onPress={() => ExcluirTarefa(index)}
            >
              <Text style={estilo.btnText}>
                Excluir
              </Text>
            </Pressable>

          </View>

        )}

        style={estilo.lista}
        scrollEnabled={false}
      />

    </ScrollView>
  );
}

export default Home;

const estilosClaro = StyleSheet.create({

  container: {
    flexGrow: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },

  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  Titulo: {
    backgroundColor: 'lightblue',
    borderRadius: 4,
    padding: 8,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },

  formContainer: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    color: '#333',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },

  BtnAdicionar: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  lista: {
    marginTop: 10,
  },

  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },

  itemText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },

  BtnExcluir: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },

  botaoTema: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#dddddd',
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
  },

  textoTema: {
    fontSize: 20,
  },

});

const estilosEscuro = StyleSheet.create({

  container: {
    flexGrow: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#121212',
  },

  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  Titulo: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 4,
    padding: 8,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },

  formContainer: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    color: '#fff',
  },

  input: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#1e1e1e',
    color: '#fff',
  },

  BtnAdicionar: {
    backgroundColor: '#2e7d32',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  lista: {
    marginTop: 10,
  },

  itemContainer: {
    backgroundColor: '#1e1e1e',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },

  itemText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },

  BtnExcluir: {
    backgroundColor: '#c62828',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },

  botaoTema: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
  },

  textoTema: {
    fontSize: 20,
  },

});
