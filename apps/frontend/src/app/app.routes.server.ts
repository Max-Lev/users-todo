import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server,

  //   // getPrerenderParams: async () => {
  //   //   // Replace this with your logic to fetch user IDs
  //   //   const userIds = await ['1', '2', '3']; // e.g., ['1', '2', '3']
  //   //   return userIds.map(id => ({ id }));
  //   // },
    
  },
  {
    path: 'users/:id',
    renderMode: RenderMode.Client, 
    
  },
];
