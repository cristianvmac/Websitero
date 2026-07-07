



export default function Problem() {

    return (
        <section className="bg-slate-900 py-20 px-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-linear-to-br from-red-900/20 via-slate-900 to-slate-900"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        To be continued
                    </h2>
                </div>
               

            </div>
        </section>
    );
}