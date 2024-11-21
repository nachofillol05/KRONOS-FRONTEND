import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import './HeroSplit.scss'; 


const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

class HeroSplit extends React.Component {
  state = {
    videoModalActive: false
  }

  openVideoModal = (e) => {
    e.preventDefault();
    this.setState({ videoModalActive: true });
  }

  closeVideoModal = (e) => {
    e.preventDefault();
    this.setState({ videoModalActive: false });
  }

  render() {
    const {
      className,
      topOuterDivider,
      bottomOuterDivider,
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      invertMobile,
      invertDesktop,
      alignTop,
      imageFill,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'hero section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'hero-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    const splitClasses = classNames(
      'split-wrap',
      invertMobile && 'invert-mobile',
      invertDesktop && 'invert-desktop',
      alignTop && 'align-top'
    );

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container mx-auto px-4">
          <div className={innerClasses}>
            <div className={splitClasses}>
              <div className="split-item flex flex-col md:flex-row items-center justify-between">
                <div className="hero-content split-item-content w-full text-center md:text-left">
                <h1 
  className="hero-title mt-0 mb-4 font-bold text-center md:text-left"
>
  Kronos
</h1>
<p 
  className="hero-subtitle mt-0 mb-8 text-center md:text-left"
>
  Tu gestor de horarios escolares.
</p>
                </div>
                <div className="split-item-image w-full md:w-1/2 flex justify-center md:justify-end">
                  <img
                    src={require('../../assets/images/img1Kronos.png')}
                    alt="Hero"
                    className="max-w-full h-auto object-contain md:max-w-[350px] lg:max-w-[400px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

HeroSplit.propTypes = propTypes;
HeroSplit.defaultProps = defaultProps;

export default HeroSplit;