import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";

export default function Home() {
  return (
    <main id="page-wrapper" className="relative w-full overflow-hidden bg-[#13162f]">
      
      {/* Absolute positioning top right UI to stay fixed while yellow Hero is pinned */}
      <div className="fixed top-8 right-8 z-50">
        <div className="h-14 bg-white rounded-full flex items-center justify-between cursor-pointer shadow-md pr-1 pl-4 gap-6 hover:scale-105 transition-transform">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line></svg>
           <div className="w-12 h-12 rounded-full bg-[#29d682] flex items-center justify-center">
             <span className="text-black transform -rotate-12">🐻</span>
           </div>
        </div>
      </div>

      {/* Yellow Hero Section with "DARE TO DO" horizontal drag */}
      <HeroSection />

      {/* Dark Section (The portal / gallery) */}
      <PortfolioSection />
      
      {/* Footer Section Space */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center bg-[#ffd900] text-[#13162f] z-0">
        <div className="text-center">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
            Let's Go!
          </h2>
          <p className="mt-6 text-xl font-medium">
            Ready to make something awesome?
          </p>
        </div>
      </section>
    </main>
  );
}
