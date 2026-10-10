import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Perfil_Usuarios({ route, navigation, escuro, setEscuro }) {
  const nomeUsuario = route.params?.nomeUsuario || 'Não informado';
  const emailUsuario = route.params?.emailUsuario || 'Não informado';

  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [foto, setFoto] = useState(null);

  const escolherFoto = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync();

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  const estilo = escuro ? estilosEscuro : estilosClaro;

  return (
    <ScrollView contentContainerStyle={estilo.container}>
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

      <Text style={estilo.titulo}>Perfil do Usuário</Text>

      {/* Caixa de Foto de Perfil */}
      <TouchableOpacity style={estilo.caixaFoto} onPress={escolherFoto}>
        {foto ? (
          <Image source={{ uri: foto }} style={estilo.imagem} />
        ) : (
          <Text style={estilo.textoFoto}>Clique para adicionar foto</Text>
        )}
      </TouchableOpacity>

      <View style={estilo.caixaInfo}>
        <Text style={estilo.rotulo}>Nome:</Text>
        <Text style={estilo.valor}>{nomeUsuario}</Text>

        <Text style={estilo.rotulo}>E-mail:</Text>
        <Text style={estilo.valor}>{emailUsuario}</Text>
      </View>

      {/* Botão de Voltar */}
      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
        color="#0c6d60"
      />
    </ScrollView>
  );
}

const estilosClaro = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F4F6F8',
  },
  areaTema: {
    width: '100%',
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
    color: '#1A202C',
  },
  caixaFoto: {
    width: 185,
    height: 185,
    borderRadius: 125,
    backgroundColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  textoFoto: {
    textAlign: 'center',
    fontSize: 12,
    color: '#333',
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  caixaInfo: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  rotulo: {
    fontWeight: 'bold',
    color: '#666',
  },
  valor: {
    fontSize: 16,
    marginBottom: 10,
    color: '#2D3748',
  },
});

const estilosEscuro = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#121214',
  },
  areaTema: {
    width: '100%',
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
    color: '#E1E1E6',
  },
  caixaFoto: {
    width: 185,
    height: 185,
    borderRadius: 125,
    backgroundColor: '#29292E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  textoFoto: {
    textAlign: 'center',
    fontSize: 12,
    color: '#A8A8B3',
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  caixaInfo: {
    width: '100%',
    backgroundColor: '#202024',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#29292E',
  },
  rotulo: {
    fontWeight: 'bold',
    color: '#A8A8B3',
  },
  valor: {
    fontSize: 16,
    marginBottom: 10,
    color: '#E1E1E6',
  },
});