import React from 'react'
import {Constants} from 'expo'
import {StyleSheet, Text, View, StatusBar, Picker} from 'react-native'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {setLocalNotification} from './helpers/notification'
import {Navigator} from './components/Navigation'
import {blue, statusBarBck} from './utils/colors'

export default class App extends React.Component {

  componentDidMount(){
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.main}>
          <View
            style={styles.statusBarMain}>
            <StatusBar
              translucent
              backgroundColor={statusBarBck}
              barStyle='light-content'
            />
          </View>
          <Navigator initialRouteName={'Home'} />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  statusBarMain: {
    backgroundColor: statusBarBck,
    height: Constants.statusBarHeight
  }
})
