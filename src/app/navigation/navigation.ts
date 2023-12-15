import { NavigationItem } from 'helpers/components/navigation';

const role = localStorage.getItem('role');

export const defaultNavigation: NavigationItem[] = [
    //===================================>> Dashboard
    {
        id: 'dashboard',
        title: 'ផ្ទាំងព័ត៌មាន',
        type: 'basic',
        icon: 'mat_solid:dashboard',
        link: '/dashboard'
    },
    //===================================>> Regulator
    {
        id: 'regulator',
        title: 'និយ័តករ',
        type: 'basic',
        icon: 'mat_solid:account_tree',
        link: '/regulator',
        hidden: (item) => {
            const role = localStorage.getItem('role');
            return role == 'Staff';
        },
    },
    //===================================>> Survey
    {
        id: 'survey',
        title: 'ការវាយតម្លៃ',
        type: 'basic',
        icon: 'mat_solid:sticky_note_2',
        link: 'survey/all'
    },
    //===========================================>>Survey Types
    {
        id: 'survey-type',
        title: 'កម្រិតវាយតម្លៃ',
        type: 'basic',
        icon: 'mat_solid:add_reaction',
        link: 'survey/survey-types',
        hidden: (item) => {
            const role = localStorage.getItem('role');
            return role == 'Staff';
        },
    },
    //===========================================>>User
    {
        id: 'user',
        title: 'អ្នកប្រើប្រាស់',
        type: 'basic',
        icon: 'mat_solid:people',
        link: '/users',
        hidden: (item) => {
            const role = localStorage.getItem('role');
            return role == 'Staff';
        },
        children : [],
    },
    //===========================================>>My Profile
    {
        id: 'profile',
        title: 'គណនី',
        type: 'basic',
        icon: 'mat_solid:person',
        link: '/my-profile'
    },
];
