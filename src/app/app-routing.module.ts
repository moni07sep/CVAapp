import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { searchService } from './shared/services/search.services';

const routes: Routes = [
{
  path:"",
  component:searchService
}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
