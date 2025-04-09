// src/components/FacturaPDF.tsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
});

const FacturaPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Factura #{data.numero}</Text>
        <Text>Fecha: {data.fecha}</Text>
        <Text>Cliente: {data.cliente}</Text>
      </View>

      <View style={styles.section}>
        {data.items.map((item, idx) => (
          <View style={styles.row} key={idx}>
            <Text>{item.descripcion}</Text>
            <Text>${item.valor}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text>Total: ${data.total}</Text>
      </View>
    </Page>
  </Document>
);

export default FacturaPDF;
