import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';

// Exemplo de estrutura seguindo suas preferências de código
export default function MedicalHistoryScreen() {
  const medicalData = [
    {
      title: "Próximos Compromissos",
      data: [{ id: '1', type: 'Vacina', title: 'V10 - Reforço', date: '20/06/2026' }]
    },
    {
      title: "Histórico Recente",
      data: [
        { id: '2', type: 'Consulta', title: 'Check-up Anual', date: '15/05/2026', vet: 'Dra. Silva' },
        { id: '3', type: 'Exame', title: 'Hemograma Completo', date: '15/05/2026', status: 'Normal' }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saúde do Rex</Text>
      <SectionList
        sections={medicalData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.date} • {item.type}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2D3436' },
  sectionHeader: { fontSize: 16, fontWeight: '600', marginTop: 15, marginBottom: 10, color: '#636E72' },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardSubtitle: { fontSize: 14, color: '#B2BEC3' }
});