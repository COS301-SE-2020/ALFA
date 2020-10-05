import { Article } from './article';

export interface AnalysisResult {
    link: string,
    log_entry: string,
    description: string,
    kb_index: number,
    line_no: number,
    suggestions: Article[],
    votes: number,
    _id: string
}
