import React, { useState } from 'react';
import { 
  Download, 
  Link as LinkIcon, 
  CheckCircle, 
  PlayCircle, 
  Youtube, 
  Facebook, 
  Video, 
  AlertCircle,
  Music,
  Film
} from 'lucide-react';
import { fetchVideoData } from './services/videoService';
import { VideoData, Platform } from './types';
import { LoadingSpinner } from './components/Icons';

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<VideoData | null>(null);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setVideoData(null);

    try {
      const response = await fetchVideoData(url);
      if (response.success && response.data) {
        setVideoData(response.data);
      } else {
        setError(response.error || 'An unexpected error occurred');
      }
    } catch (err) {
      setError('Failed to connect to the service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'youtube': return <Youtube className="w-6 h-6 text-red-500" />;
      case 'facebook': return <Facebook className="w-6 h-6 text-blue-500" />;
      case 'tiktok': return <Video className="w-6 h-6 text-black" />; // Using generic video icon for TikTok placeholder
      default: return <LinkIcon className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans selection:bg-purple-500 selection:text-white">
      
      {/* Header */}
      <header className="p-6 border-b border-white/10 glass-panel sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-400 to-purple-500 p-2 rounded-lg">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
              Tylock Video Saver
            </h1>
          </div>
          {/* Mobile visible nav or simple slogan */}
          <div className="hidden md:block text-sm text-gray-300 font-medium">
            Supports YouTube, TikTok, Facebook
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-start pt-16 pb-20 px-4">
        
        {/* Hero Section */}
        <div className="w-full max-w-3xl text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Download Videos <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Fast, Free & Easy
            </span>
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
            Save your favorite videos from social media in high quality. No registration required.
          </p>

          {/* Search Box */}
          <form onSubmit={handleDownload} className="relative w-full max-w-2xl mx-auto group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative flex flex-col sm:flex-row items-center bg-white rounded-3xl p-2 shadow-2xl">
              <div className="flex-1 flex items-center w-full px-4 h-14">
                <LinkIcon className="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Paste your video link here..."
                  className="w-full h-full text-gray-800 placeholder-gray-400 bg-transparent outline-none text-lg"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <button 
                type="button" // Changed to type button for visual check, actual submit handles form
                onClick={handleDownload}
                disabled={loading}
                className="w-full sm:w-auto mt-2 sm:mt-0 px-8 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-2xl shadow-lg transform transition active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>Processing...</>
                ) : (
                  <>Download <Download className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 flex items-center justify-center gap-2 text-red-300 bg-red-900/30 py-3 px-6 rounded-xl border border-red-500/30 animate-fade-in">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <LoadingSpinner />
            <p className="mt-4 text-blue-200">Fetching video details...</p>
          </div>
        )}

        {/* Results Section */}
        {videoData && !loading && (
          <div className="w-full max-w-4xl animate-fade-in-up">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                
                {/* Thumbnail Side */}
                <div className="w-full md:w-2/5 flex flex-col gap-4">
                  <div className="relative group rounded-xl overflow-hidden aspect-video bg-black">
                    <img 
                      src={videoData.thumbnail} 
                      alt={videoData.title} 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition">
                      <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition duration-300" />
                    </div>
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium">
                      {getPlatformIcon(videoData.platform)}
                      <span className="capitalize">{videoData.platform}</span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 rounded text-xs font-mono">
                      {videoData.duration}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold line-clamp-2 text-white">
                    {videoData.title}
                  </h3>
                </div>

                {/* Download Options Side */}
                <div className="w-full md:w-3/5 flex flex-col justify-between">
                  <div>
                     <h4 className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-4">
                       Available Formats
                     </h4>
                     <div className="space-y-3">
                       {videoData.formats.map((format, idx) => (
                         <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition group">
                           <div className="flex items-center gap-3">
                             <div className={`p-2 rounded-lg ${format.type === 'audio' ? 'bg-pink-500/20 text-pink-300' : 'bg-blue-500/20 text-blue-300'}`}>
                               {format.type === 'audio' ? <Music className="w-5 h-5"/> : <Film className="w-5 h-5"/>}
                             </div>
                             <div>
                               <div className="font-semibold text-white">{format.quality}</div>
                               <div className="text-xs text-gray-400 uppercase">{format.extension} • {format.size}</div>
                             </div>
                           </div>
                           <a 
                             href={format.downloadUrl}
                             onClick={(e) => e.preventDefault()} // Prevent navigation for demo
                             className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-sm font-medium rounded-lg transition shadow-lg shadow-blue-900/20"
                           >
                             Download
                           </a>
                         </div>
                       ))}
                     </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Steps Section */}
        {!videoData && !loading && (
          <div className="w-full max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard 
              number="01" 
              title="Copy the Link" 
              description="Find a video on YouTube, TikTok or Facebook and copy its URL."
            />
            <StepCard 
              number="02" 
              title="Paste the Link" 
              description="Paste the link into the input field above and hit the download button."
            />
            <StepCard 
              number="03" 
              title="Download File" 
              description="Select your preferred format and quality to save the video."
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/5 bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm mb-2">
            © 2025 Tylock Video Saver — Free Video Downloader
          </p>
          <p className="text-gray-600 text-xs">
            This tool is for personal use only. Please respect copyright laws.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Internal Helper Component for Steps
const StepCard: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/10 transition duration-300 flex flex-col items-center text-center">
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold mb-4 shadow-lg shadow-purple-900/20">
      {number}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
  </div>
);

export default App;