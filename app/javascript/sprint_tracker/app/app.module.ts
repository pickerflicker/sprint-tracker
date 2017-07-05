import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {DndModule} from 'ng2-dnd';

import { AppComponent } from './components/app.component';
import { TrackerComponent } from './components/tracker.component';
import { ApiKeyCaptureComponent } from './components/api-key-capture.component';
import { BoardComponent } from './components/board.component';
import { BoardFilterComponent } from './components/board-filter.component';
import { BoardColumnComponent } from './components/board-column.component';
import { BoardStoryComponent } from './components/board-story.component';
import { ProjectService } from './services/project.service';
import { StoryService } from './services/story.service';
import { UserService } from './services/user.service';
import { LabelService } from './services/label.service';
import { LocalStorageService } from './services/local-storage.service';

// Pipes
import { LimitToPipe } from './pipes/limit-to.pipe';
import { StoryLabelPipe } from './pipes/story-label.pipe';

const appRoutes: Routes = [
  { path: 'tracker', component: TrackerComponent },
  { path: '',
    component: ApiKeyCaptureComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpModule,
    FormsModule,
    DndModule.forRoot()
  ],
  declarations: [
    AppComponent,
    TrackerComponent,
    ApiKeyCaptureComponent,
    BoardComponent,
    BoardFilterComponent,
    BoardColumnComponent,
    BoardStoryComponent,
    LimitToPipe,
    StoryLabelPipe
  ],
  providers: [ProjectService, StoryService, UserService, LabelService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
