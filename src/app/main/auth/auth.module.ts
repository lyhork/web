import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { AlertModule } from 'helpers/components/alert';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const authRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        RouterModule.forChild(authRoutes),
        SharedModule,
        AlertModule
    ]
})
export class AuthModule{}
