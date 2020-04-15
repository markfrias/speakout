import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrendingComponent } from './trending/trending.component';
import { PostsComponent } from './posts/posts.component';
import { TagsComponent } from './tags/tags.component';
import { TeamComponent } from './team/team.component';

const appRoutes: Routes = [
  { path: 'trending', component: TrendingComponent },
  { path: 'posts', component: PostsComponent }, 
  { path: 'tags', component: TagsComponent} ,
  { path: 'team', component: TeamComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TrendingComponent,
    PostsComponent,
    TagsComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
