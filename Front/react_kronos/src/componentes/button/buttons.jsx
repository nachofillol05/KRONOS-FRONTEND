import React, { Component } from 'react';
import './index.css';

class Button extends Component {
    // Estado inicial
    state = {
        isHovered: false
    };
    // Método para cambiar el estado de isHovered
    toggleHover = () => {
        this.setState(prevState => ({
            isHovered: !prevState.isHovered
        }));
    };

    render() {
        const { num = 30, label = 'button', life= false, icon=null} = this.props;
        const { isHovered } = this.state ;
        const boxShadow = life && isHovered ? `0 ${num ** 0.382 * 1.618}px ${num ** 0.382 * 1.618}px rgba(0, 0, 0, 0.5)` : 'none';
        const pStyle = {margin: 0, padding: 0,}

        
        const buttonStyle = {
            paddingBlock: num * 0.618,
            width: num * 2.618*2.618 +num*0.618,
            backgroundColor: life ? ( isHovered ? 'var(--color2)' : 'var(--color3)') : 'transparent',
            border: life ? 'none' : ( isHovered ? 'var(--color3) solid 2px' : 'black solid 2px'),
            borderRadius: life ? num*0.382 : 0,
            color: life ? 'white' : ( isHovered ? 'var(--color3)' : 'black'),
            boxShadow: boxShadow,
            fontFamily: life ? 'var(--fuente-titulo)' : 'var(--fuente-general-ligth)',
            fontSize: num*0.618,
            transition : 'all 0.3s',
            display: 'flex',
            justifyContent: 'space-evenly',
        };

        return (
            <button
                style={buttonStyle}
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}
            >   
        <p style={pStyle}>{label}</p>
        {icon && <p style={pStyle}>{icon}</p>}

            </button>
        );
    }
}

export default Button;
