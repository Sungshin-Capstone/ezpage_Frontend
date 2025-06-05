import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import CustomModal from './CustomModal';

const AddMenu = ({ isVisible, onClose, onSubmit, menus = [] }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelect = (item) => {
    
    const exists = selectedItems.find((i) => i.menu_ko === item.menu_ko);
    if (exists) {
      setSelectedItems(selectedItems.filter((i) => i.menu_ko !== item.menu_ko));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
    console.log('🔍 선택된 아이템:', item);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedItems.some((i) => i.menu_ko === item.menu_ko);
    return (
      <TouchableOpacity
        style={[styles.itemContainer, isSelected ? styles.selectedItem : styles.unselectedItem]}
        onPress={() => toggleSelect(item)}
      >
        <View>
          <Text style={styles.description}>{item.menu_original}</Text>
          <Text style={[styles.name, isSelected && { color: '#5a5a5a' }]}>{item.menu_ko}</Text>
        </View>
        <View style={styles.priceGroup}>
          <Text style={styles.priceUSD}>{item.price_original || '-'}</Text>
          <Text style={styles.priceKRW}>{item.price_krw || '-'}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <CustomModal
      isVisible={isVisible}
      onClose={onClose}
      onSubmit={() => onSubmit(selectedItems)}
      title="AI 지불 가이드"
    >
      <View style={{ flexGrow: 1, maxHeight: 400 }}>
        <Text style={styles.headerText}>주문한 메뉴를 선택해주세요.</Text>
        <FlatList
          data={menus}
          keyExtractor={(item, index) => `${item.menu_ko}_${index}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 0 }}
        />
      </View>
    </CustomModal>
  );
};

export default AddMenu;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  itemContainer: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  selectedItem: {
    backgroundColor: '#eaf2ff',
  },
  unselectedItem: {
    backgroundColor: '#f2f2f2',
  },
  name: {
    fontSize: 15,
    color: '#b0b0b0',
    fontWeight: '500',
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    color: '#6e6e6e',
  },
  priceGroup: {
    alignItems: 'flex-end',
  },
  priceUSD: {
    fontSize: 16,
    color: '#8e8e8e',
    fontWeight: '500',
  },
  priceKRW: {
    marginTop: 4,
    fontSize: 13,
    color: '#4e4e4e',
  },
});