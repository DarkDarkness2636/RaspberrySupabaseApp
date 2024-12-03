import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { List, Divider } from 'react-native-paper';

// Configuración de Supabase
const SUPABASE_URL = 'https://iafvunpkmeuripewxktc.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhZnZ1bnBrbWV1cmlwZXd4a3RjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzExNDczNywiZXhwIjoyMDQ4NjkwNzM3fQ.OyFiKvIHj9y-pOvx96Q9iQH0Kjy_mlmm3ZSaE3f_UAM';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const formatFecha = (fecha) => {
  if (!fecha) {
    console.error('Fecha no definida:', fecha); // Agregar un mensaje de error si la fecha no existe
    return 'Fecha no disponible';
  }

  // Truncamos los microsegundos si están presentes
  const fechaValida = fecha.split('.')[0]; // Esto elimina los microsegundos
  const date = new Date(fechaValida);

  if (isNaN(date)) {
    console.error('Fecha no válida:', fecha);
    return 'Fecha inválida';
  }

  const dia = date.getDate().toString().padStart(2, '0');
  const mes = (date.getMonth() + 1).toString().padStart(2, '0');
  const año = date.getFullYear();
  const hora = date.getHours().toString().padStart(2, '0');
  const minutos = date.getMinutes().toString().padStart(2, '0');
  const segundos = date.getSeconds().toString().padStart(2, '0');
  return `${dia}/${mes}/${año} ${hora}:${minutos}:${segundos}`;
};


export default function HistorialScreen() {
  const [fichas, setFichas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('Skittles').select('*');

      if (error) {
        console.error('Error al obtener datos:', error);
      } else {
        setFichas(data); // Guardamos todas las fichas con su hora de extracción
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    const color = item.color.trim().toLowerCase(); // Color normalizado
    const horaExtraccion = formatFecha(item.hora); // Fecha de la ficha
    const iconColor =
      color === 'rojo'
        ? '#FF0000'
        : color === 'azul'
        ? '#0000FF'
        : color === 'verde'
        ? '#00FF00'
        : '#000000'; // Color por defecto (negro)

    return (
      <List.Item
        title={`Color: ${color.charAt(0).toUpperCase() + color.slice(1)}`} // Capitaliza la primera letra
        description={`Hora de extracción: ${horaExtraccion}`}
        left={(props) => <List.Icon {...props} icon="circle" color={iconColor} />}
        style={styles.listItem}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Fichas</Text>
      <FlatList
        data={fichas} // Aquí usamos todos los datos de las fichas
        keyExtractor={(item) => item.id.toString()} // Asumiendo que hay un campo 'id' único en cada ficha
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider />}
      />
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Resumen</Text>
        <Text style={styles.summaryText}>
          🔴 Rojas: {fichas.filter(ficha => ficha.color === 'rojo').length || 0}
        </Text>
        <Text style={styles.summaryText}>
          🔵 Azules: {fichas.filter(ficha => ficha.color === 'azul').length || 0}
        </Text>
        <Text style={styles.summaryText}>
          🟢 Verdes: {fichas.filter(ficha => ficha.color === 'verde').length || 0}
        </Text>
      </View>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F4F4',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200EE',
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    elevation: 2,
    marginBottom: 10,
  },
  summary: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
