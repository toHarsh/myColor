# myColor - Color Season Analysis App

A React Native application that analyzes your skin tone to determine your color season (Spring, Summer, Autumn, or Winter) and provides personalized color recommendations.

## Features

- Real-time skin tone analysis using device camera
- Color season determination (Spring, Summer, Autumn, Winter)
- Personalized color recommendations
- Works on iOS, Android, and Web browsers
- Beautiful and intuitive user interface

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/myColor.git
cd myColor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
- iOS: `npm run ios`
- Android: `npm run android`
- Web: `npm run web`

## Testing

Run the test suite:
```bash
npm test
```

## Deployment

### Web Deployment (Netlify)
```bash
npm run build:web
netlify deploy
```

### iOS Deployment
```bash
eas build --platform ios
```

### Android Deployment
```bash
eas build --platform android
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 