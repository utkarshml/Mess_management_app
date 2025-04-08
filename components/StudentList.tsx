import { useAuth } from '@/hooks/useAuth';
import { MessOwner, Student } from '@/types/custom';
import React, { useCallback, memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';


interface StudentListProps {
  searchQuery: string;
  onStudentPress: (student: Student) => void;
}

const StudentList = ({ searchQuery, onStudentPress }: StudentListProps) => {
  const {userData} = useAuth();
  const messOwner = userData as MessOwner;
  const renderItem = useCallback(({ item }: { item: Student }) => (
    <StudentListItem student={item} onPress={onStudentPress} />
  ), [onStudentPress]);

  const keyExtractor = useCallback((item: Student) => item.$id, []);

  return (
    <FlatList
      data={messOwner.students.filter(student => 
        student.student_name.toLowerCase().includes(searchQuery.toLowerCase())
      )}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listContainer}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
      ListEmptyComponent={<EmptyState />}
    />
  );
};

const StudentListItem = memo(({ 
  student, 
  onPress 
}: { 
  student: Student; 
  onPress: (student: Student) => void;
}) => (
  <TouchableOpacity 
    style={styles.itemContainer}
    onPress={() => onPress(student)}
    accessibilityLabel={`View ${student.student_name}'s details`}
  >
    <Image source={{ uri: student.student_name }} style={styles.avatar} />
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{student.student_name}</Text>
      <Text style={styles.email}>{student.email}</Text>
    </View>
    <View style={[
      styles.status,
      { backgroundColor: student.status == 'active' ? '#4CAF50' : '#FF5252' }
    ]} />
  </TouchableOpacity>
));

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No students found</Text>
  </View>
);

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  email: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  status: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
  },
});



export default memo(StudentList);