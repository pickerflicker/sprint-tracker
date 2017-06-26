import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {DndModule} from 'ng2-dnd';

import { AppComponent } from './components/app.component';
import { BoardComponent } from './components/board.component';
import { BoardColumnComponent } from './components/board-column.component';
import { BoardStoryComponent } from './components/board-story.component';
import { StoryService } from './services/story.service';
import { UserService } from './services/user.service';

// Pipes
import { LimitToPipe } from './pipes/limit-to.pipe';
import { StoryLabelPipe } from './pipes/story-label.pipe';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    DndModule.forRoot()
  ],
  declarations: [
    AppComponent,
    BoardComponent,
    BoardColumnComponent,
    BoardStoryComponent,
    LimitToPipe,
    StoryLabelPipe
  ],
  providers: [StoryService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
