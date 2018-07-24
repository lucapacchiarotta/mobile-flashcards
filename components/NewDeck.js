import React from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import {addDeck} from '../helpers/deckHelper'
import {connect} from 'react-redux'
import {buttonBorder, buttonBck, inputTxtBorder, inputBck, white} from '../utils/colors'

class NewDeck extends React.Component {

  state = {
    deckTitle: ''
  }

  onClickSaveDeck() {
    addDeck({ title: this.state.deckTitle, questions: [] })(this.props.dispatch)
      .then((deck) => {
        this.setState({deckTitle: ''}, () => {
          this.props.navigation.navigate('Home');
          this.props.navigation.navigate('DeckList', {
            name: deck.title,
            deckId: deck.id
          })
        })
      })
      .catch(err => console.log('Error: save deck', err));
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.title}>Deck's name</Text>
        <TextInput
          style={styles.input}
          value={this.state.deckTitle}
          underlineColorAndroid={'transparent'}
          onChangeText={(input) => this.setState({deckTitle: input})} />

        <View>
          <TouchableOpacity
            style={[styles.button]}
            disabled={!(this.state.deckTitle.length > 0)}
            onPress={() => this.onClickSaveDeck()}>
            <Text style={styles.buttonText}>Add the deck</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignContent: 'center'
  },
  title: {
    marginTop: 70,
    width: 200,
    height: 40,
    fontSize: 24,
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center'
  },
  input: {
    alignItems: 'center',
    alignContent: 'center',
    width: Dimensions.get('window').width - 40,
    height: 44,
    fontSize: 22,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: inputBck,
    borderWidth: 1,
    borderColor: inputTxtBorder
  },
  button: {
    margin: 5,
    marginTop: 30,
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
    width: Dimensions.get('window').width - 80,
    backgroundColor: buttonBck,
    borderColor: buttonBorder
  },
  buttonText: {
    color: white,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  }
});

export default connect()(NewDeck);
