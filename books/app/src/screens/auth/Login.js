import React from 'react';
import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/AuthScreenComponents/Input';
import { showMessage } from 'react-native-flash-message';
import google from '../../assets/icons/google.png'; 
import AnimationBook from '../../components/AuthScreenComponents/AnimationBook';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const validationSchema = Yup.object({
  usermail: Yup.string().email('Geçersiz e-posta adresi').required('E-posta gerekli'),
  password: Yup.string().min(6, 'Şifre en az 6 karakter').required('Şifre gerekli'),
});

const initialFormValues = {
  usermail: '',
  password: '',
};
GoogleSignin.configure({
  webClientId: '813304265589-7mcj87ur682n7q68aqosjpgvop3vr3p2.apps.googleusercontent.com', 
});

const Login = ({ navigation }) => {
  const handleLogin = async (formValues, { setSubmitting }) => {
    const { usermail, password } = formValues;

    try {
      const userCredential = await auth().signInWithEmailAndPassword(usermail, password);
      console.log('Giriş başarılı:', userCredential.user);
      navigation.navigate('AppTabs');
    } catch (error) {
      console.error(error);
      showMessage({
        message: `Giriş başarısız: ${error.message}`,
        type: 'danger',
      });
    } finally {
      setSubmitting(false);
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
      <Text style={styles.container_title}>GİRİŞ</Text>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={styles.inputContainer}>
            <Input
              placeholder='E-posta'
              value={values.usermail}
              onChangeText={handleChange('usermail')}
              errorMessage={touched.usermail && errors.usermail ? errors.usermail : ''}
            />
            {touched.usermail && errors.usermail && (
              <Text style={styles.errorText}>{errors.usermail}</Text>
            )}
            <Input
              placeholder='Şifre'
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              errorMessage={touched.password && errors.password ? errors.password : ''}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity onPress={handleSubmit} style={styles.loginButton}>
            <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <Text style={styles.container_text}>Hesabın yoksa</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Sign')} style={styles.signButton}>
    <Text style={styles.buttonText}>Kayıt Ol</Text>
    </TouchableOpacity>
    
    <View style={styles.logingoogle}>
    <TouchableOpacity onPress={handleGoogleLogin}> 
  <Image source={google} style={[styles.icon]} />
</TouchableOpacity>

    </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center',      
    backgroundColor: '#a95e13',
  },
  inputContainer: {
    width: '80%',             
    justifyContent: 'center', 
    alignItems: 'center',      
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    backgroundColor:'#87CEFA',
    borderRadius:30

  },
  container_title: {
    color: 'white',
    fontSize: 25,
    marginBottom: 20,

  },
  container_text: {
    color: 'white',
    fontSize: 15,
    marginVertical:10
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,

  },
  loginButton:{
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
  signButton:{
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
  logingoogle:{
    margin:25,
    borderTopWidth:1,
    width:80,
    marginBottom: 120,

  }
});