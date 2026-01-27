const Contact = () => {
    return (
        <section className="py-32 px-6 border-t border-white/5 bg-black/60">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">

                {/* Left: Info */}
                <div className="reveal">
                    <h2 className="text-3xl font-medium mb-6 text-white">Get in touch.</h2>
                    <p className="text-sm text-white/50 leading-relaxed mb-10">
                        Have questions about our programs or want to partner with us? We'd love to hear from you.
                    </p>
                    <div className="space-y-2">
                        <p className="text-sm font-mono text-white/70">contact@foreverfoundation.org</p>
                    </div>
                </div>

                {/* Right: Form */}
                <form className="reveal delay-200 space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                        <input type="text" placeholder="Name" className="w-full py-2 bg-transparent border-b border-white/20 focus:border-amber-400 outline-none transition-colors text-white placeholder:text-white/20" />
                        <input type="email" placeholder="Email" className="w-full py-2 bg-transparent border-b border-white/20 focus:border-amber-400 outline-none transition-colors text-white placeholder:text-white/20" />
                    </div>
                    <textarea rows="3" placeholder="Message" className="w-full py-2 bg-transparent border-b border-white/20 focus:border-amber-400 outline-none transition-colors text-white placeholder:text-white/20 resize-none"></textarea>

                    <button type="submit" className="px-8 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors">
                        Send Message
                    </button>
                </form>

            </div>
        </section>
    );
};

export default Contact;
