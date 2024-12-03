import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function ControlScreen() {
  const [status, setStatus] = useState(false);

  // Encender el programa
  const startProgram = () => {
    axios
      .post('http://10.147.19.191:5000/start')
      .then(response => {
        Alert.alert('Programa iniciado', response.data.status);
        setStatus(true);
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', 'No se pudo iniciar el programa');
      });
  };

  // Apagar el programa
  const stopProgram = () => {
    axios
      .post('http://10.147.19.191:5000/stop')
      .then(response => {
        Alert.alert('Programa detenido', response.data.status);
        setStatus(false);
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', 'No se pudo detener el programa');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control del programa</Text>
      <Text style={styles.status}>
        Estado actual: {status ? 'En ejecución' : 'Apagado'}
      </Text>

      {/* Botón de Iniciar */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#28a745' }]}
        onPress={startProgram}
      >
        <Text style={styles.buttonText}>Iniciar Programa</Text>
      </TouchableOpacity>

      {/* Botón de Detener */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#dc3545' }]}
        onPress={stopProgram}
      >
        <Text style={styles.buttonText}>Detener Programa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7', // Fondo más suave
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  status: {
    fontSize: 20,
    marginBottom: 40,
    color: '#007bff', // Color de texto azul
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

