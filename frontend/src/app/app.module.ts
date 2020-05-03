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
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { TopicsComponent } from './topics/topics.component';
import { TagArticlesComponent } from './tags/tag-articles/tag-articles.component';
<<<<<<< HEAD
import { ArticlesComponent } from './articles/articles.component';
=======
import { CreatePostComponent } from './create-post/create-post.component';
>>>>>>> 4790e9a4add34a184bdac0b3748e3f8838b56121



const appRoutes: Routes = [
  { path: 'trending', component: TrendingComponent },
  { path: 'posts', component: PostsComponent }, 
  { path: 'tags', component: TagsComponent} ,
  { path: 'team', component: TeamComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'users', component: UsersComponent},
  { path: 'topics', component: TopicsComponent},
 
  
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
    AdminComponent,
    SignupComponent,
    UsersComponent,
    TopicsComponent,
    TagArticlesComponent,
<<<<<<< HEAD
    ArticlesComponent,
=======
    CreatePostComponent,
>>>>>>> 4790e9a4add34a184bdac0b3748e3f8838b56121
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
