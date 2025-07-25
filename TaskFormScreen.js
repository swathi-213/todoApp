import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TaskFormScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Normal');

  const saveTask = async () => {
    if (!title) return;
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      status: 'open',
      priority,
    };
    try {
      const jsonValue = await AsyncStorage.getItem('tasks');
      const tasks = jsonValue != null ? JSON.parse(jsonValue) : [];
      tasks.push(newTask);
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      navigation.navigate('Tasks');
    } catch (e) {
      // handle error
    }
  };

  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />
      <Text>Due Date (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} value={dueDate} onChangeText={setDueDate} />
      <Text>Priority</Text>
      <Picker
        selectedValue={priority}
        style={styles.input}
        onValueChange={(itemValue) => setPriority(itemValue)}
      >
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Normal" value="Normal" />
        <Picker.Item label="High" value="High" />
      </Picker>
      <Button title="Save Task" onPress={saveTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
}); 