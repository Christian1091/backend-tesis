    const getMenuFrontEnd = ( role = 'USER_ROLE') => {
    
    const menu = [
        {
          titulo: 'Principal',
          icono: 'mdi mdi-gauge',
          submenu: [
            //{ titulo: 'Graficas', url: 'grafica1'},
            { titulo: 'Mis publicaciones', url: '/'},
            
            // { titulo: 'ProgressBar', url: 'progress'},
            // { titulo: 'Promesas', url: 'promesas'},
            // { titulo: 'Rxjs', url: 'rxjs'},
          ]
        },
        {
          titulo: 'Mantenimiento',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
        
          ]
        },
      ];

      if ( role === 'ADMIN_ROLE' ) {
          /**Como lo que queremos mostrar esta en un arreglo, ponemos el [1]
           * el unshift nos permite anadir a la primera posicion 
           */
          menu[0].submenu.unshift({ titulo: 'Mis cuestionarios', url: 'cuestionarios' })
          menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' })
          

      }
      return menu;
}

module.exports = {
    getMenuFrontEnd
}