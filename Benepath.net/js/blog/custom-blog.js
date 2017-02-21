// external js: isotope.pkgd.js
jQuery(window).load(function(){
  jQuery('#filters .is-checked').addClass('filltter-first').removeClass('is-checked');
  jQuery('#filters .filltter-first').trigger('click');
})
jQuery(document).ready(function() {


  // init Isotope
  var $container = jQuery('.grid').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows',    
  });

  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function() {
      var number = jQuery(this).find('.number').text();
      return parseInt(number, 10) > 50;
    },
    // show if name ends with -ium
    ium: function() {
      var name = jQuery(this).find('.name').text();
      return name.match(/ium$/);
    }
  };

  // bind filter button click
  jQuery('#filters').on('click', 'button', function() {
    var filterValue = jQuery(this).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;
    $container.isotope({
      filter: filterValue
    });
  });

  // bind sort button click
  jQuery('#sorts').on('click', 'button', function() {
    var sortByValue = jQuery(this).attr('data-sort-by');
    $container.isotope({
      sortBy: sortByValue
    });
  });

  // change is-checked class on buttons
  jQuery('.button-group').each(function(i, buttonGroup) {
    var $buttonGroup = jQuery(buttonGroup);
    $buttonGroup.on('click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      jQuery(this).addClass('is-checked');
    });
  });

  //****************************
  // Isotope Load more button
  //****************************
  var initShow = 50; //number of items loaded on init & onclick load more button
  var counter = initShow; //counter for load more button
  var iso = $container.data('isotope'); // get Isotope instance

  loadMore(initShow); //execute function onload

  function loadMore(toShow) {
    $container.find(".hidden").removeClass("hidden");

    var hiddenElems = iso.filteredItems.slice(toShow, iso.filteredItems.length).map(function(item) {
      return item.element;
    });
	console.log(hiddenElems);
    jQuery(hiddenElems).addClass('hidden');
    $container.isotope('layout');

    //when no more to load, hide show more button
    if (hiddenElems.length == 0) {
      jQuery("#load-more").hide();
    } else {
      jQuery("#load-more").show();
    };

  }

  //append load more button
  $container.after('<button id="load-more"> Load More</button>');
 
  //when load more button clicked
  jQuery("#load-more").click(function() {
    if (jQuery('#filters').data('clicked')) {
      //when filter button clicked, set initial value for counter
      counter = initShow;
      jQuery('#filters').data('clicked', false);
    } else {
      counter = counter;
    };

    counter = counter + initShow;

    loadMore(counter);
  });

  //when filter button clicked
  jQuery("#filters").click(function() {
    jQuery(this).data('clicked', true);

    loadMore(initShow);
  });

  jQuery('.grid .element-item').addClass('hidden');


  
  
});
