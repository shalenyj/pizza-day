import { Meteor } from 'meteor/meteor';

import React from 'react';
import ReactDom from 'react-dom';
import { Row, Col } from 'react-flexbox-grid';
import { Accounts } from 'meteor/accounts-base';

import Button from 'react-md/lib/Buttons';
import TextField from 'react-md/lib/TextFields';
import FocusContainer from 'react-md/lib/Helpers/FocusContainer';

import { handleResult } from '../../utils/handle-result';

const getValueFromField = form => field => form[field].value || '';

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.loginDefault = this.loginDefault.bind(this);
    this.state = { visible: false };
  }

  loginDefault(event){
    event.preventDefault();
    const getFormFieldValue = getValueFromField(event.target);
    const email = getFormFieldValue('email');
    const password = getFormFieldValue('password');

    Meteor.loginWithPassword({ email }, password, function(err){
        if (err.reason ==='Incorrect password' || err.reason==='User not found') {
          throw new Meteor.Error('Incorrect password or email');
        }
    });
  }

  loginFacebook(event){
    event.preventDefault();
    Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(err){
        if (err) {
            console.log('Handle errors here: ', err);
        }
    });
  }

  render() {

    let divStyle ={
      position:'absolute',
      width:'40%'
    }
    let buttonStyle={
      margin:'15px 10px 20px 40px',
      width:'140px'
    }
    let imgStyle = {
      position:'relative',
      width:'70%'
    }
    const { visible } = this.state;
    return (
      <div>
        <h1 className="text-center m-t-10">Sign In</h1>
      <Row around="xs">
      <Col xs={4}>
          <FocusContainer
            focusOnMount
            component="form"
            className="md-grid"
            onSubmit={this.loginDefault}
          >
      <TextField required id="email" label="Email" type="email"   />
      <TextField required id="password" label="Password" type="password"/>
      <Button raised primary type="submit" label=" Sign In " style={buttonStyle} />
      <Button raised primary type="button" label="With Facebook"  style={buttonStyle} onClick={this.loginFacebook}/>
        </FocusContainer>
          </Col>
          <Col xs={4}>

            <div style={divStyle}>
                <img
                  src="http://www.castigliasva.com/images/Castiglias_Pizzaman_Catering.png"
                  style={imgStyle}
                />
            </div>
          </Col>
        </Row>
    </div>
    );
  }
}


export default SignInPage;
