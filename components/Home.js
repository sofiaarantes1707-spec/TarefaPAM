import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';

export default function Home({ navigation, tarefas, setTarefas, escuro, setEscuro }) {
  const [tituloT, setTituloT] = useState('');
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

  // Estados do Usuário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [usuarioGuardado, setUsuarioGuardado] = useState(false);

  // Contadores de Tarefas
  const totalTarefas = tarefas.length;
  const totalConcluidas = tarefas.filter((t) => t.concluida).length;

  // Guardar Usuário
  const guardarInformacoes = () => {
    if (nome === '' || email === '') {
      alert('Preencha o nome e o e-mail!');
      return;
    }
    setUsuarioGuardado(true);
  };

  // Ir para o Perfil
  const irParaPerfil = () => {
    navigation.navigate('Perfil_Usuarios', {
      nomeUsuario: nome,
      emailUsuario: email,
    });
  };

  // Adicionar Tarefa
  const AdicionaTarefa = () => {
    if (tituloT.trim() === '') return;

    const novaTarefa = {
      id: String(new Date().getTime()),
      titulo: tituloT,
      concluida: false,
    };

    setTarefas([...tarefas, novaTarefa]);
    setTituloT('');
  };

  // Marcar / Desmarcar como concluída
  const concluirTarefa = (id) => {
    const listaAtualizada = tarefas.map((item) => {
      if (item.id === id) {
        return { ...item, concluida: !item.concluida };
      }
      return item;
    });

    setTarefas(listaAtualizada);
  };

  // Excluir Tarefa
  const ExcluirTarefa = (idParaRemover) => {
    setTarefas(tarefas.filter((item) => item.id !== idParaRemover));
  };

  const estilo = escuro ? estilosEscuro : estilosClaro;

  // Renderização de cada item da FlatList
  const renderItemTarefa = ({ item }) => (
    <View style={estilo.itemContainer}>
      <Text style={[estilo.itemText, item.concluida && estilosGerais.textoRiscado]}>
        {item.titulo}
      </Text>

      <View style={estilosGerais.botoesLadoALado}>
        <TouchableOpacity
          style={item.concluida ? estilosGerais.btnCinza : estilosGerais.btnVerde}
          onPress={() => concluirTarefa(item.id)}
        >
          <Text style={estilo.btnText}>
            {item.concluida ? 'Desfazer ↩️' : 'Concluir ✔️'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilo.BtnExcluir} onPress={() => ExcluirTarefa(item.id)}>
          <Text style={estilo.btnText}>Excluir 🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHeader = () => (
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
              <Text style={estilo.textoOpcao}>🔆 Modo Claro</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[estilo.opcaoBotao, escuro && estilo.opcaoAtiva]}
              onPress={() => { setEscuro(true); setMostrarOpcoes(false); }}
            >
              <Text style={estilo.textoOpcao}>🌕 Modo Escuro</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* TÍTULO */}
      <View style={estilo.headerContainer}>
        <Text style={estilo.Titulo}>TO DO LIST</Text>
      </View>

      {/* DADOS DO USUÁRIO */}
      <View style={estilo.formContainer}>
        <Text style={estilo.label}>Dados do Usuário:</Text>

        {!usuarioGuardado ? (
          <View>
            <TextInput
              style={estilo.input}
              placeholder="Digite seu nome"
              placeholderTextColor={escuro ? '#aaa' : '#666'}
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={estilo.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor={escuro ? '#aaa' : '#666'}
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity style={estilo.BtnAdicionar} onPress={guardarInformacoes}>
              <Text style={estilo.btnText}>Enviar Informações</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={estilo.BtnPerfil} onPress={irParaPerfil}>
            <Text style={estilo.btnText}>Ir para Perfil do Usuário 👤</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={estilo.contadorContainer}>
        <Text style={estilo.textoContador}>
          Total de tarefas: <Text style={estilo.Contador}>{totalTarefas}</Text> | Concluídas: <Text style={estilo.Contador}>{totalConcluidas}</Text>
        </Text>
      </View>

      <View style={estilo.formContainer}>
        <Text style={estilo.label}>Digite a tarefa que você deseja adicionar:</Text>
        <TextInput
          style={estilo.input}
          placeholder="Digite aqui a tarefa que deseja realizar"
          placeholderTextColor={escuro ? '#aaa' : '#666'}
          value={tituloT}
          onChangeText={setTituloT}
        />
        <TouchableOpacity style={estilo.BtnAdicionar} onPress={AdicionaTarefa}>
          <Text style={estilo.btnText}>Adicionar Tarefa</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <FlatList
      data={tarefas}
      keyExtractor={(item) => item.id}
      renderItem={renderItemTarefa}
      contentContainerStyle={estilo.container}
      
      /* PASSE O CONTEÚDO DIRETO AQUI (Sem criar uma função renderHeader) */
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

          {/* TÍTULO */}
          <View style={estilo.headerContainer}>
            <Text style={estilo.Titulo}>TO DO LIST</Text>
          </View>

          {/* DADOS DO USUÁRIO */}
          <View style={estilo.formContainer}>
            <Text style={estilo.label}>Dados do Usuário:</Text>

            {!usuarioGuardado ? (
              <View>
                <TextInput
                  style={estilo.input}
                  placeholder="Digite seu nome"
                  placeholderTextColor={escuro ? '#aaa' : '#666'}
                  value={nome}
                  onChangeText={setNome}
                />
                <TextInput
                  style={estilo.input}
                  placeholder="Digite seu e-mail"
                  placeholderTextColor={escuro ? '#aaa' : '#666'}
                  value={email}
                  onChangeText={setEmail}
                />
                <TouchableOpacity style={estilo.BtnAdicionar} onPress={guardarInformacoes}>
                  <Text style={estilo.btnText}>Enviar Informações</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={estilo.BtnPerfil} onPress={irParaPerfil}>
                <Text style={estilo.btnText}>Ir para Perfil do Usuário 👤</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* ADICIONAR TAREFA */}
          <View style={estilo.formContainer}>
            <Text style={estilo.label}>Digite a tarefa que você deseja adicionar:</Text>
            <TextInput
              style={estilo.input}
              placeholder="Digite aqui a tarefa que deseja realizar"
              placeholderTextColor={escuro ? '#aaa' : '#666'}
              value={tituloT}
              onChangeText={setTituloT}
            />
            <TouchableOpacity style={estilo.BtnAdicionar} onPress={AdicionaTarefa}>
              <Text style={estilo.btnText}>Adicionar Tarefa</Text>
            </TouchableOpacity>
          </View>

          {/* CONTADOR DE TAREFAS */}
          <View style={estilo.contadorContainer}>
            <Text style={estilo.textoContador}>
              Total de tarefas: <Text style={estilo.destaqueContador}>{totalTarefas}</Text> | Concluídas: <Text style={estilo.destaqueContador}>{totalConcluidas}</Text>
            </Text>
          </View>
        </>
      }
      ListEmptyComponent={
        <Text style={estilo.textoVazio}>Nenhuma tarefa cadastrada no momento.</Text>
      }
    />
  );
}

const estilosGerais = StyleSheet.create({
  textoRiscado: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  botoesLadoALado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnVerde: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 6,
    width: '48%',
    alignItems: 'center',
  },
  btnCinza: {
    backgroundColor: '#6c757d',
    padding: 8,
    borderRadius: 6,
    width: '48%',
    alignItems: 'center',
  },
});

const estilosClaro = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  Titulo: {
    backgroundColor: '#33326e',
    color: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
    fontWeight: 'bold',
    fontSize: 35,
    overflow: 'hidden',
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    color: '#000',
  },
  BtnAdicionar: {
    backgroundColor: '#363eaf',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  BtnPerfil: {
    backgroundColor: '#363eaf',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  contadorContainer: {
    backgroundColor: '#E2E8F0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  textoContador: {
    fontSize: 15,
    color: '#2D3748',
    fontWeight: '600',
  },
  Contador: {
    color: '#363eaf',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  itemText: {
    fontSize: 16,
    color: '#2D3748',
    marginBottom: 10,
  },
  BtnExcluir: {
    backgroundColor: '#E53E3E',
    padding: 8,
    borderRadius: 6,
    width: '48%',
    alignItems: 'center',
  },
  textoVazio: {
    textAlign: 'center',
    color: '#718096',
    marginTop: 10,
    fontSize: 15,
  },
});

const estilosEscuro = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  Titulo: {
    backgroundColor: '#33326e',
    color: '#d3faee',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
    fontWeight: 'bold',
    fontSize: 35,
    borderWidth: 1,
    borderColor: '#29292E',
    overflow: 'hidden',
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: '#A8A8B3',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#29292E',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#202024',
    color: '#FFF',
  },
  BtnAdicionar: {
    backgroundColor: '#e5fcf5',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  BtnPerfil: {
    backgroundColor: '#e1eefc',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#0f0f0f',
    fontWeight: 'bold',
  },
  contadorContainer: {
    backgroundColor: '#202024',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#29292E',
  },
  textoContador: {
    fontSize: 15,
    color: '#E1E1E6',
    fontWeight: '600',
  },
  Contador: {
    color: '#00e676',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: '#202024',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#29292E',
  },
  itemText: {
    fontSize: 16,
    color: '#E1E1E6',
    marginBottom: 10,
  },
  BtnExcluir: {
    backgroundColor: '#F75A68',
    padding: 8,
    borderRadius: 6,
    width: '48%',
    alignItems: 'center',
  },
  textoVazio: {
    textAlign: 'center',
    color: '#A8A8B3',
    marginTop: 10,
    fontSize: 15,
  },
});