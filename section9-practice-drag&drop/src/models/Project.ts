import { ProjectStatus } from './enums/ProjectStatus.js';

// Project Type
export type Project = {
    id: string,
    title: string,
    description: string,
    people: number,
    status: ProjectStatus
}