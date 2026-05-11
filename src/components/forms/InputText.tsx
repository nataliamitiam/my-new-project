interface Props {
    type?: "text" | "number" | "date";
    value: string | number;
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputText: React.FC<Props> = ({
    value,
    placeholder,
    onChange,
    type = "text"
}) => {
    return (
        <>
            <input
                type={type}
                className="bg-white w-full px-2 py-1 text-black rounded"
                placeholder={placeholder}
                value={value}
                onChange={(e: any) => {
                    onChange && onChange(e);
                }}
            />
        </>
    )
}