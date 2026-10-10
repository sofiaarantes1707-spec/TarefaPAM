import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Importação das páginas
import Home from './components/Home';
import Perfil_Usuarios from './components/Perfil_Usuario';
import Concluidas from './components/Concluido';
import NaoConcluido from './components/Nao_Concluido';

const Drawer = createDrawerNavigator();

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [escuro, setEscuro] = useState(false);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: escuro ? '#202024' : '#33326e',
          },
          headerTintColor: '#fff',
          drawerStyle: {
            backgroundColor: escuro ? '#121214' : '#F4F6F8',
          },
          drawerActiveTintColor: '#363eaf',
          drawerInactiveTintColor: escuro ? '#A8A8B3' : '#4A5568',
        }}
      >
        <Drawer.Screen name="Home" options={{ title: 'Início 🏠' }}>
          {(props) => (
            <Home
              {...props}
              tarefas={tarefas}
              setTarefas={setTarefas}
              escuro={escuro}
              setEscuro={setEscuro}
            />
          )}
        </Drawer.Screen>

        <Drawer.Screen name="Perfil_Usuarios" options={{ title: 'Perfil do Usuário 👤' }}>
          {(props) => (
            <Perfil_Usuarios
              {...props}
              escuro={escuro}
              setEscuro={setEscuro}
            />
          )}
        </Drawer.Screen>

        <Drawer.Screen name="Concluidas" options={{ title: 'Concluídas ✔️' }}>
          {(props) => (
            <Concluidas
              {...props}
              tarefas={tarefas}
              escuro={escuro}
              setEscuro={setEscuro}
            />
          )}
        </Drawer.Screen>

        <Drawer.Screen name="NaoConcluido" options={{ title: 'Pendentes ⏳' }}>
          {(props) => (
            <NaoConcluido
              {...props}
              tarefas={tarefas}
              escuro={escuro}
              setEscuro={setEscuro}
            />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}