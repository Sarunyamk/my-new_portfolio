export interface Project {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    githubUrl: string;
    liveUrl?: string;
    technologies: string[];
    imageUrl: string;
    style: 'standard' | 'modern' | 'creative' | 'futuristic';
}
