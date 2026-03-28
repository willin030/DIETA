import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { RefreshCw, X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Stack } from 'expo-router';

export default function TakePhotoScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<any>(null);
  
  // Request camera permission if not granted
  React.useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);
  
  const handleFlipCamera = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };
  
  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setPhoto(photo.uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };
  
  const handleRetake = () => {
    setPhoto(null);
  };
  
  const handleCancel = () => {
    router.back();
  };
  
  const handleConfirm = () => {
    if (photo) {
      router.push({
        pathname: '/ai-analysis',
        params: { photoUri: photo }
      });
    }
  };
  
  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }
  
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to show the camera</Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Take Photo',
          headerLeft: () => (
            <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
              <X size={24} color={Colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      
      {photo ? (
        // Preview captured photo
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: photo }}
            style={styles.previewImage}
            contentFit="cover"
          />
          
          <View style={styles.previewActions}>
            <TouchableOpacity 
              style={[styles.previewButton, styles.retakeButton]}
              onPress={handleRetake}
            >
              <Text style={styles.retakeButtonText}>Retake</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.previewButton, styles.confirmButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Analyze Food</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Camera view
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
          >
            {/* Cancel button - made more prominent and positioned at the top left */}
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleCancel}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <View style={styles.cancelButtonBackground}>
                <X size={24} color={Colors.white} />
              </View>
            </TouchableOpacity>
            
            {/* Instructions - moved to avoid overlapping with cancel button */}
            <View style={styles.instructions}>
              <Text style={styles.instructionsText}>
                Position your meal in the frame and take a photo
              </Text>
            </View>
            
            <View style={styles.cameraControls}>
              <TouchableOpacity 
                style={styles.flipButton}
                onPress={handleFlipCamera}
              >
                <RefreshCw size={24} color={Colors.white} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.captureButton}
                onPress={handleTakePhoto}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
              
              <View style={styles.placeholderButton} />
            </View>
          </CameraView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 20,
  },
  permissionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 20,
    alignSelf: 'center',
  },
  permissionButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  headerButton: {
    padding: 8,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cancelButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 20,
  },
  cancelButtonBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    position: 'absolute',
    top: 80, // Moved down to avoid overlapping with cancel button
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
  },
  instructionsText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flipButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
  },
  placeholderButton: {
    width: 50,
    height: 50,
  },
  previewContainer: {
    flex: 1,
  },
  previewImage: {
    flex: 1,
  },
  previewActions: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  retakeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  retakeButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: Colors.primary,
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});