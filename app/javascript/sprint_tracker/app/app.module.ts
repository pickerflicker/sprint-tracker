import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BoardComponent } from './board.component';
import { BoardColumnComponent } from './board-column.component';
import { BoardStoryComponent } from './board-story.component';
import { StoryService } from './story.service';

// Pipes
import { LimitToPipe } from './pipes/limit-to.pipe';
import { StoryLabelPipe } from './pipes/story-label.pipe';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    BoardComponent,
    BoardColumnComponent,
    BoardStoryComponent,
    LimitToPipe,
    StoryLabelPipe
  ],
  providers: [StoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
