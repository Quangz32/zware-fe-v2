import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import logoFPT from "./logoFPT.jpg";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 30,
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  invoiceDate: {
    fontSize: 10,
    marginTop: 5,
  },
  companyInfo: {
    // alignItems: "flex",
    marginBottom: 20,
  },
  companyName: {
    fontSize: 12,
    fontWeight: "bold",
  },
  companyAddress: {
    fontSize: 10,
  },
  billTo: {
    marginBottom: 20,
  },
  billToTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  billToInfo: {
    fontSize: 10,
  },
  invoiceInfo: {
    marginBottom: 10,
    fontSize: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
  },
  tableHeaderCell: {
    margin: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCol: {
    width: "16.66%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    color: "grey",
    fontSize: 9,
    borderTop: "1px solid #ccc",
    paddingTop: 5,
  },
  note: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    fontSize: 9,
  },
});

const TransactionPDF = ({ transaction, details }) => {
  const isOutbound = transaction.type === "outbound";
  const sourceWarehouse = transaction.sourceWarehouse;
  const destinationWarehouse = transaction.destinationWarehouse;

  const billingWarehouse = isOutbound ? destinationWarehouse : sourceWarehouse;
  const headerWarehouse = isOutbound ? sourceWarehouse : destinationWarehouse;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View style={styles.header}>
          <View>
          {/* <Text style={styles.invoiceTitle } style={{color: '#000077'}  }>WAREHOUSE MANAGEMENT SYSTEM</Text> */}
          <Text style={[ {color: '#000077'}, {fontWeight: 'bold'}, {textAlign: 'center'}]}>WAREHOUSE MANAGEMENT SYSTEM</Text>

            <Text style={styles.invoiceTitle}>Invoice Inbound Transaction #{transaction.id}</Text>
         
          </View>
          {/* <Image style={styles.logo} src={logoFPT} /> */}
          <View  style={styles.companyInfo}>
          {/* <Text style={styles.invoiceDate}>
              {new Date(transaction.date).toLocaleDateString()}
            </Text> */}
        </View></View>

        {/* <View style={styles.companyInfo}>
        <Text style={styles.companyNameTilte}>Source: </Text>
          <Text style={styles.companyName}>{headerWarehouse.name}</Text>
          <Text style={styles.companyAddress}>{headerWarehouse.address}</Text>
          <Text style={styles.companyAddress}>
            {headerWarehouse.city}, {headerWarehouse.country}
          </Text>
        </View> */}
         <View style={styles.companyInfo}>
         <Text style={styles.invoiceDate}>
              {new Date(transaction.date).toLocaleDateString()}
            </Text>
          {/* <Text style={styles.billToInfo}>
            {billingWarehouse.city}, {billingWarehouse.country}
          </Text> */}
        </View>

        <View style={styles.companyInfo}>
          <Text style={styles.companyNameTilte}>Source:</Text>
          <Text style={styles.companyName}>{headerWarehouse.name}</Text>
          <Text style={styles.companyAddress}>{headerWarehouse.address}</Text>
          {/* <Text style={styles.billToInfo}>
            {billingWarehouse.city}, {billingWarehouse.country}
          </Text> */}
        </View>
        <View style={styles.billTo}>
          <Text style={styles.billToTitle}>Bill to:</Text>
          <Text style={styles.billToInfo}>{billingWarehouse.name}</Text>
          <Text style={styles.billToInfo}>{billingWarehouse.address}</Text>
          {/* <Text style={styles.billToInfo}>
            {billingWarehouse.city}, {billingWarehouse.country}
          </Text> */}
        </View>

        <View style={styles.invoiceInfo}>
          <Text>
            All product below correspond to work completed in the month of{" "}
            {new Date(transaction.date).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
            .
          </Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeaderCell}>Item</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeaderCell}>Product</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeaderCell}>Quantity</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeaderCell}>Expire Date</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeaderCell}>Source Zone</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableHeaderCell}>Destination Zone</Text>
            </View>
          </View>
          {details.map((detail, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{index + 1}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {detail.product?.name || ""}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{detail.quantity || 0}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {detail.item?.expire_date || "N/A"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {detail.source?.name || "N/A"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {detail.zone?.name || "N/A"}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* <View style={styles.note}>
          <Text>
            On {new Date(transaction.date).toLocaleDateString()}, users will be
            upgraded free of charge to our new cloud offering.
          </Text>
        </View> */}
        <Text style={styles.footer}>
          Generated on {new Date().toLocaleString()} - FPT University
        </Text>
        {/* <Text style={styles.footer}>This includes non-business days.</Text> */}
      </Page>
    </Document>
  );
};

export default TransactionPDF;
