import React from "react";
import { View, StyleSheet, Pressable, TextInput, Alert, Text} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



class AddNoteScreen extends React.Component {
  state = {
    newNoteText: "" 
  }

  AddNewNote = async () => {
    console.log("button pressed")

    if(this.state.newNoteText.length < 1)
      return;

      if(this.state.newNoteText == "clear"){
        AsyncStorage.clear()  
        this.CreateAlert("Data cleared!")
        return;
      }

    let data = JSON.parse(await AsyncStorage.getItem('notes'))
    let newData = [this.state.newNoteText]

    if(data.length !== null && data.find(note => note == newData)){
      this.CreateAlert("Note already exsist!", "\""+newData+"\"")
      return;
    }

    if(data !== null)
      newData = newData.concat(data)
    
    await AsyncStorage.setItem('notes', JSON.stringify(newData))
    console.log(JSON.parse(await AsyncStorage.getItem('notes')))

    console.log("data: "+ data)
    console.log("newData: "+ newData)

    this.CreateAlert("New note added successfully!", "Note: "+this.state.newNoteText)
    this.setState({newNoteText: ""})
  }

  CreateAlert = (title, message) =>
    Alert.alert(
    title,
    message,
    [
        { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );

  render() {
    return (
        <View style={styles.viewContainer}>
            <TextInput
              style = {styles.textInput}
              placeholder = "Write the note here"
              placeholderTextColor = "#abafb5"
              textAlign={"center"}
              value = {this.state.newNoteText}
              onChangeText = {val => this.setState({newNoteText: val})}
            />
            <Pressable style={styles.button} onPress={this.AddNewNote}>
              <Text style={styles.buttonText}>Add note!</Text>
            </Pressable>
      </View>
    );
  }
}
export default AddNoteScreen;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "#5f6a76",
  },
  button: {
    position: "absolute",
    height: "5%",
    width: "70%",
    bottom: 25,
    left:"15%",
    backgroundColor: "#353E49",
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: "#d4d6d9",
    fontSize: 18,
    fontWeight: "bold",
  },
  textInput: {
    height: "10%",
    marginHorizontal: "5%",
    width: "90%",
    bottom: "15%",
    left:0,
    position: "absolute",
    color: "#d4d6d9",
    backgroundColor: "#6a7784",
    borderRadius: 10,
  },
});

