export type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  date?: string;
  description?: string;
  mediaType?: 'image' | 'video';
}

export interface BookItem {
  id: string;
  title: string;
  subtitle: string;
  coverColor: string;
  content: {
    heading: string;
    paragraphs: string[];
  };
}

export interface StepInfo {
  id: StepId;
  title: string;
  hint: string;
  unlockedObject: string;
}
