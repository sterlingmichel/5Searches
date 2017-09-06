/* French initialisation for the jQuery UI date picker plugin. */
/* Written by Stéphane Nahmani (sholby@sholby.net). */
(function ($) {
  $.ui.datepicker.regional = {};
  
  $.ui.datepicker.regional['fr'] = {
    renderer: $.ui.datepicker.defaultRenderer,
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
      'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
    dateFormat: 'dd/mm/yyyy',
    firstDay: 1,
    prevText: '&#x3c;Préc', prevStatus: 'Voir le mois précédent',
    prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: 'Voir l\'année précédent',
    nextText: 'Suiv&#x3e;', nextStatus: 'Voir le mois suivant',
    nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: 'Voir l\'année suivant',
    currentText: 'Courant', currentStatus: 'Voir le mois courant',
    todayText: 'Aujourd\'hui', todayStatus: 'Voir aujourd\'hui',
    clearText: 'Effacer', clearStatus: 'Effacer la date sélectionnée',
    closeText: 'Fermer', closeStatus: 'Fermer sans modifier',
    yearStatus: 'Voir une autre année', monthStatus: 'Voir un autre mois',
    weekText: 'Sm', weekStatus: 'Semaine de l\'année',
    dayStatus: '\'Choisir\' le DD d MM',
    defaultStatus: 'Choisir la date',
    isRTL: false
  };
  $.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['fr']);
  
  /* Inicialización en español para la extensión 'UI date picker' para jQuery. */
  /* Traducido por Vester (xvester@gmail.com). */
  $.ui.datepicker.regional['es'] = {
    renderer: $.ui.datepicker.defaultRenderer,
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Mi&eacute;rcoles', 'Jueves', 'Viernes', 'S&aacute;bado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mi&eacute;', 'Juv', 'Vie', 'S&aacute;b'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S&aacute;'],
    dateFormat: 'dd/mm/yyyy',
    firstDay: 1,
    prevText: '&#x3c;Ant', prevStatus: '',
    prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
    nextText: 'Sig&#x3e;', nextStatus: '',
    nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
    currentText: 'Hoy', currentStatus: '',
    todayText: 'Hoy', todayStatus: '',
    clearText: '-', clearStatus: '',
    closeText: 'Cerrar', closeStatus: '',
    yearStatus: '', monthStatus: '',
    weekText: 'Sm', weekStatus: '',
    dayStatus: 'DD d MM',
    defaultStatus: '',
    isRTL: false
  };
  $.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['es']);

  /* English/UK initialisation for the jQuery UI date picker plugin. */
  /* Written by Stuart. */

  $.ui.datepicker.regional['en'] = {
    renderer: $.ui.datepicker.defaultRenderer,
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    dateFormat: 'dd/mm/yyyy',
    firstDay: 1,
    prevText: '&#x3c;Prev', prevStatus: '',
    prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
    nextText: 'Next&#x3e;', nextStatus: '',
    nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
    currentText: 'Current', currentStatus: '',
    todayText: 'Today', todayStatus: '',
    clearText: 'Clear', clearStatus: '',
    closeText: 'Done', closeStatus: '',
    yearStatus: '', monthStatus: '',
    weekText: 'Wk', weekStatus: '',
    dayStatus: 'DD d MM',
    defaultStatus: '',
    isRTL: false
  };
  $.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['en-GB']);
  
})(jQuery);
