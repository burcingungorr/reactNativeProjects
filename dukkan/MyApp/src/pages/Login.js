import React from 'react';
import { SafeAreaView, StyleSheet, Text, View ,AsyncStorage} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import usePost from '../hooks/usePost';


const Login = (navigation) => {

 const {error, loading, data,post } =usePost()

  const loginValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Kullanıcı adı zorunludur'),
    password: Yup.string()
      .min(6, 'Şifre en az 6 karakter olmalıdır')
      .required('Şifre zorunludur'),
  });

  const handleLogin = (values) => {
    post('https://fakestoreapi.com/auth/login',values)
  };


    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    if (error) {
        return <Text>Hata Oluştu: {error}</Text>;
    }

    if(data){
      if(data.status=='Error'){
        <Text>Hata Oluştu: {error}</Text>;
      }else{
    //    AsyncStorage.setItem('@USER','')
        navigation.navigate('ProductPage')
      }

      console.log(data)

    }



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo_container}></View>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <View style={styles.body_container}>
            <Input
              placeholder='Kullanıcı adını giriniz...'
              value={values.username}
              onType={handleChange('username')}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
            <Input
              placeholder='Şifrenizi giriniz...'
              value={values.password}
              onType={handleChange('password')}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <Button text='Giriş Yap' onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo_container: {},
  body_container: {},
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
});
