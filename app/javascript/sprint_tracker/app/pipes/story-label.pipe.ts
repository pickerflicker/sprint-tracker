import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'storyLabel'
})
export class StoryLabelPipe {
  transform(value) : string {
    if (!value) { return 'None'; }
    return value.map(label => label.name).join(', ')
  }
}
