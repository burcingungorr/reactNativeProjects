import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../component/Input';
import SignButton from '../../component/SignButton';
import auth from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';

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
  const handleLogin = async (formValues, { setSubmitting }) => {
    try {
      console.log('Form values:', formValues);
      await auth().signInWithEmailAndPassword(formValues.usermail, formValues.password);
      console.log('Giriş başarılı!');
      navigation.navigate('TextPage');
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
      <Text style={styles.title}>codetalks</Text>
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
            
            <SignButton theme='primary' title='Giriş' onPress={handleSubmit} />
          </View>
        )}
      </Formik>
      <Text style={styles.container_text}>Hesabın yoksa</Text>
      <SignButton theme='secondary' title='Kayıt' onPress={() => navigation.navigate('SignPage')} />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center',      
    backgroundColor: '#FF6347',
  },
  inputContainer: {
    width: '80%',             
    justifyContent: 'center', 
    alignItems: 'center',      
  },
  title: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 75,
  },
  container_title: {
    color: 'white',
    fontSize: 25,
    margin: 20,
  },
  container_text: {
    color: 'white',
    fontSize: 15,
  },
  errorText: {
    color: 'white',
    fontSize: 12,
    marginBottom: 8,

  },
});