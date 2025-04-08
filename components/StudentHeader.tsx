import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Users, Wallet } from 'lucide-react-native';
import { useAuth } from '@/hooks/useAuth';
import { MessOwner } from '@/types/custom';

export default function DashboardHeader() {
  const {userData} = useAuth()
  const messOwner = userData as MessOwner;
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.metricContainer}>
          <Users size={24} color="#1E88E5" />
          <Text style={styles.label}>Total Students</Text>
          <Text style={styles.value}>{messOwner.students.length}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.metricContainer}>
          <Wallet size={24} color="#1E88E5" />
          <Text style={styles.label}>Balance</Text>
          <Text style={styles.value}>₹{messOwner.students.reduce((total, student) => total + student.wallet.wallet_money, 0)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  metricContainer: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E88E5',
    marginTop: 4,
  },
  divider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
});