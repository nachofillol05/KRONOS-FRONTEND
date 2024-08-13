import React from 'react';
import HeroSplit from '../../components/sections/HeroSplit.js';
import FeaturesTabs from '../../components/sections/FeaturesTabs.js';
import News from '../../components/sections/News.js';
import Cta from '../../components/sections/Cta.js';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <HeroSplit hasBgColor invertColor />
        <FeaturesTabs topDivider bottomOuterDivider />
        <News className="illustration-section-01" />
      </React.Fragment>
    );
  }
}

export default Home;