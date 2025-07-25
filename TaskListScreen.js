import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function TaskListScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadTasks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tasks');
      setTasks(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      setTasks([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const markComplete = async (id) => {
    const updated = tasks.map(task => task.id === id ? { ...task, status: 'complete' } : task);
    setTasks(updated);
    await AsyncStorage.setItem('tasks', JSON.stringify(updated));
  };

  const deleteTask = async (id) => {
    const updated = tasks.filter(task => task.id !== id);
    setTasks(updated);
    await AsyncStorage.setItem('tasks', JSON.stringify(updated));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <View style={{ flex: 1 }}>
        <Text style={item.status === 'complete' ? styles.completed : undefined}>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>Due: {item.dueDate}</Text>
        <Text>Status: {item.status}</Text>
        <Text>Priority: {item.priority}</Text>
      </View>
      {item.status !== 'complete' && (
        <Button title="Complete" onPress={() => markComplete(item.id)} />
      )}
      <Button title="Delete" color="red" onPress={() => deleteTask(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <Text>No tasks to show.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Add Task')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
}); 