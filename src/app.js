import Spinner from 'react-native-spinkit';
import firebase from 'firebase';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, CardItem } from './components/common';
import LoginForm from './components/LoginForm.js';


class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
      firebase.initializeApp({
      apiKey: 'AIzaSyBBjhIbgJz8Eu4BYz9KEaLQYUW3MRi5xQs',
      authDomain: 'auth-9f3be.firebaseapp.com',
      databaseURL: 'https://auth-9f3be.firebaseio.com',
      storageBucket: 'auth-9f3be.appspot.com',
      messagingSenderId: '12406181755'
    });

    firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       this.setState({ loggedIn: true });
     } else {
       this.setState({ loggedIn: false });
     }
   });
 }
 //can insert new page, maybe a more questions for firebase database?
  renderNewScreen() {
    switch (this.state.loggedIn) {
      case true:
        return (
            <CardItem>
              <Button onPress={() => firebase.auth().signOut()}>
                Log Out
              </Button>
            </CardItem>
        );
      case false:
        return <LoginForm />;
      default:
        return (
            <Spinner />
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Welcome' />
        {this.renderNewScreen()}
      </View>
    );
  }
}


export default App;
