import React from 'react';
import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/AuthScreenComponents/Input';
import { showMessage } from 'react-native-flash-message';
import google from '../../assets/icons/google.png'; 
import Animation from '../../assets/animations/AnimationBook';

const validationSchema = Yup.object({
  usermail: Yup.string()
    .email('Geçersiz e-posta adresi')
    .required('E-posta alanı boş bırakılamaz'),
  password: Yup.string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .required('Şifre alanı boş bırakılamaz'),
});

const initialFormValues = {
  usermail: '',
  password: '',
};

const Login = ({ navigation }) => {
  const handleLogin =  (formValues, { setSubmitting }) => {
    try {
      console.log('Form values:', formValues);
      console.log('Giriş başarılı!');
      navigation.navigate('AppTabs');
    } catch (error) {
      console.log('Hata:', error);
      showMessage({
        message: 'Bir hata oluştu.',
        type: 'danger',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
        <TouchableOpacity> 
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
    padding:10,
    borderRadius:30

  },
  container_title: {
    color: 'white',
    fontSize: 25,
    margin: 20,
    marginBottom: 40,

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

  }
});