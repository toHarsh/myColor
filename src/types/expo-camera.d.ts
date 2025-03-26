declare module 'expo-camera' {
  import { ViewProps } from 'react-native';
  import React from 'react';

  export interface CameraProps extends ViewProps {
    type?: number;
    ref?: React.RefObject<any>;
  }

  export const Camera: React.ComponentType<CameraProps>;

  export enum CameraType {
    front = 1,
    back = 0
  }

  export interface PermissionResponse {
    status: string;
    granted: boolean;
  }

  export interface CameraCaptureOptions {
    quality?: number;
    base64?: boolean;
    exif?: boolean;
  }

  export interface CameraPictureResponse {
    uri: string;
    width: number;
    height: number;
    exif?: { [key: string]: any };
    base64?: string;
  }

  export interface CameraMethods {
    takePictureAsync(options?: CameraCaptureOptions): Promise<CameraPictureResponse>;
  }

  export namespace Camera {
    export function requestCameraPermissionsAsync(): Promise<PermissionResponse>;
  }
} 