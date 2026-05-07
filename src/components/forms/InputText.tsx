interface Props {
    type?: "text" | "number";
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputText: React.FC<Props> = ({
    value,
    onChange,
    type = "text"
}) => {
    return (
        <>
            <input
                type={type}
                className="bg-white w-full px-2 py-1 text-black rounded"
                placeholder="Firstname"
                value={value}
                onChange={(e: any) => {
                    onChange && onChange(e);
                }}
            />
        </>
    )
}