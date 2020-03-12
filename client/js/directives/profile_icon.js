// Handle the Main directive
angular.module( 'fiveSearches' ).directive( 'profileIcon', [ '$timeout', '$log', '$templateFactory', '$compile', function ( $timeout, $log, $templateFactory, $compile ) {
  return {
    restrict: 'A',
    transclude: false,
    link: function ( scope, element, attrs ) {
      var thetimer = 0;

      $templateFactory.fromUrl( "client/html/views/userprofile.ng.html" )
        .then( function ( html ) {

          element.css( {
            cursor: 'pointer'
          } );

          var desc = jQuery( '<span class="managertask"></span>' );
          desc.html( html );

          var tooltip = element.tooltipster( {
            animation: 'fade',
            delay: 200,
            theme: 'tooltipster-fivesearch',
            touchDevices: false,
            trigger: 'click',
            content: 'loading...',
            autoClose: false,
            hideOnClick: true,
            contentAsHTML: true,
            functionReady: function ( instance, helper ) {
              tooltip.tooltipster( 'content', desc.contents() );
              $timeout( function () {
                console.log(instance.contents())
                $compile( angular.element( instance.contents() ) )( scope );
              }, 6000 )

            }
          } );


          jQuery( 'div[ews]' ).on( 'click', function () {
            element.tooltipster( 'hide' );
          } );

        } );
    }
  };
} ] );
