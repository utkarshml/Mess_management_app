import { ErrorBoundary } from '@/app/ErrorBoundary';
import SearchBar from '@/components/SearchBar';
import StudentDetailsModal from '@/components/StudentDetails';
import DashboardHeader from '@/components/StudentHeader';
import StudentList from '@/components/StudentList';
import { useAuth } from '@/hooks/useAuth';
import { MessOwner, Student } from '@/types/custom';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function DashboardScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleStudentPress = useCallback((student: Student) => {
    setSelectedStudent(student);
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
    setSelectedStudent(null);
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaView style={styles.container}>
        <DashboardHeader />
        <SearchBar onSearch={handleSearch} />
        <StudentList
          searchQuery={searchQuery}
          onStudentPress={handleStudentPress}
        />
        <StudentDetailsModal
          isVisible={isModalVisible}
          student={selectedStudent}
          onClose={handleCloseModal}
        />
      </SafeAreaView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});