/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Svg, Circle, Rect } from 'react-native-svg';
import { Audio } from 'expo-av';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    position: 'absolute',
    top: 5,
    left: 20,
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold',
  },
  frame: {
    position: 'absolute',
    top: 65,
    left: 20,
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold',
  },
  highScore: {
    position: 'absolute',
    top: 35,
    left: 20,
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold',
  },
  gameOver: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  finalScore: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  newGame: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
});

const TICK = 20;
const MOVE = 5;

const MiniGame = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [frame, setFrame] = useState(1);
  const [direction, setDirection] = useState('up');
  const ballRef = useRef(null);
  const svgRef = useRef(null);
  const [obstaclePosition, setObstaclePosition] = useState({
    x: screenWidth - 30,
    y: Math.random() * 300,
  });

  const [gameLoop, setGameLoop] = useState(null);
  const [ballCy, setBallCy] = useState(150);

  const moveBall = useCallback(() => {
    setBallCy(prev => {
      if (direction === 'up') {
        return prev - MOVE;
      }
      return prev + MOVE;
    });
  }, [direction]);

  // Play sound effect when ball collides with obstacle
  const playSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      // eslint-disable-next-line global-require
      await soundObject.loadAsync(require('../../../assets/game_over.wav'));
      await soundObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle touch events
  const handleTouch = () => {
    let up = Math.random() * 10 > 5;

    setBallCy(prev => {
      if (prev + 80 > screenHeight) {
        up = false;
      }

      if (prev - 80 <= 0) {
        up = true;
      }

      return up ? prev + 60 : prev - 60;
    });
  };

  // Move obstacles from right to left across the screen
  const moveObstacle = () => {
    setObstaclePosition(prev => ({
      x: prev.x - MOVE,
      y: prev.y,
    }));

    setFrame(prev => prev + 1);
  };

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    ballRef.current.setNativeProps({
      cy: 150,
    });
    setObstaclePosition({
      x: screenWidth,
      y: Math.random() * 300,
    });
    setGameLoop(
      setInterval(() => {
        moveObstacle();
      }, TICK),
    );
  };

  useEffect(() => {
    // Check for collision
    if (
      ballRef.current &&
      ballRef.current.props.cx + 20 > obstaclePosition.x &&
      ballRef.current.props.cx - 20 < obstaclePosition.x + 30 &&
      ballRef.current.props.cy + 20 > obstaclePosition.y &&
      ballRef.current.props.cy - 20 < obstaclePosition.y + 80
    ) {
      playSound();
      setGameOver(true);
      clearInterval(gameLoop);
      if (score > highScore) {
        setHighScore(score);
      }
    }

    // Increase score and reset obstacle position
    if (obstaclePosition.x <= 0) {
      setScore(score + 1);
      setObstaclePosition({
        x: screenWidth - 30,
        y: Math.random() * 300,
      });
    }
  }, [obstaclePosition.x]);

  // Start the game hook
  useEffect(() => {
    startGame();
    return () => clearInterval(gameLoop);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      {/* <Text style={styles.frame}>Frame: {frame}</Text> */}
      <Text style={styles.highScore}>High Score: {highScore}</Text>
      <Svg ref={svgRef} width="100%" height="100%">
        <Circle
          cx={screenWidth / 2}
          r="20"
          cy={ballCy}
          fill="blue"
          onPressIn={handleTouch}
          ref={ballRef}
        />
        <Rect
          x={obstaclePosition.x}
          y={obstaclePosition.y}
          width="30"
          height="80"
          fill="red"
        />
      </Svg>
      {gameOver && (
        <View style={styles.gameOver}>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <Text style={styles.finalScore}>Final Score: {score}</Text>
          <TouchableOpacity onPress={startGame}>
            <Text style={styles.newGame}>New Game</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MiniGame;
