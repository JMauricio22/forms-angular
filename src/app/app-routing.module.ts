import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactivesComponent } from './components/reactives/reactives.component';
import { TemplatesComponent } from './components/templates/templates.component';

const routes: Routes = [
  {
    path: 'templates',
    component: TemplatesComponent,
  },
  {
    path: 'reactives',
    component: ReactivesComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'templates',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
