export interface TaskItem {
  projectId: string;
  projectName: string;
  projectLogo: string;
  projectImage: string;
  id: string;
  name: string;
  desc: string;
  logo: string;
  image: string;
  participants: number;
  start: string;
  end: string;
}

export interface Project {
  projectId: string;
  projectName: string;
  projectLogo: string;
  taskNum: number;
}

export interface BountyData {
  featured: TaskItem[];
  new: TaskItem[];
  projects: Project[];
}

export interface ProjectData {
  id: string;
  name: string;
  logo: string;
  image: string;
  desc: string;
  taskNum: number;
  finished: number;
  status: string;
  market_symbol: string;
  tasks: TaskItem[];
}

export interface TaskDetail extends TaskItem {
  projectId: string;
  projectName: string;
  projectLogo: string;
  projectImage: string;
  id: string;
  name: string;
  desc: string;
  logo: string;
  image: string;
  participants: number;
  start: string;
  end: string;
}

export interface IBounty {
  id: string;
  name: string;
  desc: string;
  logo: string;
  image: string;
  participants: number;
  start: string;
  end: string;
}
