import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  QuerySnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FIRESTORE_DB } from "../.../../../firebaseConfig";

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

const List = ({ navigation }: any) => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [todo, setTodo] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // access firebase database
  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, "todos");
    // we can get snapshot of the collection
    // snapshot is for instant updates
    // onSnapshot is a listener that listens to the collection
    // onSnapshot is a function that takes a collection and a callback function
    // the callback function is called whenever the collection is updated
    // the callback function takes a snapshot as an argument
    // the snapshot contains the data of the collection
    const subscribe = onSnapshot(todoRef, {
      next: (snapshot: QuerySnapshot<DocumentData>) => {
        console.log("UPDATED");
        const todos: Todo[] = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          // Ensure the data has the required properties to match Todo interface
          if (data.title && typeof data.done === "boolean") {
            todos.push({
              id: doc.id,
              title: data.title,
              done: data.done,
            });
          }
        });
        setTodos(todos);
      },
    });

    return () => subscribe();
  }, []);

  const addTodo = async () => {
    const doc = await addDoc(collection(FIRESTORE_DB, "todos"), {
      title: todo,
      done: false,
    });
    setTodo("");
  };

  const renderTodo = ({ item }: any) => {
    const ref = doc(FIRESTORE_DB, `todos/${item.id}`);

    const toggleDone = async () => {
      await updateDoc(ref, { done: !item.done });
    };

    const deleteItem = async () => {
      await deleteDoc(ref);
    };

    return (
      <Animated.View style={[styles.todoContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={toggleDone} style={styles.todo}>
          {item.done ? (
            <Ionicons name="checkmark-circle" size={28} color="#4CAF50" />
          ) : (
            <Entypo name="circle" size={28} color="#E0E0E0" />
          )}
          <Text style={[styles.todoText, item.done && styles.completedText]}>
            {item.title}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={deleteItem} style={styles.deleteButton}>
          <Ionicons name="trash" size={20} color="#FF5252" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <Animated.View style={[styles.innerContainer, { opacity: fadeAnim }]}>
        <Text style={styles.title}>✨ Todo List</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="What needs to be done?"
            placeholderTextColor="#9E9E9E"
            onChangeText={(text: string) => setTodo(text)}
            value={todo}
            style={styles.input}
            multiline={false}
          />
          <Pressable
            style={[styles.addButton, todo === "" && styles.addButtonDisabled]}
            onPress={addTodo}
            disabled={todo === ""}
          >
            <LinearGradient
              colors={
                todo === "" ? ["#BDBDBD", "#BDBDBD"] : ["#4CAF50", "#45A049"]
              }
              style={styles.addButtonGradient}
            >
              <Ionicons name="add" size={24} color="white" />
            </LinearGradient>
          </Pressable>
        </View>

        {todos.length > 0 ? (
          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>
              {todos.filter((t) => !t.done).length} of {todos.length} tasks
              remaining
            </Text>
            <FlatList
              data={todos}
              renderItem={(item) => renderTodo(item)}
              keyExtractor={(todo: Todo) => todo.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="checkmark-done-circle"
              size={64}
              color="rgba(255,255,255,0.5)"
            />
            <Text style={styles.emptyText}>No tasks yet!</Text>
            <Text style={styles.emptySubText}>Add a task to get started</Text>
          </View>
        )}
      </Animated.View>
    </LinearGradient>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 30,
    textAlign: "center",
    color: "#FFFFFF",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 30,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  addButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonGradient: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  listContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.9)",
  },
  listContent: {
    paddingBottom: 20,
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 16,
    marginVertical: 6,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  todoText: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#9E9E9E",
    opacity: 0.7,
  },
  todo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255, 82, 82, 0.1)",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 16,
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 8,
    textAlign: "center",
  },
});
