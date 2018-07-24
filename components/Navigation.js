import React from 'react'
import {TabNavigator, StackNavigator} from 'react-navigation'
import {Foundation, MaterialCommunityIcons} from '@expo/vector-icons'
import DeckList from './DeckList'
import NewCard from './NewCard'
import Quiz from './Quiz'
import NewDeck from './NewDeck'
import {navigatorBarBck, white} from '../utils/colors'

const Tabs = TabNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks list',
      tabBarIcon: ({tintColor}) => (
        <MaterialCommunityIcons name='cards' size={20} color={tintColor} />
      )
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({tintColor}) => 
        <Foundation name='page-add' size={20} color={tintColor} />
    }
  }
  }, {
    navigationOptions: {
    header: null
  }
})

export const Navigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      title: 'Details',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: navigatorBarBck
      }
    }
  },
  AddCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Add a card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: navigatorBarBck
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: navigatorBarBck
      }
    }
  }

});
