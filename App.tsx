import React, { useEffect, useState, useRef } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';

import PageHeader from './app/Sections/PageHeader.tsx'
import FullscreenAdSection from './app/Sections/FullscreenAdSection.tsx'
import logger from "./app/Logger.ts";

import {
  Colors,
  DebugInstructions,
  Header,
} from 'react-native/Libraries/NewAppScreen';

import { Picker } from '@react-native-picker/picker';

// Import components from BlueStack module
import {
  BluestackSDK,
  BannerAdView,
  BannerAdType,
  InterstitialAdManager,
  RewardedAdManager,
} from "@azerion/bluestack-sdk-react-native";

// For Ad Preference 
import {
  AdPreference,
  ProviderType,
  GenderType,
  LocationType
} from "@azerion/bluestack-sdk-react-native";

const appId = Platform.OS === 'ios' ? '3180317' : '5180317';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [bluestackinitialized, setBluestackInitialized] = useState<boolean>(false);
  const [bluestackMessage, setBluestackMessage] = useState<string>('');

  logger.addListener('log', (message: any[]) => {
    setBluestackMessage(message.toString());
  });

  const interstitialHasLoaded = useRef<boolean>(false);
  const rewardedHasLoaded = useRef<boolean>(false);
  const refreshEnabled = useRef<boolean>(false);

  const bannerInstance = useRef<BannerAdView | null>(null);
  const squareInstance = useRef<BannerAdView | null>(null);

  const refBannerPref = useRef<AdPreference | null>(null);

  const [bannerHeight, setBannerHeight] = useState<number>(0);
  const [bannerSize, setBannerSize] = useState<BannerAdType>('standard');
  const [squareHeight, setSqaureHeight] = useState<number>(0);

  const [selectedBannerSize, setSelectedBannerSize] = useState<BannerAdType>('standard');

  function loadInterstitial() {
    logger.log('Waiting for intertistial to load..');

    const preference = new AdPreference();
    preference.setAge(30);
    preference.setGender('Male');

    let provider: ProviderType = "full";
    let location: LocationType = {
      latitude: 52.2781724,
      longitude: 4.7506529,
      provider: provider
    };

    preference.setLocation(location, 1);
    preference.setLanguage("en");
    preference.setContentUrl("https://madvertise.com/en/");
    preference.setKeyword("brand=myBrand;category=sport");

    InterstitialAdManager.loadAd('/' + appId + '/interstitial', true, preference);
  }

  function displayInterstitial() {
    if (interstitialHasLoaded.current) {
      InterstitialAdManager.displayAd();
    } else {
      logger.log('Interstitial Ad is not loaded');
    }
  }

  function loadRewarded() {
    logger.log('Waiting for Rewarded to load..');
    RewardedAdManager.loadAd('/' + appId + '/videoRewarded');
  }

  function displayRewarded() {
    if (rewardedHasLoaded.current) {
      RewardedAdManager.displayAd();
    } else {
      logger.log('Rewarded Ad is not loaded');
    }
  }

  function loadBanner() {
    logger.log('Waiting for banner..');
    setBannerSize(selectedBannerSize);

    const preference = new AdPreference();
    preference.setAge(30);
    preference.setGender('Female');
    preference.setLocation({
      latitude: 52.2781724,
      longitude: 4.7506529,
      provider: 'network'
    }, 1);
    preference.setLanguage("en");
    preference.setContentUrl("https://madvertise.com/en/");
    preference.setKeyword("brand=myBrand;category=sport");

    logger.log('Banner Ad Preference: ' + preference.getPreferenceJSON());
    bannerInstance.current?.load(preference);
  }

  function loadSquare() {
    logger.log('Waiting for square banner to load..');
    squareInstance.current?.load();
  }

  function removeBanner() {
    logger.log('Remove current banner.');
    bannerInstance.current?.destroy();
  }

  function toggleBanner() {
    if (!bannerInstance.current?.state.visible) {
      logger.log('Show current banner');
      bannerInstance.current?.show();
    }
    else {
      logger.log('Hide current banner');
      bannerInstance.current?.hide();
    }
  }

  function toggleRefresh() {
    if (refreshEnabled.current) {
      refreshEnabled.current = false;
    }
    else {
      refreshEnabled.current = true;
    }

    bannerInstance.current?.toggleRefresh(refreshEnabled.current);
    logger.log('Refresh : ' + refreshEnabled.current); //? 'enabled' : 'disabled'
  }

  useEffect(() => {

    const bannerPreference = new AdPreference();
    bannerPreference.setAge(30);
    bannerPreference.setGender('Male');
    bannerPreference.setLocation({
      latitude: 52.2781724,
      longitude: 4.7506529,
      provider: "network"
    }, 1);
    bannerPreference.setLanguage("en");
    bannerPreference.setContentUrl("https://madvertise.com/en/");
    bannerPreference.setKeyword("brand=myBrand;category=sport");
    refBannerPref.current = bannerPreference;

    BluestackSDK.initialize(appId, true)
      .then(() => {
        logger.log('Sdk initialized');
        setBluestackInitialized(true);

        // Interstitial Event Listener
        InterstitialAdManager.addEventListener(
          (event: any) => {
            switch (event.interstitialEvent) {
              case 'onAdLoaded':
                interstitialHasLoaded.current = true;
                logger.log('Interstitial Ad Loaded');
                break;
              case 'onAdDismissed':
                interstitialHasLoaded.current = false;
                logger.log('Interstitial Ad Disappeared');
                break;
              case 'onAdDisplayed':
                logger.log('Interstitial Ad Displayed');
                break;
              case 'onAdClicked':
                logger.log('Interstitial Ad Clicked');
                break;
              case 'onAdFailedError':
                logger.log('Interstitial Ad Failed');
                logger.log(event.errorMessage);
                break;
              default:
                break;
            }
          }
        );

        // Add Reward Event Listener
        RewardedAdManager.addEventListener(
          (event: any) => {
            switch (event.rewardedEvent) {
              case 'onAdLoaded':
                rewardedHasLoaded.current = true;
                logger.log('Rewarded Ad Loaded');
                break;
              case 'onAdDismissed':
                rewardedHasLoaded.current = false;
                logger.log('Rewarded Ad Disappeared');
                break;
              case 'onAdDisplayed':
                logger.log('Rewarded Ad Displayed');
                break;
              case 'onAdClicked':
                logger.log('Rewarded Ad Clicked');
                break;
              case 'onRewardEarned':
                logger.log("Reward Earned: Type-" + event.rewardType + ", Amount-" + event.rewardAmount);
                break;
              case 'onAdFailedError':
                logger.log('Rewarded Ad Failed');
                logger.log(event.errorMessage);
                break;
              default:
                break;
            }
          }
        );

      })
      .catch((e: Error) => {
        logger.log('Sdk initialization failed: ' + e.toString());
      });
    return () => {
      // Clean up the subscription
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <Header /> */}
      {PageHeader(bluestackinitialized, bluestackMessage)}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>

        <View style={styles.section}>

          {bluestackinitialized && (
            <>
              {FullscreenAdSection('Interstitial', loadInterstitial, displayInterstitial)}
              {FullscreenAdSection('Rewarded', loadRewarded, displayRewarded)}

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Banner :</Text>
                <View>
                  <Picker
                    style={styles.picker}
                    itemStyle={styles.picker_text}
                    selectedValue={selectedBannerSize}
                    onValueChange={
                      (itemValue) => {
                        setSelectedBannerSize(itemValue)
                      }
                    }
                  >
                    <Picker.Item label="Standard" value="standard" />
                    <Picker.Item label="Full" value="full" />
                    <Picker.Item label="Large" value="large" />
                    <Picker.Item label="Medium Rectangle" value="mediumRectangle" />
                    <Picker.Item label="Leaderboard" value="leaderboard" />
                    <Picker.Item label="Dynamic" value="dynamic" />
                    <Picker.Item label="Dynamic Leaderboard" value="dynamicLeaderboard" />
                  </Picker>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={styles.button}>
                  <Text style={styles.buttonText} onPress={loadBanner}>
                    Show Banner{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.button}>
                  <Text style={styles.buttonText} onPress={removeBanner}>
                    Remove Banner{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.button}>
                  <Text style={styles.buttonText} onPress={toggleBanner}>
                    Toggle Banner{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.button}>
                  <Text style={styles.buttonText} onPress={toggleRefresh}>
                    Toggle Refresh{' '}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    ...styles.banner,
                    height: bannerHeight,
                  }}
                >
                  <BannerAdView
                    type={bannerSize!}
                    shouldLoadWhenReady={true}
                    placementId={'/' + appId + '/banner'}
                    preference={refBannerPref.current!}
                    onAdLoaded={(object: any) => {
                      logger.log('Banner loaded');
                      setBannerHeight(object.nativeEvent.size);
                    }}
                    onAdFailedToLoad={(error: any) => {
                      logger.log('Banner failed to load:' + error?.nativeEvent?.error);
                    }}
                    onAdRefreshed={() => {
                      logger.log('Banner refreshed');
                    }}
                    onAdFailedToRefresh={(error: any) => {
                      logger.log('Banner failed to refresh: ' + error?.nativeEvent?.error);
                    }}
                    onAdClicked={() => {
                      logger.log('Banner clicked');
                    }}
                    ref={bannerInstance}
                  />
                </View>
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Medium Rectangle :</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.button}>
                  <Text style={styles.buttonText} onPress={loadSquare}>
                    Show Square
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    ...styles.square,
                    height: squareHeight,
                  }}
                >
                  <BannerAdView
                    type="mediumRectangle"
                    shouldLoadWhenReady={false}
                    placementId={'/' + appId + '/square'}
                    onAdLoaded={(object: any) => {
                      logger.log('Square banner loaded');
                      setSqaureHeight(+object.nativeEvent.size);
                    }}
                    onAdFailedToLoad={(error: any) => {
                      logger.log('Square banner failed to load:' + error?.nativeEvent?.error);
                    }}
                    onAdRefreshed={() => {
                      logger.log('Square banner refreshed');
                    }}
                    onAdFailedToRefresh={(error: any) => {
                      logger.log('Square banner failed to refresh: ' + error?.nativeEvent?.error);
                    }}
                    onAdClicked={() => {
                      logger.log('Square banner clicked');
                    }}
                    ref={squareInstance}
                  />
                </View>
              </View>
            </>
          )}

        </View>


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  section: {
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#623de3',
    height: 50,
    marginVertical: 10,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
  banner: {
    alignItems: 'center',
  },
  square: {
    alignItems: 'center',
  },
  text: {
    height: 30,
    fontSize: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  picker_text: {
    height: 50,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    color: '#623de3',
  },
});

export default App;

