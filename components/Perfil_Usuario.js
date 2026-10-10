import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Perfil_Usuarios({ route, navigation }) {
  // Recebendo os dados enviados da tela Home
  const nomeUsuario = route.params?.nomeUsuario || 'Não informado';
  const emailUsuario = route.params?.emailUsuario || 'Não informado';

  // Estado para armazenar o caminho da foto
  const [foto, setFoto] = useState(null);

  // Função simples para escolher a foto na galeria
  const escolherFoto = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync();

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Perfil do Usuário</Text>

      {/* Caixa de Foto de Perfil */}
      <TouchableOpacity style={estilos.caixaFoto} onPress={escolherFoto}>
        {foto ? (
          <Image source={{ uri: foto }} style={estilos.imagem} />
        ) : (
          <Text style={estilos.textoFoto}>Clique para adicionar foto</Text>
        )}
      </TouchableOpacity>

      <View style={estilos.caixaInfo}>
        <Text style={estilos.rotulo}>Nome:</Text>
        <Text style={estilos.valor}>{nomeUsuario}</Text>

        <Text style={estilos.rotulo}>E-mail:</Text>
        <Text style={estilos.valor}>{emailUsuario}</Text>
      </View>

      {/* Botão de Voltar */}
      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
        color="#0c6d60"
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F4F6F8',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
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
  },
});