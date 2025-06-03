import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomModal from './CustomModal';

const PaymentGuide = ({ isVisible, onClose, onSubmit, selectedMenus, total, guideResult }) => {
  const totalUSD = total || 0;
  const totalKRW = Math.round(totalUSD * 1464);

  const currencySymbol = guideResult?.currency || '$';

  const strategies = guideResult?.recommendations?.payment
    ? Object.keys(guideResult.recommendations.payment)
    : [];

  return (
    <CustomModal
      isVisible={isVisible}
      onClose={onClose}
      onSubmit={onSubmit}
      title="AI 지불 가이드"
    >
      <View style={styles.container}>
        {/* 메뉴 목록 */}
        {selectedMenus.map((menu, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.menuText}>{menu.menu_original}</Text>
            <Text style={styles.priceText}>{menu.price_original}</Text>
          </View>
        ))}

        {/* 합계 */}
        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalUSD}>{currencySymbol}{totalUSD.toFixed(2)}</Text>
        </View>
        <View style={styles.krwRow}>
          <Text style={styles.krw}>KRW</Text>
          <Text style={styles.krwAmount}>{totalKRW.toLocaleString()}원</Text>
        </View>

        
      </View>
    </CustomModal>
  );
};

export default PaymentGuide;


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuText: {
    fontSize: 15,
    color: '#333',
  },
  priceText: {
    fontSize: 15,
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  totalUSD: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  krwRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  krw: {
    fontSize: 14,
    color: '#999',
  },
  krwAmount: {
    fontSize: 14,
    color: '#999',
  },
  paymentTitle: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: '600',
  },
  paymentBox: {
    backgroundColor: '#eaf2ff',
    borderRadius: 10,
    padding: 10,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  breakdownText: {
    fontSize: 15,
    fontWeight: '500',
  },
  breakdownCount: {
    fontSize: 15,
  },
  totalPaymentRow: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 12,
    padding: 10,
    alignItems: 'center',
  },
  paid: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  changeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  changeLabel: {
    fontSize: 15,
    color: '#666',
  },
  changeValue: {
    fontSize: 15,
    color: '#333',
  },
});
