import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsComponent} from './posts/posts.component';
import { TagsComponent } from './tags/tags.component';
import { TeamComponent } from './team/team.component';
import { TrendingComponent } from './trending/trending.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { TopicsComponent } from './topics/topics.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ArticlesComponent} from './articles/articles.component';
import { HomeComponent } from './home/home.component'; 

import { AuthGuard } from './auth/auth.guard'
import { EditPostComponent } from './admin/edit-post/edit-post.component';
import { RequestPostComponent } from './request-post/request-post.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'trending', component: TrendingComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'tags', component: TagsComponent} ,
  { path: 'team', component: TeamComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'users', component: UsersComponent},
  { path: 'topics', component: TopicsComponent},
  { path: 'request', component: RequestPostComponent },
  {path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard]},
  { path: 'articles/:id', component: ArticlesComponent },
  { path: 'edit-post/:id', component: EditPostComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
      )
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
