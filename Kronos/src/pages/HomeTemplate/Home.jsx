import React, { useEffect, useRef, useState } from "react";
import "./Home.scss";
import { Button, Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons';


export default function Home() {

  const headingRef = useRef(null);
  const containerRef = useRef(null);
  const [isInSection, setIsInSection] = useState(false);


useEffect(() => {
  const handleScroll = () => {
    if (headingRef.current && containerRef.current) {
      const heading = headingRef.current;
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Define los límites del movimiento
      const startScroll = viewportHeight - 100; // Comienza 100px dentro del viewport
      const endScroll = viewportHeight + containerRect.height; // Termina cuando el contenedor está completamente visible

      // Calcula el progreso dentro de este rango
      const progress = Math.max(
        0,
        Math.min(1, (startScroll - containerRect.top) / (endScroll - startScroll))
      );

      // Movimiento horizontal del texto
      const offset = 2000 - progress * 3700; // Comienza en -500px y se mueve a la derecha
      heading.style.transform = `translateX(${offset}px)`;
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  
  return (
    <>
      <div
        className="header"
      >
        <h1 className='logo'>Kronos</h1>
        <div className="acciones">
          <Button className='Ingresar' size="large" type="link" icon={<UserOutlined />} iconPosition={'end'}>
            Ingresar
          </Button>
          <Button className='Contactar' size="large" type="primary">
            Contactar
          </Button>

        </div>
        <div className='textos'>
          <Flex vertical justify='space-evenly' className="texto-principal">
            <span className='normal'>Tiempo bien</span>
            <span className='colorido'>Gestionado</span>
            <span className='normal'>Es aprendizaje</span>
            <span className='colorido'>Mejorado</span>
          </Flex>
          <p className='descrpcion'>Empeza a gestionar hoy con Kronos</p>
          <p className='frase'>FÁCIL, SENCILLO Y SEGURO.</p>
          <Button className='Comenzar' size="large" type="primary" >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#E5EFEC" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z" /></svg>Comenzar ahora
          </Button>
        </div>
      </div>
      <Flex vertical className="bento-container">
        <Flex className="bento gap">
          <Flex vertical className="bento gap">
            <div className="bento-item contenido" style={{ width: "423px", height: "345px" }}>
              <h1>Fácil</h1>
            </div>
            <div className="bento-item vacio" style={{ width: "423px", height: "155px" }} />

          </Flex>
          <Flex vertical className="bento gap">
            <Flex className="bento gap">
              <div className="bento-item simbolo" style={{ width: "250px", height: "100px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 248 114"
                  style={{ width: "100%", height: "100%" }}
                >
                  <g>
                    <path
                      d="M75.4894 68.6851L0 112.398V24.988L75.4894 68.6851Z"
                      style={{ fill: "rgb(28, 165, 121)" }}
                    />
                  </g>
                  <g>
                    <path
                      d="M154.173 70.3029L78.6836 114V26.5898L154.173 70.3029Z"
                      style={{ fill: "rgb(28, 165, 121)" }}
                    />
                  </g>
                  <g>
                    <path
                      d="M232.026 70.3029L156.537 114V26.5898L232.026 70.3029Z"
                      style={{ fill: "rgb(28, 165, 121)" }}
                    />
                  </g>
                  <g>
                    <path
                      d="M8.78516 95.7395V0L91.4625 47.8617L8.78516 95.7395ZM13.5771 8.32935V87.4101L81.8785 47.8617L13.5771 8.32935Z"
                      style={{ fill: "rgb(0, 0, 0)" }}
                    />
                  </g>
                  <g>
                    <path
                      d="M87.4697 97.3413V1.60181L170.147 49.4635L87.4697 97.3413ZM92.2617 9.93116V89.028L160.563 49.4796L92.2617 9.93116Z"
                      style={{ fill: "rgb(0, 0, 0)" }}
                    />
                  </g>
                  <g>
                    <path
                      d="M165.322 97.3413V1.60181L248 49.4635L165.322 97.3413ZM170.114 9.93116V89.028L238.416 49.4796L170.114 9.93116Z"
                      style={{ fill: "rgb(0, 0, 0)" }}
                    />
                  </g>
                </svg>
              </div>
              <div className="bento-item vacio" style={{ width: "250px", height: "100px" }} />
              <div className="bento-item vacio" style={{ width: "327px", height: "100px" }} />
            </Flex>
            <Flex className="bento gap">
              <div className="bento-item contenido" style={{ width: "400px", height: "400px" }}>
                <h1>Sencillo</h1>
              </div>
              <Flex vertical className="bento gap">
                <Flex className="bento gap">
                  <div className="bento-item vacio" style={{ width: "213px", height: "199px" }} />
                  <div className="bento-item imagen" style={{
                    width: "213px",
                    backgroundImage: `url("/img-kronos/Kronos negro transparente.webp")`,
                    height: "199px",
                    backgroundSize: "70%"
                  }}
                  />

                </Flex>
                <div className="bento-item imagen" style={{ width: "437px", height: "190px" }} />

              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex className="bento gap">
          <Flex vertical className="bento gap">
            <div className="bento-item simbolo" style={{ width: "155px", height: "155px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0.0 0.0 297.8 304.6"
                zoomAndPan="magnify"
                style={{ fill: 'rgb(0, 0, 0)' }}
              >
                <g>
                  <path
                    d="M164.4297,304.5787c-73.5593,0-133.4038-59.8449-133.4038-133.4043 c0-73.5589,59.8445-133.4033,133.4038-133.4033S297.834,97.6156,297.834,171.1744 C297.834,244.7337,237.989,304.5787,164.4297,304.5787z M164.4297,304.5787c-73.5593,0-133.4038-59.8449-133.4038-133.4043 c0-73.5589,59.8445-133.4033,133.4038-133.4033S297.834,97.6156,297.834,171.1744 C297.834,244.7337,237.989,304.5787,164.4297,304.5787z M164.4297,304.5787c-73.5593,0-133.4038-59.8449-133.4038-133.4043 c0-73.5589,59.8445-133.4033,133.4038-133.4033S297.834,97.6156,297.834,171.1744 C297.834,244.7337,237.989,304.5787,164.4297,304.5787z"
                    style={{ fill: 'rgb(28, 165, 121)' }}
                  />
                </g>
                <g>
                  <path
                    d="M246.5444,83.2416c0.8739,2.3849,1.68,4.7922,2.4099,7.2216L140.5977,253.8285c-2.522,0.2725-5.0533,0.4661-7.5903,0.5886 L246.5444,83.2416z M159.1398,250.431c3.0251-0.7867,6.0219-1.6848,8.9851-2.6915l85.9267-129.5485 c-0.2251-3.1213-0.5633-6.2315-1.0152-9.3244L159.1398,250.431z M191.4827,237.0835c4.4729-2.6143,8.8036-5.5124,12.9633-8.6894 l45.9107-69.2178c1.3089-5.0678,2.2943-10.1847,2.963-15.3222L191.4827,237.0835z M71.0124,241.6444 c1.8243,0.8945,3.6614,1.745,5.5119,2.5449L215.1528,35.1842c-1.4566-1.3937-2.9547-2.7553-4.4883-4.088L71.0124,241.6444z M89.621,249.0017c2.0157,0.618,4.0407,1.1838,6.0738,1.6976L228.6067,50.3132c-1.2641-1.6732-2.573-3.3187-3.9264-4.9353 L89.621,249.0017z M110.1451,253.4729c2.2412,0.296,4.4861,0.5287,6.7326,0.7044l123.1721-185.702 c-1.0357-2.0013-2.1232-3.9789-3.2676-5.9285L110.1451,253.4729z M54.1248,231.6906c0.8185,0.5707,1.6433,1.1356,2.4791,1.69 c0.8358,0.5544,1.677,1.0944,2.521,1.6264L199.9262,22.7263c-0.8184-0.5707-1.6431-1.1355-2.4789-1.6899 c-0.8358-0.5544-1.6771-1.0945-2.5212-1.6266L54.1248,231.6906z M38.8985,219.233c1.4567,1.3937,2.9548,2.7554,4.4883,4.0881 L183.039,12.7727c-1.8242-0.8945-3.6613-1.745-5.5119-2.5449L38.8985,219.233z M25.4444,204.1036 c1.2641,1.6732,2.573,3.3187,3.9263,4.9354L164.4299,5.4152c-2.0157-0.618-4.0407-1.1838-6.0739-1.6976L25.4444,204.1036z M14.0015,185.9419c1.0357,2.0013,2.1233,3.9789,3.2676,5.9285L143.9064,0.9442c-2.2411-0.296-4.4861-0.5286-6.7326-0.7044 L14.0015,185.9419z M5.097,163.9532c0.7299,2.4294,1.5361,4.8367,2.4099,7.2216L121.0435,0 c-2.537,0.1226-5.0684,0.3162-7.5903,0.5887L5.097,163.9532z M0,136.2249c0.2251,3.1214,0.5633,6.2316,1.0151,9.3245L94.9109,3.9863 c-3.0251,0.7868-6.0219,1.6849-8.9851,2.6915L0,136.2249z M3.6953,95.2399c-1.3089,5.0679-2.2944,10.1848-2.9632,15.3224 l61.8366-93.2287c-4.4729,2.6143-8.8036,5.5124-12.9634,8.6895L3.6953,95.2399z"
                    style={{ fill: 'inherit' }}
                  />
                </g>
              </svg>
            </div>
            <div className="bento-item vacio" style={{ width: "155px", height: "155px" }} />
          </Flex>
          <div className="bento-item vacio" style={{ width: "200px", height: "320px" }} />
          <div className="bento-item imagen" style={{ width: "225px", height: "320px" }} />
          <div className="bento-item simbolo" style={{ width: "225px", height: "320px" }}>

            <svg
              preserveAspectRatio="xMidYMid meet"
              version="1.0"
              viewBox="16.2 19.3 64.2 57.7"
              zoomAndPan="magnify"
              style={{ fill: 'rgb(225, 124, 124)' }}
              original_string_length="1956"
            >
              <g id="__id429_sh0ywmqlp">
                <circle cx="45.6" cy="45.3" r="26" style={{ fill: 'rgb(28, 165, 121)' }} />
              </g>
              <g>
                <defs>
                  <g id="__id430_sh0ywmqlp">
                    <circle cx="60.6" cy="57.2" id="__id431_sh0ywmqlp" r="19.8" style={{ fill: 'inherit' }} />
                  </g>
                </defs>
                <clipPath id="__id432_sh0ywmqlp">
                  <use href="#__id431_sh0ywmqlp" overflow="visible" />
                </clipPath>
                <g clipPath="url(#__id432_sh0ywmqlp)">
                  <g id="__id433_sh0ywmqlp">
                    <path
                      d="M57.8 57.7H109.6V59.2H57.8z"
                      transform="rotate(-63 83.696 58.488)"
                      style={{ fill: 'rgb(68, 68, 68)' }}
                    />
                  </g>
                  <g id="__id434_sh0ywmqlp">
                    <path
                      d="M53 57.7H104.8V59.2H53z"
                      transform="rotate(-63 78.908 58.488)"
                      style={{ fill: 'rgb(68, 68, 68)' }}
                    />
                  </g>
                  <g id="__id435_sh0ywmqlp">
                    <path
                      d="M48.2 57.7H100V59.2H48.2z"
                      transform="rotate(-63 74.12 58.488)"
                      style={{ fill: 'rgb(68, 68, 68)' }}
                    />
                  </g>
                  <g id="__id436_sh0ywmqlp">
                    <path
                      d="M43.4 57.7H95.19999999999999V59.2H43.4z"
                      transform="rotate(-63 69.332 58.488)"
                      style={{ fill: 'rgb(68, 68, 68)' }}
                    />
                  </g>
                  <g id="__id437_sh0ywmqlp">
                    <path
                      d="M38.6 57.7H90.4V59.2H38.6z"
                      transform="rotate(-63 64.543 58.488)"
                      style={{ fill: 'rgb(68, 68, 68)' }}
                    />
                  </g>
                  <g id="__id438_sh0ywmqlp">
                    <path
                      d="M33.8 57.7H85.6V59.2H33.8z"
                      transform="rotate(-63 59.755 58.488)"
                      style={{ fill: 'rgb(68, 68, 68)' }}
                    />
                  </g>
                  <g id="__id439_sh0ywmqlp">
                    <path
                      d="M29.1 57.7H80.9V59.2H29.1z"
                      transform="rotate(-63 54.967 58.488)"
                      style={{ fill: 'rgb(68, 68, 68)' }}
                    />
                  </g>
                  <g id="__id440_sh0ywmqlp">
                    <path
                      d="M24.3 57.7H76.1V59.2H24.3z"
                      transform="rotate(-63 50.179 58.488)"
                      style={{ fill: 'rgb(68, 68, 68)' }}
                    />
                  </g>
                  <g id="__id441_sh0ywmqlp">
                    <path
                      d="M19.5 57.7H71.3V59.2H19.5z"
                      transform="rotate(-63 45.39 58.488)"
                      style={{ fill: 'rgb(68, 68, 68)' }}
                    />
                  </g>
                  <g id="__id442_sh0ywmqlp">
                    <path
                      d="M14.7 57.7H66.5V59.2H14.7z"
                      transform="rotate(-63 40.603 58.488)"
                      style={{ fill: 'rgb(68, 68, 68)' }}
                    />
                  </g>
                  <g id="__id443_sh0ywmqlp">
                    <path
                      d="M9.9 57.7H61.699999999999996V59.2H9.9z"
                      transform="rotate(-63 35.815 58.488)"
                      style={{ fill: 'rgb(68, 68, 68)' }}
                    />
                  </g>
                </g>
              </g>
              <g id="__id444_sh0ywmqlp">
                <circle cx="23.7" cy="33.8" r="7.5" style={{ fill: 'rgb(68, 68, 68)' }} />
              </g>
            </svg>
          </div>

          <div className="bento-item contenido" style={{ width: "435px", height: "320px" }}>
            <h1>Seguro</h1>
          </div>

        </Flex>

      </Flex>
      
      <div className="frase-container" ref={containerRef}>
      <h2 className="heading" ref={headingRef}>
        <span className="text">Fácil, inclusivo y seguro</span>
      </h2>
    </div>


      <div className="ofrecemos">
        <h3>Software de gestion <span>Escolar</span></h3>
        <Flex gap={40}>

          <div className="carta">
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 48 48"><path fill="#1DA57A" fill-rule="evenodd" d="M18 23.172V12a2 2 0 1 0-4 0v24a2 2 0 1 0 4 0v-7.172l2-2l10.586 10.586a2 2 0 1 0 2.828-2.828L22.828 24l10.586-10.586a2 2 0 1 0-2.828-2.828z" clip-rule="evenodd" /></svg>
            <h3>Lorem ipsum</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, eum. Voluptas, sequi.
            </p>
          </div>
          <div className="carta">
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 48 48"><path fill="#1DA57A" fill-rule="evenodd" d="M18 23.172V12a2 2 0 1 0-4 0v24a2 2 0 1 0 4 0v-7.172l2-2l10.586 10.586a2 2 0 1 0 2.828-2.828L22.828 24l10.586-10.586a2 2 0 1 0-2.828-2.828z" clip-rule="evenodd" /></svg>
            <h3>Lorem ipsum</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, eum. Voluptas, sequi.
            </p>
          </div>
          <div className="carta">
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 48 48"><path fill="#1DA57A" fill-rule="evenodd" d="M18 23.172V12a2 2 0 1 0-4 0v24a2 2 0 1 0 4 0v-7.172l2-2l10.586 10.586a2 2 0 1 0 2.828-2.828L22.828 24l10.586-10.586a2 2 0 1 0-2.828-2.828z" clip-rule="evenodd" /></svg>
            <h3>Lorem ipsum</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, eum. Voluptas, sequi.
            </p>
          </div>

        </Flex>
      </div>

      <Flex justify='space-around' className="faq">
        <Flex gap={30} vertical justify='start' align='center' className="faq-title">
          <span className="span-normal">
            Preguntas
          </span>
          <span className="span-colorido">
            Frecuentes
          </span>
        </Flex>
        <div className="faq-container">
          <div className="faq-item">
            <span className="faq-title">Lorem ipsum</span>
            <p className="faq-question">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
          </div>
          <div className="faq-item">
            <span className="faq-title">Lorem ipsum</span>
            <p className="faq-question">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
          </div>
          <div className="faq-item">
            <span className="faq-title">Lorem ipsum</span>
            <p className="faq-question">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
          </div>
          <div className="faq-item">
            <span className="faq-title">Lorem ipsum</span>
            <p className="faq-question">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
          </div>
          <div className="faq-item">
            <span className="faq-title">Lorem ipsum</span>
            <p className="faq-question">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
          </div>
        </div>
      </Flex>
      <div className="footer-kronos">
        <div className="footer">

        </div>
      </div>
    </>
  );
}

