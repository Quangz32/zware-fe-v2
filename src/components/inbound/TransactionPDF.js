import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  // Image,
} from "@react-pdf/renderer";

// import logoFPT from "./logoFPT.jpg";

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
    textAlign: "center",
    color: "#000077",
  },
  invoiceDate: {
    fontSize: 10,
    marginTop: 5,
  },
  companyInfo: {
    marginBottom: 20,
  },
  companyName: {
    fontSize: 12,
    fontWeight: "bold",
  },
  companyAddress: {
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
  tableColHeader: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    flex: 1,
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
});

const TransactionPDF = ({ transaction, details }) => {
  const isOutbound = transaction.type === "outbound";
  const sourceWarehouse = transaction.source || {};
  const destinationWarehouse = transaction.warehouse || {};

  // const billingWarehouse = isOutbound ? destinationWarehouse : sourceWarehouse;
  const headerWarehouse = isOutbound ? sourceWarehouse : destinationWarehouse;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text
              style={[
                { color: "#000077" },
                { fontWeight: "bold" },
                { textAlign: "center" },
              ]}
            >
              WAREHOUSE MANAGEMENT SYSTEM
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.invoiceTitle}>
            Invoice {isOutbound ? "Outbound" : "Inbound"} Transaction #
            {transaction.id}
          </Text>
        </View>
        <View style={styles.companyInfo}>
          <Text style={styles.invoiceDate}>
            Date:
            {new Date(transaction.date).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>Source:</Text>
          <Text style={styles.companyName}>{transaction.source}</Text>
        </View>
        <View style={styles.billTo}>
          <Text style={styles.billToTitle}>Bill to:</Text>
          <Text style={styles.billToInfo}>{destinationWarehouse.name}</Text>
          <Text style={styles.billToInfo}>{destinationWarehouse.address}</Text>
        </View>
              
        <View style={styles.invoiceInfo}>
          <Text>
            All product below correspond to work completed in the month of{" "}
            {new Date(transaction.date).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </Text>
        </View>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableHeaderCell}>Item</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableHeaderCell}>Product</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableHeaderCell}>Quantity</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableHeaderCell}>Expire Date</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableHeaderCell}>Zone</Text>
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
              {/* <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {detail.source?.name || "N/A"}
                </Text>
              </View> */}
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {detail.item?.expire_date || "N/A"}
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

        <Text style={styles.footer}>
          Generated on {new Date().toLocaleString()} - Warehouse Management
          System
        </Text>
      </Page>
    </Document>
  );
};

export default TransactionPDF;
