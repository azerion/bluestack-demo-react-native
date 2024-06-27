# Introduction

[![Build Status](<https://teamcity.azerdev.com/app/rest/builds/buildType:(id:myID)/statusIcon>)](https://teamcity.azerdev.com/viewType.html?buildTypeId=myID&guest=1)

**React Native BlueStack Demo** is a project to showcase all the functionalities that BlueStack React Native SDK provides for both iOS and Android platform.

## Prerequisites

- Use React Native 0.70 or higher
- Android
  - Target Android API level 19 or higher
- iOS
  - iOS 12.2 or higher

## Setting up environment

To work with this project, you'll need to set up your development environment with the necessary tools and dependencies. Here’s a comprehensive list of the prerequisites:

### 1. Node.js and npm (or Yarn)

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **npm**: Node package manager, which comes with Node.js.
- **Yarn** (optional): Alternative package manager.

You can download and install Node.js from [nodejs.org](https://nodejs.org/).

To verify the installation:

```bash
node -v
npm -v
```

To install Yarn (optional):

```bash
npm install -g yarn
```

### 2. Watchman (macOS Only)

Watchman is a tool by Facebook for watching changes in the filesystem. It's highly recommended on macOS to improve performance.

```bash
brew install watchman
```

### 3. React Native CLI

React Native CLI is the command-line interface for React Native. Install it globally using npm or Yarn:

```bash
npm install -g react-native-cli
```

or

```bash
yarn global add react-native-cli
```

### 4. Java Development Kit (JDK)

For Android development, you'll need the Java Development Kit (JDK). Install the latest version of the JDK from [Oracle](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) or [AdoptOpenJDK](https://adoptopenjdk.net/).

To verify the installation:

```bash
javac -version
```

### 5. Android Studio

Android Studio provides the Android SDK and other necessary tools for Android development.

1. Download and install [Android Studio](https://developer.android.com/studio).
2. During installation, ensure you install the following components:

   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)

3. Configure the environment variables:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 6. Xcode (macOS Only)

For iOS development, you need Xcode.

1. Download and install [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) from the Mac App Store.
2. Install Xcode Command Line Tools:

```bash
xcode-select --install
```

3. Open Xcode and install any additional required components.

### 7. CocoaPods (iOS Only)

CocoaPods is a dependency manager for Swift and Objective-C Cocoa projects. It's used in React Native for handling native iOS dependencies.

Install CocoaPods using Ruby gem:

```bash
sudo gem install cocoapods
```

## Setting Up the React Native Bluestack module

Once you have all the prerequisites installed, you can set up the Bluestack module in the demo project:

```sh
npm install @azerion/bluestack-sdk-react-native
```

### Local Setup

To get started locally the following steps are required:

#### Step 1: Clone the repository

```bash
git clone https://gitlab.azerdev.com/bluestack/sdk/react-native/bluestack-sdk-react-native.git
cd bluestack-sdk-react-native
```

#### Step 2: Install the module dependencies

```bash
npm install
```

If you get any error like `npm ERR! Invalid tag name "+" of package "react@+"`, Try following cmd:

```bash
npm install --legacy-peer-deps
```

#### Step 3: Add SDK path in you project dependencies

You can manually add the path in the package.json

```json
  "dependencies": {
    ....
    "@azerion/bluestack-sdk-react-native": "/path/to/bluestack-sdk-react-native"
    ....
  },
```

Or run following command

```bash
npm add /path/to/bluestack-sdk-react-native
```

#### Step 4: Link the local @azerion/bluestack-sdk-react-native

```sh
cd /path/to/bluestack-demo-react-native
npm install @azerion/bluestack-sdk-react-native
```

For React Native 0.60 and above, the linking is done automatically. For older versions, you might need to link the native dependencies manually:

```bash
cd /path/to/bluestack-sdk-react-native
npm link
cd /path/to/bluestack-demo-react-native
npm link @azerion/bluestack-sdk-react-native
```

#### Step 5: Update metro.config.js

```javascript
// Absolute path to your package
const packagePath = "/path/to/bluestack-sdk-react-native";

module.exports = {
  resolver: {
    nodeModulesPaths: [packagePath],
    // rest of metro resolver options...
  },
  watchFolders: [packagePath],
  // rest of metro options...
};
```

#### Watchman warning fix

```bash
warning: Watchman `watch-project` returned a warning
```

If you get above warning while working with local setup, To clear the warning, run:

```bash
watchman watch-del /path/to/bluestack-demo-react-native
watchman watch-project /path/to/bluestack-demo-react-native
```

### Running the Project

#### On Android

1. Start the Android emulator or connect an Android device via USB.
2. Ensure the Android device is in developer mode and USB debugging is enabled.
3. Start the React Native packager:

```bash
npm start
```

4. In another terminal, build and run the Android app:

```bash
npm run android
```

#### On iOS (macOS Only)

1. Start the React Native packager:

```bash
npm start
```

2. Navigate to the `ios` directory:

```bash
cd ios
```

3. Install pod dependencies:

```bash
pod install
```

4. Open the iOS project in Xcode:

```bash
open ios/BlueStackReactNativeDemo.xcworkspace
```

5. Select a simulator or a connected device and press the Run button, or run the following command:

```bash
npm run ios
```
