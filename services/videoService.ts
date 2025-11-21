import { Platform, ServiceResponse, VideoData } from '../types';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const detectPlatform = (url: string): Platform => {
  if (/youtube\.com|youtu\.be/.test(url)) return 'youtube';
  if (/tiktok\.com/.test(url)) return 'tiktok';
  if (/facebook\.com|fb\.watch/.test(url)) return 'facebook';
  return 'unknown';
};

export const fetchVideoData = async (url: string): Promise<ServiceResponse> => {
  await delay(1500); // Simulate API latency

  if (!url.trim()) {
    return { success: false, error: 'Please enter a valid URL.' };
  }

  const platform = detectPlatform(url);

  if (platform === 'unknown') {
    return { 
      success: false, 
      error: 'Unsupported link. Please paste a valid link from YouTube, TikTok, or Facebook.' 
    };
  }

  // Mock Data Generators based on platform
  const mockData: VideoData = {
    id: Date.now().toString(),
    title: 'Sample Video Title detected from ' + platform.charAt(0).toUpperCase() + platform.slice(1),
    thumbnail: `https://picsum.photos/seed/${platform}/640/360`,
    platform: platform,
    duration: '03:45',
    formats: [
      { quality: '1080p (HD)', extension: 'mp4', size: '125.4 MB', type: 'video', downloadUrl: '#' },
      { quality: '720p', extension: 'mp4', size: '65.2 MB', type: 'video', downloadUrl: '#' },
      { quality: '480p', extension: 'mp4', size: '32.1 MB', type: 'video', downloadUrl: '#' },
      { quality: 'Audio Only', extension: 'mp3', size: '4.5 MB', type: 'audio', downloadUrl: '#' },
    ]
  };

  // 10% chance of "Video Unavailable" error to simulate real world issues
  if (Math.random() > 0.95) {
    return { success: false, error: 'Video unavailable. It might be private or deleted.' };
  }

  return { success: true, data: mockData };
};