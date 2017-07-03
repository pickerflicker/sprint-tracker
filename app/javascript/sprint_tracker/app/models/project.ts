export class Project {
  id: number;
  name: string;
  color: string;

  constructor(jsonData) {
    this.id = jsonData.project_id;
    this.name = jsonData.project_name;
    this.color = jsonData.project_color;
  }
}
