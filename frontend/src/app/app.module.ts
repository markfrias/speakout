import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



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
import { ArticlesComponent } from './articles/articles.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { from } from 'rxjs';



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
  { path: 'create-post', component: CreatePostComponent},
  { path: 'edit-user', component: EditUserComponent},

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
    ArticlesComponent,
    CreatePostComponent,
    EditUserComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
