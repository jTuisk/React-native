import React from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


class NoteScreen extends React.Component {
  state = {
    notes: []
  }

  componentDidMount(){
    this.GetData()
  }

  conponentDidUpdate(){
    console.log("Test")
    this.GetData() 
  }

  GetData = async () => {
    try  {
      let data = JSON.parse(await AsyncStorage.getItem('notes'))
      console.log(data) 
      if(data !== null){ // remove this if you add remote note!
        if(data !== this.state.notes)
          this.setState({notes: data})
      }
    } catch(e){

    }
  }

  render() {
    if(this.state.notes.length !== 0){
      return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
            {this.state.notes.map(note => <Note noteTitle={note} key={note} />)}
        </ScrollView> 
      );
    }else{
      return (
        <ScrollView>
            <Text style={styles.noDataText}>Zero notes found!</Text> 
        </ScrollView>
      );
    }
  }
} 
export default NoteScreen;

const Note = (props) => {
    return (
        <Text style={styles.noteText }>{props.noteTitle}</Text>
    )
}

const styles = StyleSheet.create({
  scrollView:{
    flexDirection: "column", //ScrollViewllä toimii vain column, muut estävät scrollaamisen
  },
  scrollViewContainer: {
    alignItems: "baseline",
    justifyContent: "space-evenly",
    backgroundColor: "#5f6a76",
  },
    noteText: {
    marginHorizontal: 10,
    fontSize: 20,
    color: "#d4d6d9"
  },
  noDataText: {
    textAlign: "center",
    fontSize: 20,
    padding: 5,
    fontSize: 30,
  },
});



