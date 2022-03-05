import {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TextInputComponent, ScrollView} from 'react-native';
import { theme } from './colors';

export default function App() {
  const[working, setWorking] = useState(true);
  const[text, setText] = useState("");
  const[toDos, setTodDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload)
  const addToDo = () => {
    if(text === ""){
      return;
    }
    const newToDos = {...toDos,
   [Date.now()]: {text, work: working} };
    setTodDos(newToDos);
    setText("");
  };
  console.log(toDos);
// 중괄호 두번 쓰고 ... 하면 모든 스타일을 가져올 수 있다.
  return (
    <View style={styles.container}>
      <StatusBar style= "dark"/>
      <View style = {styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style = {{...styles.button, color: working ? theme.black: theme.gray}}>Work</Text>  
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style = {{...styles.button, color: !working ? theme.black: theme.gray}}>Travel</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput 
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        returnKeyType = "Done"
        value={text}
        placeholder={working ? "Add a To Do": "Where do you want to go"}
        placeholderTextColor = "#DEDEDE"
        style = {styles.input}/>
        <ScrollView>{Object.keys(toDos).map(key=> <View style={styles.todo} key = {key}>
          <Text>{toDos[key].text}</Text>
        </View>)}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal : 40,
  },
  header :{
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop : 100,
  },
  button :{
    fontSize : 30,
    fontWeight : "600"
  },

  input :{
    backgroundColor: "#808080",
    color : "#DEDEDE",
    fontWeight : "600",
    paddingVertical : 15,
    paddingHorizontal: 20,
    borderRadius : 30,
    marginTop : 20

  }
});
