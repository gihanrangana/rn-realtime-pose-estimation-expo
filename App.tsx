import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as posenet from '@tensorflow-models/posenet';


export default function App() {

  const [isTFReady,setIsTFReady] = useState(false);
  const [isPosenetReady,setIsPosenetReady] = useState(false);

  let model:any;

  const onLoad = async () => {
    await tf.ready();
    setIsTFReady(true);

    model = await posenet.load();
    setIsPosenetReady(true);
  }

  useEffect(() => {
    
    onLoad();

  },[onLoad]);

  return (
    <View style={styles.container}>
      <Text>

        TF Ready? {isTFReady ? 'Yes' : 'Loading...'}
        
      </Text>
      <Text>

        Posenet Ready? {isPosenetReady ? 'Yes' : 'Loading...'}
        
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
