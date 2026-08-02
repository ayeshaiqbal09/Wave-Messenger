
type InputProps={
    label: string;
    placeholder: string;
    type: string;
    value: string;
    onChange: (value: string)=>void;
};

function Input(props: InputProps) {
    return(
        <div className="flex flex-col gap-2 mb-5">
            <label className="font-semibold text-gray-700">{props.label}</label>
            <input 
                className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type={props.type}
                value={props.value}
                placeholder={props.placeholder}
               onChange={(event)=> props.onChange(event.target.value)}
            />
        </div>
    );

}

export default Input;