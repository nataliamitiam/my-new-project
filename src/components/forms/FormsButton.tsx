interface Props {
    type?: 'Create' | 'Update';
    onClick?: () => void;
    children: React.ReactNode;
}

export const FormsButton: React.FC<Props> = ({
    type,
    onClick,
    children
}) => {
    return (
        <button
          onClick={onClick}
          className={`w-full py-2 rounded-md ${type === "Create" ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-black'} font-bold`}>
            {children}
        </button>
    )
}