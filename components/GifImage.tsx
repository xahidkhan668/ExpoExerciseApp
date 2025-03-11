import React from 'react';
import { Platform, View, Image } from 'react-native';
import { WebView } from 'react-native-webview';
// import GIF from 'react-native-gif';

interface GifImageProps {
  source: { uri: string };
  style: any;
  paused?: boolean;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
  onLoadStart?: () => void;
  onLoad?: () => void;
  onError?: () => void;
}

export default function GifImage({
  source,
  style,
  paused = false,
  resizeMode = 'contain',
  onLoadStart,
  onLoad,
  onError,
}: GifImageProps) {
  if (Platform.OS === 'android') {

    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              background: transparent;
            }
            img {
              max-width: 100%;
              max-height: 100%;
              object-fit: ${resizeMode};
            }
          </style>
        </head>
        <body>
          <img src="${source.uri}" />
        </body>
      </html>
    `;

    return (
      <View style={[style, { overflow: 'hidden' }]}>
        <WebView
          source={{ html }}
          style={{ backgroundColor: 'transparent' }}
          scrollEnabled={false}
          onLoadStart={onLoadStart}
          onLoad={onLoad}
          onError={onError}
          androidLayerType="hardware"
        />
      </View>
    );
  }

  // Use regular Image component for iOS
  return (
    <Image
      source={source}
      style={style}
    //   paused={paused}
      resizeMode={resizeMode}
    //   onLoadStart={onLoadStart}
    //   onLoad={onLoad}
    //   onError={onError}
    />
  );
} 