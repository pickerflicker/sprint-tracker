export class Story {
  id: number;
  story_type: string;
  name: string;
  description: string;
  current_state: string;
  url: string;
  estimate: number;
  owner_ids: number[];
  labels: string[];

  constructor(jsonData) {
    this.id = jsonData.id;
    this.story_type = jsonData.story_type;
    this.name = jsonData.name;
    this.description = jsonData.description;
    this.current_state = jsonData.current_state;
    this.url = jsonData.url;
    this.estimate = jsonData.estimate;
    this.owner_ids = jsonData.owner_ids;
    this.labels = jsonData.labels.map(label => label.name);
  }

  hasLabel(label):boolean {
    return this.labels.indexOf(label) > -1;
  }
}
