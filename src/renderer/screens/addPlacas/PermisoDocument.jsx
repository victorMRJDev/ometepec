// PermisoDocument.jsx
import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'

// Usar URLs externas para pruebas
const logogroURL = 'https://via.placeholder.com/100x100.png?text=Logo+1'
const ssplogoURL = 'https://via.placeholder.com/100x100.png?text=Logo+2'
const logoomeURL = 'https://via.placeholder.com/50x50.png?text=Logo+Ome'

// Crear estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica, Arial, sans-serif'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    padding: 10
  },
  logo: {
    width: 100,
    height: 'auto'
  },
  title: {
    textAlign: 'center',
    color: '#800000',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold'
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14
  },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },
  column: {
    width: '30%',
    textAlign: 'center'
  },
  smallText: {
    fontSize: 8
  },
  boldText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20
  },
  authorities: {
    marginTop: 40
  },
  paragraph: {
    marginTop: 20,
    fontSize: 10,
    textAlign: 'justify'
  },
  vehicleSection: {
    marginTop: 30
  },
  vehicleList: {
    fontSize: 12
  },
  signature: {
    marginTop: 60,
    textAlign: 'center',
    fontSize: 12
  },
  currentYear: {
    textAlign: 'center',
    fontSize: 30
  }
})

// Componente del Documento PDF
const PermisoDocument = ({ permiso, formatearFecha }) => {
  console.log('Permiso recibido en PermisoDocument:', permiso) // Para depuración

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Tira superior con colores y logos */}
        <View style={styles.header}>
          <Image src={logogroURL} style={styles.logo} />
          <Image src={ssplogoURL} style={styles.logo} />
        </View>

        {/* Título principal */}
        <Text style={styles.title}>PERMISO PROVISIONAL PARA CIRCULAR SIN PLACAS</Text>
        <Text style={styles.subtitle}>VÁLIDO POR 30 DÍAS</Text>

        {/* Contenedor de columnas */}
        <View style={styles.columnContainer}>
          {/* Primera columna */}
          <View style={styles.column}>
            <Text style={{ fontSize: 24, marginBottom: 10 }}>JUCHITÁN</Text>
            <Text style={{ fontSize: 12, marginBottom: 5 }}>"Convicción De Servir" 2021-2024</Text>
            <Text style={{ fontSize: 12 }}>Otra línea de texto izquierda</Text>
          </View>

          {/* Logo central */}
          <View style={styles.column}>
            <Image src={logoomeURL} style={{ width: 50, height: 50 }} />
          </View>

          {/* Tercera columna */}
          <View style={styles.column}>
            <Text style={styles.smallText}>ASUNTO: PERMISO TEMPORAL PARA CIRCULAR SIN PLACAS</Text>
            <Text style={styles.smallText}>POR TRÁMITE DE EMPLACAMIENTO</Text>
            <Text style={styles.smallText}>FOLIO ÚNICO: {permiso.folioUnico}</Text>
            <Text style={styles.smallText}>JUCHITAN, GRO A {formatearFecha(permiso.fechaExpedicion)}</Text>
            <Text style={styles.smallText}>Otra línea de texto derecha</Text>
          </View>
        </View>

        {/* Sección de autoridades */}
        <View style={styles.authorities}>
          <Text><strong>C. AUTORIDADES FEDERALES DE LA FISCALÍA GENERAL DE LA REPÚBLICA</strong></Text>
          <Text><strong>C. AUTORIDADES ESTATALES DE SEGURIDAD PÚBLICA</strong></Text>
          <Text><strong>C. AUTORIDADES MUNICIPALES DE SEGURIDAD PÚBLICA</strong></Text>
          <Text><strong>P R E S E N T E S</strong></Text>
        </View>

        {/* Texto de facultades */}
        <View style={styles.paragraph}>
          <Text>
            En ejercicio de la facultad que me confieren los artículos 28 de la ley de Transporte
            y Vialidad del Estado de Guerrero así como el 26, 119 y 122 del Reglamento de la Ley
            de Transporte y Vialidad del Estado de Guerrero me permito informarles que el vehículo
            que a continuación se describe, se le ha expedido y al mismo tiempo autorizado un
            permiso temporal para circular sin placas, durante el periodo comprendido del:
          </Text>
        </View>

        {/* Fechas de expedición y vencimiento */}
        <Text style={styles.boldText}>
          {`${formatearFecha(permiso.fechaExpedicion)} AL ${formatearFecha(permiso.fechaVencimiento)}`}
        </Text>

        {/* Texto de agradecimiento */}
        <View style={styles.paragraph}>
          <Text>
            Por lo cual agradeceré a ustedes brinden todas las facilidades necesarias a su
            conductor para circular todos los días y en cualquier horario, por el periodo
            señalado.
          </Text>
        </View>

        {/* Sección de características del vehículo */}
        <View style={styles.vehicleSection}>
          <Text style={{ textAlign: 'center', fontSize: 14 }}>CARACTERÍSTICAS DEL VEHÍCULO</Text>
          <View style={styles.vehicleList}>
            <Text><strong>NÚMERO DE SERIE:</strong> {permiso.numSerie}</Text>
            <Text><strong>NÚMERO DE MOTOR:</strong> {permiso.numMotor}</Text>
            <Text><strong>MARCA:</strong> {permiso.marca}</Text>
            <Text><strong>AÑO/MODELO:</strong> {permiso.yearModelo}</Text>
            <Text><strong>COLOR:</strong> {permiso.color}</Text>
            <Text><strong>CONTRIBUYENTE:</strong> {`${permiso.nombres} ${permiso.apellidoPaterno} ${permiso.apellidoMaterno}`}</Text>
          </View>
        </View>

        {/* Año y QR */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          <View>
            {/* Inserta el QR si lo tienes */}
            {/* <Image src={qrImage} style={{ width: 100, height: 100 }} /> */}
          </View>
          <Text style={styles.currentYear}>{new Date().getFullYear()}</Text>
        </View>

        {/* Firma centrada */}
        <View style={styles.signature}>
          <Text>Atentamente,</Text>
          <Text style={{ marginTop: 20 }}>CMTE. SABAD GARCÍA PRUDENTE</Text>
          <Text style={{ marginTop: 5 }}>DIRECTOR DE TRÁNSITO MUNICIPAL DE JUCHITAN, GRO.</Text>
        </View>
      </Page>
    </Document>
  )
}

export default PermisoDocument
