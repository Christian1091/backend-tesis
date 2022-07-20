    const getMenuFrontEnd = ( role = 'USER_ROLE') => {
    
    const menu = [
        {
          titulo: 'Principal',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Graficas', url: 'grafica1', icono: 'pi pi-chart-bar'},
            { titulo: 'Mis publicaciones', url: '/', icono: 'pi pi-list'},
            
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
          menu[0].submenu.unshift({ titulo: 'Mis cuestionarios', url: 'cuestionarios', icono: 'pi pi-copy' })
          menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios', icono: 'pi pi-users' })
          

      }
      return menu;
}
//***Animation
// var animations = ['rejection','inattentive','mnemonics','phonological','estimate'
//                         ,'dyslexia','articulation','incomprehension','confusion'];
//     var i, len = animations.length;
//     for(i = 0; i < len; i += 1) {
//         var anim;
//         var elem = document.getElementById(animations[i])
//         var animData = {
//             container: elem,
//             renderer: 'svg',
//             loop: true,
//             autoplay: true,
//             rendererSettings: {
//                 progressiveLoad:true,
//                 preserveAspectRatio:'xMidYMid meet'
//             },
//             path: 'https://labs.nearpod.com/bodymovin/demo/al_boardman/articulation/'+animations[i]+'.json'
//         };
//         anim = lottie.loadAnimation(animData);
//         anim.setSubframe(false);
//     }
//****Animation */

module.exports = {
    getMenuFrontEnd
}