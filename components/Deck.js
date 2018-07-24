import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'
import {deckBorder, deckBck, deckTitle, deckSubtitle, white, buttonBorder, buttonBck} from '../utils/colors'


const Deck = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={!props.collapsed}
      onPress={() => props.onPress(props.id)}>
      
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subTitle}>
          {props.questions.length > 0
            ? `${props.questions.length} card${props.questions.length > 1  ? 's' : ''}`
            : 'No cards available'}
        </Text>
        {!props.collapsed && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.onClickAddCard(props.id)}>
              <Text style={styles.buttonText}>Add a card</Text>
            </TouchableOpacity>
            {props.questions.length > 0  && 
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.onClickQuiz(props.id)}>
              <Text style={styles.buttonText}>Go to quiz</Text>
            </TouchableOpacity>}
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: deckBck,
    borderBottomWidth: 1,
    borderBottomColor: deckBorder
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: deckTitle,
    alignSelf: 'center',
    marginTop: 15
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: deckSubtitle,
    alignSelf: 'center',
    marginBottom: 15
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  button: {
    margin: 6,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: buttonBorder,
    width: Dimensions.get('window').width - 80, 
    backgroundColor: buttonBck
  },   
  buttonText: {
    color: white,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default Deck;
