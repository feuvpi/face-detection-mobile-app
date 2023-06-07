import { Camera, CameraType } from 'expo-camera'
import { useState } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as FaceDetector from 'expo-face-detector'

export default function App () {
  const [type, setType] = useState(CameraType.back)
  const [permission, requestPermission] = Camera.useCameraPermissions()
  cosnt [pontos, setPontos] = useState(null)
  const [face, setFace] = useState(null)

  if (!permission) {
    // Camera permissions are still loading
    return <View />
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    )
  }

  const handleFacesDetected = ({ faces }) => {
    if(faces && faces.length > 0){
      setFace(faces[0]);
    }
  }

  function toggleCameraType () {
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back
    )
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true
        }}
      >
        {face && (
          <View
          key={face.faceID}
            style={[
              styles.face,
              {
                width: face.bounds.size.width,
                height: face.bounds.size.height,
                left: face.bounds.origin.x,
                top: face.bounds.origin.y
              }
            ]}
            
          ></View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={{backgroundColor: '#FFF'}}>
            <Text style={{padding:20, textAlign:'center', fontWeight: 'bold'}}>Quantidade de piscadas: {pontos}</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  camera: {
    flex: 1
  },
  face: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 10,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: 'red',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  }
})
