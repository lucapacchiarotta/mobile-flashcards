import React from 'react'
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native'
import {addCard} from '../helpers/deckHelper'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import {white, inputTxtBorder, inputBck, buttonBorder, buttonBck} from '../utils/colors'

class NewCard extends React.Component {
  state = {
    question: '',
    answer: ''
  };

  onClickSaveCard() {
    if (this.state.question.length === 0 || this.state.answer.length === 0) {
      Alert.alert(
        'Error',
        'Card can be saved if it contains a valid question and a valid answer too',
        [{text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    } else {
      addCard(this.props.navigation.state.params.deckId, {
        question: this.state.question,
        answer: this.state.answer
      })(this.props.dispatch)
        .then((deck) => {
          this.setState({question: '', answer: ''});
          this.props.navigation.dispatch(NavigationActions.back())
        })
        .catch((err) => console.log('Error in adding card to deck'));
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.title}>{`You are adding a new card to deck ${this.props.navigation.state.params.deckTitle}`}</Text>
        <TextInput
          style={styles.input}
          placeholder='Question'
          underlineColorAndroid={'transparent'}
          value={this.state.question}
          onChangeText={(input) => this.setState({question: input})} />
        <TextInput
          style={styles.input}
          placeholder='Answer'
          underlineColorAndroid={'transparent'}
          value={this.state.answer}
          onChangeText={(input) => this.setState({answer: input})} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.onClickSaveCard()}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 24,
    marginTop: 30,
    width: 300,
    height: 80,
    padding: 15
  },
  button: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    width: Dimensions.get('window').width - 80, 
    backgroundColor: buttonBck,
    borderColor: buttonBorder,
    margin: 10
  },
  input: {
    alignItems: 'center',
    alignContent: 'center',
    width: Dimensions.get('window').width - 40,
    height: 45,
    backgroundColor: inputBck,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: inputTxtBorder,
    padding: 10,
    margin: 10
  },   
  buttonText: {
    color: white,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  }
});

export default connect()(NewCard);
