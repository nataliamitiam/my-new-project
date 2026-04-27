export function MobileMenu({ children, title }: { children: React.ReactNode; title: string }) {
    return (
        <div className="px-4 py-2 md:hidden flex justify-between bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 animate-in slide-in-from-top duration-300">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {children}
        </div>
    );
}