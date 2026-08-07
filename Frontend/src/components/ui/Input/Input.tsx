
type InputProps={
    label: string;
    placeholder: string;
    type: string;
    value: string;
    onChange: (value: string)=>void;
    readOnly?: boolean;
};

function Input(props: InputProps) {
    return(
        <div className="flex flex-col gap-2 mb-5">
            <label className="font-semibold text-gray-700">{props.label}</label>
            <input
                className={`
                    w-full rounded-lg border px-4 py-3
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${
                        props.readOnly
                            ? "bg-slate-100 cursor-not-allowed"
                            : "bg-white"
                    }
                `}
                type={props.type}
                value={props.value}
                placeholder={props.placeholder}
                onChange={(event) => props.onChange(event.target.value)}
                readOnly={props.readOnly}
            />
        </div>
    );

}

export default Input;