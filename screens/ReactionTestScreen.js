import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Vibration, Animated } from "react-native";

export default function ReactionTestScreen() {
  const [gameState, setGameState] = useState("idle");
  const [reactionTime, setReactionTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [bestTime, setBestTime] = useState(null);

  // Reset the game when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const fadeAnim = useState(new Animated.Value(0))[0];

  const start = () => {
    setGameState("waiting");
    setReactionTime(null);
    fadeAnim.setValue(0);
    
    // More reasonable delay between 2-5 seconds
    const delay = Math.floor(Math.random() * 3000) + 2000;
    // const delay  = 0    
    const id = setTimeout(() => {
      setGameState("ready");
      setStartTime(Date.now());
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, delay);
    
    setTimeoutId(id);
  };

  const handlePress = () => {
    var time = 0;
   
    if (gameState === "idle") {
      // Initial start
      start();
    } else if (gameState === "waiting") {
      // Tapped too soon
      clearTimeout(timeoutId);
      setGameState("tooSoon");
      Vibration.vibrate(200);
    } else if (gameState === "ready") {
      // Calculate reaction time
      time = Date.now() - startTime;
      setReactionTime(time);
      Vibration.vibrate(100);

      // Update best time if this is better
      if (bestTime === null || time < bestTime) {
        setBestTime(time);
      }
      
      // Always set to reacted state after a valid reaction
      setGameState("reacted");
    } else {
      // Reset to idle if in any other state (reacted or tooSoon)
      setGameState("idle"); 
    }

    console.log("Button Pressed | Game State:", gameState, "| Best state:", bestTime, "| time: ", time);

  };

  // Determine button color based on game state
  const getButtonColor = () => {
    switch (gameState) {
      case "ready": return "#00cc00"; // Green when should tap
      case "waiting": return "#ff3333"; // Red when waiting
      default: return "#ffcc00"; // Default yellow
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reaction Time Test</Text>
      
      {gameState === "idle" && (
        <Text style={styles.text}>Tap the button to start</Text>
      )}
      
      {gameState === "waiting" && (
        <Text style={styles.text}>Wait for green...</Text>
      )}
      
      {gameState === "ready" && (
        <Animated.Text style={[styles.text, {opacity: fadeAnim}]}>GO!!!</Animated.Text>
      )}
      
      {gameState === "tooSoon" && (
        <Text style={styles.text}>Too soon! Try again</Text>
      )}
      
      {gameState === "reacted" && (
        <View style={styles.resultContainer}>
          <Text style={styles.text}>Your reaction time:</Text>
          <Text style={styles.timeText}>{reactionTime} ms</Text>
          {bestTime && (
            <Text style={styles.bestTimeText}>Best: {bestTime} ms</Text>
          )}
        </View>
      )}
      
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: getButtonColor() }]} 
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {gameState === "idle" ? "Start Test" : 
           gameState === "waiting" ? "Wait..." : 
           gameState === "ready" ? "Tap!" : 
           gameState === "reacted" || gameState === "tooSoon" ? "Try Again" : "Tap"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  text: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  resultContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  timeText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffcc00",
    marginBottom: 10,
  },
  bestTimeText: {
    fontSize: 18,
    color: "#00cc00",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ffcc00",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginTop: 20,
    minWidth: 200,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#121212",
  },
});