import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import * as firebase from 'firebase';
export default class LoginSignScr extends React.Component {
    constructor() {
        super();
        this.state = {
            first_name:'',
            last_name:'',
            emailId: '',
            password: '',
            contact:'',
            address:'',
            username:'',
            isModalVisible: 'false',
            confirmPassword: ''
        }
    }
   userSignUp= (emailId, password,confirmPassword)=>{
       if(password !== confirmPassword){
           return Alert.alert("password doesn't match\nCheck your password")
       }
       else{
           firebase.auth().createUserWithEmailAndPassword(emailId, password)
           .then(()=>{
               db.collection('users').add({
                   first_name:this.state.first_name,
                   last_name:this.state.last_name,
                   contact:this.state.contact,
                   email_id:this.state.emailId,
                   address:this.state.address

               })
               return Alert.alert(
                   'User Added Successfully',
                   '',
                   [
                       {text:'OK', onPress:()=> this.setState({"isModalVisible": false})},

                   ]
               );
           })
           .catch((error)=> {
               var errorCode = error.code;
               var errorMessage  = error.message;
               return Alert.alert(errorMessage)
           });
       }
   }
  
    login=async(email,password)=>{
        if (email && password){
          try{
            const response = await firebase.auth().signInWithEmailAndPassword(email,password)
            if(response){
              this.props.navigation.navigate('Transaction')
            }
          }
          catch(error){
            switch (error.code) {
              case 'auth/user-not-found':
                Alert.alert("user dosen't exists")
                console.log("doesn't exist")
                break
              case 'auth/invalid-email':
                Alert.alert('incorrect email or password')
                console.log('invaild')
                break
            }
          }
        }
        else{
            Alert.alert('enter email and password');
        }
    }
  
    showModal = ()=>{
        return(
            <Modal
            animationType = "fade"
            transparent={true}
            visible={this.state.isModalVisible}
            >
            <View style={styles.modalContainer}>
      <ScrollView style={{width:'100%'}}>
        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
        <Text
          style={styles.modalTitle}
          >Registration</Text>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Email"}
          keyboardType ={'email-address'}
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Confrim Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              confirmPassword: text
            })
          }}
        />
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
            }
          >
          <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={()=>this.setState({"isModalVisible":false})}
          >
          <Text style={{color:'#ff5722'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
                
            </Modal>
        )
    }
    render() {


        return (
            
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>BOOKSANTA APP</Text>
                </View>
                <View>
                    <TextInput
                        style={styles.textbox}
                        placeholder="enter email id"
                        keyboardType='email-address'
                        onChangeText={(text) => {
                            this.setState({ emailId: text })
                        }}
                    />
                    <TextInput
                        style={styles.textbox}
                        secureTextEntry={true}
                        placeholder="enter your password"
                        onChangeText={(text) => {
                            this.setState({ password: text })
                        }}
                    />
                    <TouchableOpacity 
                     style={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7, alignItems:'center'}}
                     onPress={()=>{this.login(this.state.emailId ,this.state.password)}}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7, alignItems:'center'}}>
                        <Text>SignUp</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        color: '#a7f986',
        alignItems: 'center'
    },
    title:{
        justifyContent: 'center',
        color:'#ea3838',
        fontSize:65,
    },
    textbox:{
        width:300,
        height:40,
        borderBottomWidth:1.5,
        borderColor: '#ff8a65',
        margin:10,
        paddingLeft: 10
    }
})