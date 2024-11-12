import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Tabs, { TabList, Tab, TabPanel } from './../elements/Tabs';
import Image from '../elements/Image';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

class FeaturesTabs extends React.Component {

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
      'features-tabs section center-content',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'features-tabs-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    // Agrega un segundo conjunto de datos de encabezado
    const sectionHeader1 = {
      title: '¿Que es Kronos?',
      paragraph: 'Kronos es una herramienta que aspira a revolucionar el manejo y administracion de horarios junto su personal. Principalmente trabajamos con isntituciones académicas, pero Kronos puede ser utilizado también en pequeñas empresas o cualquiera que pueda utilizar nuestros servicios.'
    };

    const sectionHeader2 = {
      title: 'Nuestros Colegios',
      paragraph: 'Estas son las instituciones educativas con las que estamos asociados.'
    };

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container">
          <div className={innerClasses}>
            {/* Renderiza el primer encabezado */}
            <SectionHeader data={sectionHeader1} className="center-content" />
            {/* Renderiza el segundo encabezado */}
            <SectionHeader data={sectionHeader2} className="center-content" />
            <Tabs active="tab-a">
              <TabList>
                <Tab tabId="tab-a">
                  <div className="features-tabs-tab-image mb-12">
                    <Image
                      src={require('../../assets/images/villadalogo.png')}
                      alt="Tab icon 01"
                      width={100}
                      height={100} />
                  </div>
                  <div className="text-color-high fw-600 text-sm">
                    ITS Villada
                  </div>
                </Tab>
                <Tab tabId="tab-b">
                  <div className="features-tabs-tab-image mb-12">
                    <Image
                      src={require('../../assets/images/colelogo.png')}
                      alt="colelogo"
                      width={100}
                      height={100} />
                  </div>
                  <div className="text-color-high fw-600 text-sm">
                    Jesus Maria
                  </div>
                </Tab>
              </TabList>
              <TabPanel id="tab-a">
                <div style={{ width: 800, height: 500, margin: 'auto' }}>
                  <Image
                    className="has-shadow"
                    src={require('../../assets/images/villadafrente.jpeg')}
                    alt="Features tabs image 01"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundSize: 'cover' }}
                  />
                </div>
              </TabPanel>

              <TabPanel id="tab-b">
              <div style={{ width: 800, height: 500, margin: 'auto' }}>
                  <Image
                    className="has-shadow"
                    src={require('../../assets/images/jesusmariaimg.png')}
                    alt="Features tabs image 01"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundSize: 'cover' }}
                  />
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </section>
    );
  }
}

FeaturesTabs.propTypes = propTypes;
FeaturesTabs.defaultProps = defaultProps;

export default FeaturesTabs;
