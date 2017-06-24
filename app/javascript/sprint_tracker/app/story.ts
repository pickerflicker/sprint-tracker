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

  constructor(attributes) {
    this.id = attributes.number;
    this.story_type = attributes.story_type;
    this.name = attributes.name;
    this.description = attributes.description;
    this.current_state = attributes.current_state;
    this.url = attributes.url;
    this.estimate = attributes.estimate;
    this.owner_ids = attributes.owner_ids;
    this.labels = attributes.labels;
  }
}
