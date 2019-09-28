import React, {PureComponent} from 'react';
import {View, Text, Image, Button} from 'react-native';
import OnBoardingSwiper from 'react-native-onboarding-swiper';

class OnBoarding extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <OnBoardingSwiper
          NextButtonComponent={this.next}
          SkipButtonComponent={this.skip}
          DoneButtonComponent={this.done}
          bottomBarColor={'white'}
          pages={[
            {
              backgroundColor: 'white',
              image: (
                <Image source={require('../assets/images/onboarding2.png')} />
              ),
              title: 'Onboarding 1',
              subtitle: 'Done with React Native ',
            },
            {
              backgroundColor: 'white',
              image: (
                <Image source={require('../assets/images/onboarding2.png')} />
              ),
              title: 'Multas',
              subtitle: 'Hemos reducido 100 multas en el utlimo mes',
            },
          ]}
        />
      </View>
    );
  }

  done = ({isLight, ...props}) => <View/>;
  next = ({isLight, ...props}) => <View/>;
  skip = ({isLight, ...props}) => <View/>;
}

export default OnBoarding;
