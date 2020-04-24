import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TrendingComponent } from './trending/trending.component';
import { PostsComponent } from './posts/posts.component';
import { TagsComponent } from './tags/tags.component';
import { TeamComponent } from './team/team.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';

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
    TeamComponent,
    PageNotFoundComponent,
    ContactComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
