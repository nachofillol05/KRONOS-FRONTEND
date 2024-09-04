import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';

const propTypes = {
  ...SectionTilesProps.types
}

const defaultProps = {
  ...SectionTilesProps.defaults
}

class News extends React.Component {

  render() {
  
  const {
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
  } = this.props;
  
  const outerClasses = classNames(
  'news section',
  topOuterDivider && 'has-top-divider',
  bottomOuterDivider && 'has-bottom-divider',
  hasBgColor && 'has-bg-color',
  invertColor && 'invert-color',
  className
  );
  
  const innerClasses = classNames(
  'news-inner section-inner',
  topDivider && 'has-top-divider',
  bottomDivider && 'has-bottom-divider'
  );
  
  const tilesClasses = classNames(
  'tiles-wrap',
  pushLeft && 'push-left'
  );
  
  const sectionHeader = {
  title: 'Caracteristicas',
  paragraph: 'Renueva tu forma de trabajar haciendo uso de nustras herramientas.'
  };
  
  return (
  <section
  {...props}
  className={outerClasses}
  >
  <div className="container">
  <div className={innerClasses}>
  <SectionHeader data={sectionHeader} className="center-content reveal-from-bottom" />
  <div className={tilesClasses}>
  
  <div className="tiles-item reveal-from-bottom">
  <div className="tiles-item-inner has-shadow">
  <figure className="news-item-image m-0">
  <Image
  src={require('./../../assets/images/news-image-01.jpg')}
  alt="News 01"
  width={344}
  height={194} />
  </figure>
  <div className="news-item-content">
  <div className="news-item-body">
  <h3 className="news-item-title h4 mt-0 mb-8">
  <a href="https://cruip.com">Mejor control</a>
  </h3>
  <p className="mb-16 text-sm">
  Obten mejor control y administración sobre tu personal.
  </p>
  </div>
  </div>
  </div>
  </div>
  
  <div className="tiles-item reveal-from-bottom" data-reveal-delay="200">
  <div className="tiles-item-inner has-shadow">
  <figure className="news-item-image m-0">
  <Image
  src={require('./../../assets/images/news-image-02.jpg')}
  alt="News 02"
  width={344}
  height={194} />
  </figure>
  <div className="news-item-content">
  <div className="news-item-body">
  <h3 className="news-item-title h4 mt-0 mb-8">
  <a href="https://cruip.com">Horarios claros</a>
  </h3>
  <p className="mb-16 text-sm">
  Crea horarios claros y fáciles de comprender para ti y para tu equipo.
  </p>
  </div>
  </div>
  </div>
  </div>
  
  <div className="tiles-item reveal-from-bottom" data-reveal-delay="400">
  <div className="tiles-item-inner has-shadow">
  <figure className="news-item-image m-0">
  <Image
  src={require('./../../assets/images/news-image-03.jpg')}
  alt="News 03"
  width={344}
  height={194} />
  </figure>
  <div className="news-item-content">
  <div className="news-item-body">
  <h3 className="news-item-title h4 mt-0 mb-8">
  <a href="https://cruip.com">Configuracion directa</a>
  </h3>
  <p className="mb-16 text-sm">
  Elige como administrar tu equipo con una configuracion clara, conscisa y fácil de usar.
  </p>
  </div>
  </div>
  </div>
  </div>
  
  </div>
  </div>
  </div>
  </section>
  );
  }
  }
  
  News.propTypes = propTypes;
  News.defaultProps = defaultProps;
  
  export default News;