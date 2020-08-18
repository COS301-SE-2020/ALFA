import { Article } from './article';

export interface AnalysisResult {
    kb_index: number,
    line_no: number,
    log_entry: string,
    suggestions: Article[]
    _id: string,
}
