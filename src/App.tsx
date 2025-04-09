import { useState } from "react";
import "./App.css";
import Factura from "./components/Factura";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

function App() {
  const [count, setCount] = useState(0);

  const datosFactura = {
    invoiceNumber: '2024-0001',
    issueDate: '17/04/2024',
    dueDate: '17/05/2024',
    sender: {
      name: 'Orlando Juan Lobán',
      address: 'Avenida Rosario 2, 1 A',
      nif: '39000001A',
      city: '08001, Barcelona',
      email: 'info@orlandojuan.es',
    },
    recipient: {
      name: 'Empresa de logística, S. L.',
      address: 'Calle San Juan de la Luz, s/n',
      cif: 'B12345678',
      city: '28001, Madrid',
      email: 'info@empresalogistalsl.com',
    },
    items: [
      { description: 'Producto 1', quantity: 2, unitPrice: 100 },
      { description: 'Producto 2', quantity: 4, unitPrice: 150 },
      { description: 'Producto 3', quantity: 7, unitPrice: 93 },
    ],
    taxes: {
      iva: 0.21,
      irpf: 0.15,
    }
  };
  return (
    <>
      <div>
        <PDFViewer style={{ width: "100%", height: "500px" }}>
          <Factura data={datosFactura} />
        </PDFViewer>

        {/* Botón de descarga */}
        <PDFDownloadLink
          document={<Factura data={datosFactura} />}
          fileName="factura-001.pdf"
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
        >
          {({ loading }) => (loading ? "Generando..." : "Descargar PDF")}
        </PDFDownloadLink>
      </div>
    </>
  );
}

export default App;
