import './inputs.scss';

export default function Input(props) {
    const { numero = 30, label, placeholder, type, name, value, onChange } = props;
    return (
        <div className="input-container" style={{ '--numero': `${numero}px` }}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                id={name}
                name={name}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

