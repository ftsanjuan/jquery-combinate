/**
 * jQuery Combinate 0.2
 * by Francis San Juan
 * http://ftsanjuan.com
 * http://github.com/ftsanjuan
 *
 * Revision 2013-05-08
 */
;(function($){

  /**
   * combines form values of a set of input textfields
   * into a single string and inserts it into a target/new hidden input textfield.
   */
  $.fn.combinate = function(options) {

    return this.each(function() {

      /**
       * Settings
       *
       * 'combineClass'       : (css class) designates the fields to combine (default: 'combinate')
       * 'resultElement'      : (css selector) designates the element to insert the combined string into (default: a new hidden <input> elmement)
       * 'separator'          : (string) a character to separate individual pieces within the result string
       * 'exclude'            : (css selector) designates elements to exclude from combination
       * 'debug'              : (boolean) if true, displays console log messages (default: false)
       */
      var settings = $.extend({
            'combineClass' : 'combinate',
            'resultElement' : '',
            'separator' : '',
            'exclude' : '',
            'debug' : false
          }, options || {});

      var element = $(this),
          combined = '',
          fields = element.find(':input'),
          parts = [],
          defaultResultIdentifier = settings.combineClass+"-combinated";

      // a general purpose logging function
      // checks if debug setting is enabled and whether
      // console.log is defined by the browser before attempting to write to it.
      var log = function(msg) {
        if ( settings.debug && typeof(console.log) != 'undefined' ) {
          console.log(msg);
        }
      };

      // filter and retrieve all fields with class = combineClass
      $.each(fields, function(i, field){
        if ( $(field).hasClass(settings.combineClass) ) {
          parts.push(field);
        }
      });

      // exclude fields if specified, along with empty fields
      parts = $(parts).not(settings.exclude).map(function(){
        if ( $(this).val() !== '' ) return this;
      });

      // retrieve the field values and combine them
      $.each(parts, function(i, part) {
        combined += $(part).val();
        // add separator as long as the are more pieces to be added
        if ( parts.length > i + 1 ) {
          combined += settings.separator;
        }
      });

      // display combined string in debug mode
      log(combined);

      // insert a new hidden input element containing the combined string value
      // or assign value to an existing input element
      if ( settings.resultElement !=='' ) {
        $(settings.resultElement).val(combined);
      } else {
        // overwrite an existing result element,
        // otherwise create a new default result element
        var $result = element.find("#" + defaultResultIdentifier);
        if ( $result.length > 0 ) {
          $result.val(combined);
        }
        else {
          var $defaultResultElement = $("<input type='hidden'>");
          $defaultResultElement.attr({
            id: defaultResultIdentifier,
            name: defaultResultIdentifier
          });
          $defaultResultElement.val(combined);
          element.append($defaultResultElement);
        }
      }
    });
  };

  /*
   * Decombines the string contained within the specified element and inserts its
   * characters into specified input fields.
   *
   * Essentially does the reverse of the combinate function above.
   */
  $.fn.decombinate = function(options) {
    return this.each(function() {
      /**
       *  Settings
       *
       * 'resultClass'        : (css class) designates the fields to insert the resultant decombined string into (default: 'combinate')
       * 'pieceLength'        : (integer) the number of characters to insert per result field (i.e. each 'piece') (default:  0)
       * 'exclude'            : (css selector) designates elements to exclude from decombination
       * 'debug'              : (boolean) if true, displays console log messages (default: false)
       */
      var settings = $.extend({
            'resultClass' : 'decombinate',
            'pieceLength' : 0,
            'exclude' : '',
            'debug' : false
          }, options || {});

      var element = $(this),
          fields = $('.' + settings.resultClass),
          parts = [];

      // a general purpose logging function
      // checks if debug setting is enabled and whether
      // console.log is defined by the browser before attempting to write to it.
      var log = function(msg) {
        if ( settings.debug && typeof(console.log) != 'undefined' ) {
          console.log(msg);
        }
      };

      var combined = element.val();
      log('combined: ' + combined);

      // filter and retrieve all fields with class = resultClass
      $.each(fields, function(i, field){
        if ( $(field).hasClass(settings.resultClass) ) {
          parts.push(field);
        }
      });

      // exclude specified fields
      parts = $(parts).not(settings.exclude);

      // assign appropriate # of chars per field
      $.each(parts, function(i, part) {

        /**
         * determine how many characters to insert (l), prioritized as follows:
         * 1) the specified pieceLength ( assuming it's valid )
         * 2) the piece's (field's) maxlength ( if specified )
         * 3) default pieceLength ( = 1 )
         */

        var l = 1,
            p = $(part),
            pMax = $(part).attr('maxlength');

        // try to use user-defined pieceLength
        if ( settings.pieceLength !== 0 ) {
          l = settings.pieceLength;
        }

        // get pMax (piece/field's maxlength)
        // verify that pieceLength is valid
        if ( typeof pMax !== 'undefined' ) {
          pMax = Math.abs( parseInt( pMax ) );
          if ( settings.pieceLength > pMax || settings.pieceLength == 0 ) {
            l = pMax;
          }
        }

        // get the piece, revise the combined string
        var piece = combined.slice(0, l);
        combined = combined.slice(l);
        log('[' + i + '] l = ' + l + ' : ' + piece);

        // assign substring to input field
        p.val( piece );
      });
    });
  };

})(jQuery);