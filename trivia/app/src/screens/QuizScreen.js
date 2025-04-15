import React from 'react'
import Questions from '../components/QuizScreenComponent/Questions'

const QuizScreen = ({route,navigation}) => {
  return (
    
<Questions route={route} navigation={navigation}/>
)
}

export default QuizScreen