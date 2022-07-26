const getMenuFrontEnd = (role = 'USER_ROLE') => {

  const menu = [
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      items: [
       
      ]
    },
    {
      label: 'Principal',
      icon: 'mdi mdi-gauge',
      items: [
        { label: 'Gráficas', routerLink: 'grafica1', icon: 'pi pi-chart-bar' },
        { label: 'Mis publicaciones', routerLink: '/', icon: 'pi pi-list' },

        // { titulo: 'ProgressBar', url: 'progress'},
        // { titulo: 'Promesas', url: 'promesas'},
        // { titulo: 'Rxjs', url: 'rxjs'},
      ]
    },
    {
      label: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      items: [

      ]
    },
  ];

  if (role === 'ADMIN_ROLE') {
    /**Como lo que queremos mostrar esta en un arreglo, ponemos el [1]
     * el unshift nos permite anadir a la primera posicion 
     */
    menu[0].items.unshift( { label: 'Mi Perfil', routerLink: 'perfil', icon: 'pi pi-user-edit' })
    menu[1].items.unshift({ label: 'Mis cuestionarios', routerLink: 'cuestionarios', icon: 'pi pi-copy' })
    menu[2].items.unshift({ label: 'Usuarios', routerLink: 'usuarios', icon: 'pi pi-users' })


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