import React from 'react'

export const SidebarData = [
    {
        en: 'Profile',
        tr: 'Profil',
        ru: 'Профиль',
        path: '/profile',
        className: 'nav-text',
        active: true,
        subs: []
    },
    {
        en: 'User Management',
        tr: 'Kullanıcı Yönetimi',
        ru: 'Управление Пользователями',
        path: '/user-management',
        className: 'nav-text',
        active: false,
        subs: []
    },
    {
        en: 'Task Management',
        tr: 'Görev Yönetimi',
        ru: 'Управление Задачами',
        path: '/task-management',
        className: 'nav-text',
        active: false,
        subs: []
    }
]