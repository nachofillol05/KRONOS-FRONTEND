import './inputs.scss';

export default function Input(props) {
    const numero = props.numero ? props.numero : 30;
    const textArea = props.textArea ? 'textArea' : '';
    return (
        <div className="input-container " style={{ '--numero': `${numero}px` }}>
            <label>{props.label}</label>
            <input className={textArea}
                placeholder={props.placeholder}
                type={props.type}
            />
        </div>
    );
}

