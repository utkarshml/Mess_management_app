import { Student } from '@/types/custom';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';


interface StudentDetailsModalProps {
  isVisible: boolean;
  student: Student | null;
  onClose: () => void;
}

export default function StudentDetailsModal({
  isVisible,
  student,
  onClose,
}: StudentDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('info');

  if (!student) return null;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{student.student_name}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'info' && styles.activeTab]}
            onPress={() => setActiveTab('info')}
          >
            <Text style={styles.tabText}>Information</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'activities' && styles.activeTab]}
            onPress={() => setActiveTab('activities')}
          >
            <Text style={styles.tabText}>Activities</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {activeTab === 'info' ? (
            <View style={styles.infoGrid}>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Branch</Text>
                <Text style={styles.value}>{student.branch}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Attendance</Text>
                <Text style={styles.value}>{student.attendance.length}%</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.label}>Status</Text>
                <Text style={[
                  styles.value,
                  { color: true ? '#4CAF50' : '#FF5252' }
                ]}>
                  {true ? 'Active' : 'Inactive'}
                </Text>
              </View>
              <View>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{student.email}</Text>
              </View>
            </View>
     
          ) : (
            <View style={styles.timeline}>
       
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '60%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 24,
    color: '#666666',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#1E88E5',
  },
  tabText: {
    color: '#333333',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  gridItem: {
    width: '33.33%',
    padding: 8,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  timeline: {
    paddingLeft: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1E88E5',
    marginRight: 12,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
  },
  timelineDate: {
    fontSize: 14,
    color: '#666666',
  },
  timelineActivity: {
    fontSize: 16,
    color: '#333333',
    marginTop: 2,
  },
});