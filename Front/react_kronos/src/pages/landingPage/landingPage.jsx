import React from 'react';
import './landingPage.scss';
import land1 from "./land1.svg";
import land2 from "./land2.svg";
import logocole from "./colelogo.svg";
import reviewland from "./reviewland.png"
import Login from '../login/logins';

export default function Activation() {
  return (
      
    <div class="container-land">
      <div className="flex">
          <div className="card">
              <Login/>
          </div>
          <div className="sidebar">
              <h1>Resuelve tus problemas
              <br>
              </br>
                escolares</h1>
              <img className="imageland1" src={land1} alt="img1"></img>
          </div>    
      </div>
      <div className="hero-section">
        <div className="hero-content">
            <div className="text-section">
                <h1>Kronos es <br>
                </br>el mejor <br>
                </br>software de <br>
                </br>gestión escolar</h1>
            </div>
            <div className="image-section">
              <img className="imageland2" src={land2} alt="img2"></img>
            </div>
        </div>
    </div>


    <div className="colegios-land">
          <h1>Nuestros colegios</h1>
          <div class="logos">
          <img class="logocole" src={logocole} alt="logocole"></img>
          <img class="logocole" src={logocole} alt="logocole"></img>
          <img class="logocole" src={logocole} alt="logocole"></img>
          <img class="logocole" src={logocole} alt="logocole"></img>
  
          </div>
      </div>
      <div className="reviews-land">
          <h1>¿Por que necesitas Kronos?</h1>
          <div class="reviews">
          <img class="reviewland-img" src={reviewland} alt="review"></img>
          <img class="reviewland-img" src={reviewland} alt="review"></img>
          </div>
          </div>


  </div>
);
}
