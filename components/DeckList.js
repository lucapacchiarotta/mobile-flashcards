import React from 'react'
import {StyleSheet, FlatList, Text} from 'react-native'
import {connect} from 'react-redux';
import {getDeck, getDecks, addDeck} from '../helpers/deckHelper'
import Deck from './Deck'

class DeckList extends React.Component {
  
  state = {
    deckSelected: null
  };

  componentDidMount() {
    if (this.props.navigation.state.params &&
        this.props.navigation.state.params.deckId != null)
    {
      this.setState({
          deckSelected: this.props.navigation.state.params.deckId
        }, 
        () => getDeck(this.props.navigation.state.params.deckId)(this.props.dispatch)
      )
    } else {
      getDecks()(this.props.dispatch);
    }
  }

  onClickDeck(deck_id) {
    let deck = this.props.decks.filter(deck => deck.id === deck_id)[0];

    this.props.navigation.navigate('DeckList', {
      name: deck.title,
      deckId: deck_id
    });
  }

  onClickAddCard(deck_id) {
    let deck = this.props.decks.filter((deck) => deck.id === deck_id)[0];
    this.props.navigation.navigate('AddCard', {
      deckId: deck_id, 
      deckTitle: deck.title,
    });
  }
  onClickQuiz(deck_id) {
    let deck = this.props.decks.filter((deck) => deck.id === deck_id)[0];
    this.props.navigation.navigate('Quiz', {
      deck: deck, 
      deckTitle: deck.title,
    });
  }
  renderItem = ({item}) => {
    return <Deck
      {...item}
      onPress={(deck_id) => this.onClickDeck(deck_id)}
      onClickAddCard={(deck_id) => this.onClickAddCard(deck_id)}
      onClickQuiz={(deck_id) => this.onClickQuiz(deck_id)}
      collapsed={this.state.deckSelected === null} />
  }

  render() {
    return this.props.decks.length === 0 ? (
      <Text style={styles.text}>Now are not available decks! Please create your first deck</Text>
    ) : (
      <FlatList
        style={styles.container}
        data={this.state.deckSelected != null ? this.props.deck : this.props.decks}
        keyExtractor={(item, index) => item.id}
        renderItem={this.renderItem} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    decks: state.decks ? state.decks : [],
    deck: state.deck ? [state.deck]: []
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, 
  text:{
    flex: 1,
    textAlign:'center',
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    marginTop: 100
  }
})

export default connect(mapStateToProps)(DeckList);
