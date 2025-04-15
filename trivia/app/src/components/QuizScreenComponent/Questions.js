import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import questions from '../../../assets/questions.json';
import Timer from './Timer';

const Questions = ({ route, navigation }) => {
  const difficulty = route.params?.difficulty || 'Kolay';
  const totalQuestions = 10;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (difficulty === 'Kolay') {
      setCurrentQuestion(questions.easy[questionIndex]);
    } else if (difficulty === 'Zor') {
      setCurrentQuestion(questions.hard[questionIndex]);
    }
  }, [difficulty, questionIndex]);

  const handleOptionSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.answer) {
      setCorrectCount(prev => prev + 1); 
    }
  };

  const handleNextQuestion = () => {
    if (questionIndex < 9) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setSelectedAnswer(null);
    }
  };

  const handleFinish = () => {
    navigation.navigate('Result', { correctAnswers: correctCount, difficulty });
  };
  
  const handleTimeUp = () => {
    setIsTimeUp(true);
    navigation.navigate('Result', { correctAnswers: correctCount, difficulty });
  };
  return (
    <View style={styles.container}>
      <View style={styles.container_body}></View>

      {!isTimeUp && <Timer totalTime={40} onTimeUp={handleTimeUp} />}

      <View style={styles.container_down}>
        <Text style={styles.title}>Soru {questionIndex + 1}/{totalQuestions}</Text>
        {currentQuestion ? (
          <>
            <Text style={styles.question}>{currentQuestion.question}</Text>
            <FlatList
              data={currentQuestion.options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.optionButton, item === selectedAnswer && styles.selectedOption]}
                  onPress={() => handleOptionSelect(item)}
                  disabled={isTimeUp}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </>
        ) : (
          <Text style={styles.question}>Yükleniyor...</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.navButton, isTimeUp && styles.disabledButton]}
          onPress={handlePreviousQuestion}
          disabled={isTimeUp}
        >
          <Text style={styles.navButtonText}>Önceki</Text>
        </TouchableOpacity>
        {questionIndex < 9 ? (
          <TouchableOpacity
            style={styles.navButton}
            onPress={handleNextQuestion}
          >
            <Text style={styles.navButtonText}>Sonraki</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.navButton}
            onPress={handleFinish}
          >
            <Text style={styles.navButtonText}>Bitir</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_body: {
    backgroundColor: 'mediumorchid',
    position: 'absolute', 
    top: 0, 
    width: '100%', 
    height: '33.33%', 
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    zIndex: -1, 
  },
  container_down: {
    borderColor: 'yellow',
    borderWidth: 1,
    padding: 25,
    borderRadius: 30,
    backgroundColor: 'white',
    marginBottom: 50,
    width: '80%',
    height: '55%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 25,
  },
  optionButton: {
    padding: 15,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: 'mediumorchid',
    borderWidth: 2,
  },
  selectedOption: {
    backgroundColor: 'mediumorchid',
  },
  optionText: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    backgroundColor: 'mediumorchid',
    padding: 8,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
    margin: 10,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default Questions;
