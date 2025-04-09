// src/components/FacturaPDF.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: '#0056d6',
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    borderBottom: 1,
    paddingBottom: 3,
    marginBottom: 3,
  },
  cell: {
    flex: 1,
  },
  totals: {
    textAlign: 'right',
    marginTop: 10,
  }
});

const Factura = ({ data }) => {
  
  const { items, taxes } = data;

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const iva = subtotal * taxes.iva;
  const irpf = subtotal * taxes.irpf;
  const total = subtotal + iva - irpf;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Cabecera */}
        <View style={styles.header}>
          <Text style={styles.title}>Factura</Text>
          <View>
            <Text>Fecha de factura: {data.issueDate}</Text>
            <Text>Número de factura: {data.invoiceNumber}</Text>
            <Text>Fecha de vencimiento: {data.dueDate}</Text>
          </View>
        </View>

        {/* Datos del emisor y cliente */}
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.bold}>{data.sender.name}</Text>
              <Text>{data.sender.address}</Text>
              <Text>NIF: {data.sender.nif}</Text>
              <Text>{data.sender.city}</Text>
              <Text>Email: {data.sender.email}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.bold}>{data.recipient.name}</Text>
              <Text>{data.recipient.address}</Text>
              <Text>CIF: {data.recipient.cif}</Text>
              <Text>{data.recipient.city}</Text>
              <Text>Email: {data.recipient.email}</Text>
            </View>
          </View>
        </View>

        {/* Tabla de productos */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={[styles.cell, styles.bold]}>Descripción</Text>
            <Text style={[styles.cell, styles.bold]}>Unidades</Text>
            <Text style={[styles.cell, styles.bold]}>Precio Unitario</Text>
            <Text style={[styles.cell, styles.bold]}>Precio</Text>
          </View>
          {items.map((item, idx) => (
            <View style={styles.row} key={idx}>
              <Text style={styles.cell}>{item.description}</Text>
              <Text style={styles.cell}>{item.quantity}</Text>
              <Text style={styles.cell}>€{item.unitPrice.toFixed(2)}</Text>
              <Text style={styles.cell}>€{(item.unitPrice * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Totales */}
        <View style={styles.totals}>
          <Text>BASE IMPONIBLE: €{subtotal.toFixed(2)}</Text>
          <Text>IVA (21 %): €{iva.toFixed(2)}</Text>
          <Text>IRPF (-15 %): -€{irpf.toFixed(2)}</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>TOTAL: €{total.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Factura;
