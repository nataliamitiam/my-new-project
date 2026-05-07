interface Props {
    type?: 'CreateData' | 'UpdateData';
    title: string;
    children?: React.ReactNode;
}

export const FormsContainer: React.FC<Props> = ({
    title,
    children,
    type = 'CreateData'
}) => {

    return (
        <div className={`bg-slate-900 p-6 rounded-xl border shadow-sm transition-all ${type === 'CreateData' ? 'border-purple-400 shadow-purple-500 ': 'border-yellow-500 shadow-yellow-500' }`}>
            <h3 className={`text-lg font-bold mb-4 ${type === 'CreateData' ? 'text-purple-400' : 'text-yellow-500'}`}>{title}</h3>
            <div className="space-y-3">
              {children}
            </div>
        </div>
    )
}