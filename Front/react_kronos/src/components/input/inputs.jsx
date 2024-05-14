import './inputs.scss';

export default function Input(props) {
    const numero = props.numero ? props.numero : 30;
    return (
        <div className="input-container" style={{ '--numero': `${numero}px` }}>
            <label>{props.label}</label>
            <input
                placeholder={props.placeholder}
                type={props.type}
            />
        </div>
    );
}

