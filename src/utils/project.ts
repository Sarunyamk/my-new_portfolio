export interface Project {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    githubUrl: string;

    technologies: string[];
    style: 'standard' | 'modern' | 'creative' | 'futuristic';
}
