import { StatusBar } from 'expo-status-bar';
import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as posenet from '@tensorflow-models/posenet';


export default function App() {

  const [isTFReady, setIsTFReady] = useState(false);
  const [isPosenetReady, setIsPosenetReady] = useState(false);

  let imageRef = useRef(null);

  let model: any;

  const onLoad = useCallback(async () => {
    await tf.ready();
    setIsTFReady(true);

    model = await posenet.load();
    setIsPosenetReady(true);
  },[])

  let poses: any;
  const imageScaleFactor = 0.50;
  const flipHorizontal = false;
  const outputStride = 16;

  useEffect(() => {

    onLoad();

    loadPoses();

  }, [onLoad]);

  const loadPoses = async () => {

    console.log(model,"model");

    if(imageRef.current) {

      poses = await model.estimateSinglePose(imageRef.current, imageScaleFactor, flipHorizontal, outputStride);
    }


    console.log(poses)

  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text>

        TF Ready? {isTFReady ? 'Yes' : 'Loading...'}

      </Text>
      <Text>

        Posenet Ready? {isPosenetReady ? 'Yes' : 'Loading...'}

      </Text>

      <Image
        ref={imageRef}
        source={require('./assets/persons.png')}
        style={{
          // width: 360,
          height: 500,
          resizeMode: 'contain'
        }}
      />

  

    </SafeAreaView>
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
