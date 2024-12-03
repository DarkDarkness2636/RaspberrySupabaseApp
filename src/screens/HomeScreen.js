import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [status, setStatus] = useState(false);

  // Consultar estado del programa en la Raspberry Pi
  useEffect(() => {
    axios.get('http://10.147.19.191:5000/status')
      .then(response => {
        setStatus(response.data.running);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estado del programa:</Text>
      <Text style={styles.status}>{status ? 'En ejecución' : 'Apagado'}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: status ? '#28a745' : '#dc3545' }]} 
          onPress={() => navigation.navigate('Control')}
        >
          <Text style={styles.buttonText}>{status ? 'Detener Programa' : 'Iniciar Programa'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Historial')}
        >
          <Text style={styles.buttonText}>Ver Historial</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 10,
    color: '#333',
  },
  status: {
    fontSize: 20,
    marginBottom: 30,
    color: '#007bff',  // Color de texto azul
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 40,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    marginBottom: 15,
    borderRadius: 8,
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
    fontSize: 16,
    fontWeight: '600',
  },
});

