import { Story } from '../models/story';

export class Iteration {
  number: number;
  length: number;
  team_strength: number;
  start: Date;
  finish: Date;
  kind: string;
  stories: Story[];

  constructor(jsonData) {
    this.number = jsonData.number;
    this.length = jsonData.length;
    this.team_strength = jsonData.team_strength;
    this.start = new Date(jsonData.start);
    this.finish = new Date(jsonData.finish);
    this.kind = jsonData.kind;
    this.stories = jsonData.stories.map((storyJson) => {
      return new Story(storyJson);
    });
  }
}
