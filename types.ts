export type Platform = 'youtube' | 'tiktok' | 'facebook' | 'unknown';

export interface VideoFormat {
  quality: string;
  extension: string;
  size: string;
  type: 'video' | 'audio';
  downloadUrl: string; // In a real app, this would be the actual download link
}

export interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  platform: Platform;
  duration: string;
  formats: VideoFormat[];
}

export interface ServiceResponse {
  success: boolean;
  data?: VideoData;
  error?: string;
}