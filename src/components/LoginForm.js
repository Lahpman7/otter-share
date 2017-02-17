import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, CardItem, Input } from './common';
import firebase from 'firebase';
//import from custom
import Spinner from 'react-native-spinkit';

class LoginForm extends Component {

  state = { email: '', password: '', warning: '', loading: false };

  onButtonPress() {
      const { email, password } = this.state;
      const regex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(csumb)\.edu$/;

      const verifyEmail = (input) => {
        return regex.test(input);
      };

      this.setState({ warning: '', loading: true });

      //console.log("after function: " + verifyEmail(email));
      if (verifyEmail(email)) {
        console.log('Verfied');
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this));
        });
      }
      else {
        console.log('Verification failed.');
        this.onLoginFail();
      }
    }

      onLoginFail() {
        this.setState({ warning: 'Account creation failed!', loading: false });
      }

      onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            warning: ''
        });
      }

      onCreatePress() {
        const { email, password } = this.state;

        this.setState({ loading: true });
        this.setState({ warning: '' });

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .catch(() => {
            this.setState({ warning: 'Sorry, please try another email!' });
          });
      }

      renderButton() {
        if (this.state.loading) {
          return (
            <View style={styles.spinnerStyle}>
              <Spinner
                type={'ThreeBounce'}
                size={50}
              />
            </View>
        );
        }
        //returns button if not loading, duplicate for register user
        return (
          <Button onPress={this.onButtonPress.bind(this)}>
            Log In
          </Button>
        );
      }

  render() {
    return (
      <Card>
        <CardItem>
          <Input
            placeholder="user@csumb.edu"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardItem>

        <CardItem>
          <Input
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={textThatUserJustEntered =>
              this.setState({ password: textThatUserJustEntered })}
            secureTextEntry
          />
        </CardItem>

          <Text style={styles.warningTextStyle}>
            {this.state.warning}
          </Text>


        <CardItem>
          {this.renderButton()}
        </CardItem>

        <CardItem>
          <Button onPress={this.onCreatePress.bind(this)}>
            Create Account
          </Button>
        </CardItem>
      </Card>
    );
  }
}

const styles = {
  warningTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    justifyContent: 'center'
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

};

export default LoginForm;
