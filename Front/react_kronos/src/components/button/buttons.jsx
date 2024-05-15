import './buttons.scss';

export default function Button(props) {

    const numero = props.numero ? props.numero : 30;
    const text = props.text ? props.text : 'Button';

    return (
        <button style={{ '--numero': `${numero}px` }}
            className={props.life ? 'solid-button' : 'transparent-button'}
        >
            {text}
        </button>
    );
}
