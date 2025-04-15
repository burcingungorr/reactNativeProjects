import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity, Image, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { showMessage } from 'react-native-flash-message';
import Input from '../../components/AuthScreenComponents/Input';
import google from '../../assets/icons/google.png'; 
import AnimationBook from '../../components/AuthScreenComponents/AnimationBook';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const validationSchema = Yup.object({
  email: Yup.string().email('Geçersiz e-posta').required('E-posta gerekli'),
  username: Yup.string().min(3, 'En az 3 karakter').required('Kullanıcı adı gerekli'),
  password: Yup.string().min(6, 'En az 6 karakter').required('Şifre gerekli'),
});
GoogleSignin.configure({
  webClientId: '813304265589-7mcj87ur682n7q68aqosjpgvop3vr3p2.apps.googleusercontent.com', 
});

const Sign = ({ navigation }) => {
  const handleSignUp = async (formValues) => {
    const { email, password, username } = formValues;
  
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
  
      await firestore().collection('users').doc(user.uid).set({
        email,
        username,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  
      Alert.alert(
        'Başarılı!',
        'Kayıt başarılı. Şimdi giriş yapabilirsiniz.',
        [
          {
            text: 'Tamam',
            onPress: () => navigation.goBack(),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error(error);
      showMessage({ message: error.message, type: 'danger' });
    }
  };
  
const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices(); 
      const { idToken } = await GoogleSignin.signIn();
  
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
  
      console.log('Google ile giriş başarılı:', userCredential.user);
      navigation.navigate('AppTabs');
    } catch (error) {
      console.error('Google Giriş Hatası:', error);
      showMessage({
        message: `Google giriş başarısız: ${error.message}`,
        type: 'danger',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
  <AnimationBook/>
          <View style={styles.header}>         
         <Text style={styles.subtitle}>KAYIT OL</Text>
          </View>

          <Formik
            initialValues={{ 
              email: '', 
              username: '', 
              password: '', 
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View style={styles.formContainer}>
                <Input
                  placeholder="E-posta"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  keyboardType="email-address"
                />
                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <Input
                  placeholder="Kullanıcı Adı"
                  value={values.username}
                  onChangeText={handleChange('username')}
                />
                {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

                <Input
                  placeholder="Şifre"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange('password')}
                />
                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <View style={styles.loginContainer}>
                <TouchableOpacity onPress={handleSubmit} style={styles.signButton}>
                <Text style={styles.buttonText}>Kayıt Ol</Text>
                </TouchableOpacity>

                  <Text style={styles.loginText}>Hesabınız var mı?</Text>
                  <TouchableOpacity style={styles.loginButton} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Giriş Yap</Text>
                </TouchableOpacity>

                </View>
              </View>
            )}
          </Formik>

          <View style={styles.submitgoogle}>
    <TouchableOpacity onPress={handleGoogleLogin}> 
           <Image source={google} style={[styles.icon]} />
           </TouchableOpacity>
              </View>
              </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a95e13',
    justifyContent: 'center',  
    alignItems: 'center',  
  },

  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    backgroundColor:'#87CEFA',
    padding:10,
    borderRadius:30

  },
  subtitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    justifyContent:'center',
    textAlign:'center',

  },

  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginBottom: 10,
  },
  signButton: {

    marginTop: 20,
  },
  loginContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    marginBottom: 15,
    marginTop: 15,

  },
  signButton:{
    borderWidth:1,
    padding:7,
    borderRadius:10,
    borderColor:'black',
    backgroundColor:'white'
  },
  buttonText:{
    fontSize:16,
    color:'black'
  },
  loginButton:{
    borderWidth:1,
    padding:7,
    borderRadius:10,
    borderColor:'black',
  },
  icon:{
    width:30,
    height:30,
    margin:20,


  },
  submitgoogle:{
    margin:20,
    borderTopWidth:1,
    width:80,
    marginBottom: 70,

  }
});

export default Sign;