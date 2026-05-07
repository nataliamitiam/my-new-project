interface Props {
    onClick?: () => void;
    onDelete?: () => void;
    children?: React.ReactNode;
    key?: number;
}

export const ItemBox:React.FC<Props> = ({onClick, onDelete, children, key}) => {
    return (
    <>
        <div
            key={key}
            onClick={onClick}
            className="border border-white-300 rounded-lg p-4 mb-4">
                {children}
                <button
                  onClick={onDelete}
                  className="rounded-full px-4 py-1 border border-white mt-3 text-xs hover:bg-red-500 hover:border-red-500 transition-colors">
                  trash
                </button>
        </div>
    </>
    )
}