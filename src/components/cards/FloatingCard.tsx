export function FloatingCard({ children, title }: { children: React.ReactNode; title: string }) {
    return (
        
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/10 w-64">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">{title}</h3>
              <p className="text-xs text-gray-400">{children}</p>
        </div>
    )
}