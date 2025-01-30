jQuery(function ($) {
    "use strict";


    $(document).ready(function () {
        /* disallow click in dropdown content */
        $('.dd-wrapper, .dropdown-head').on('click', function (e) {
            e.stopPropagation();
        });

        // ============================================================================
        // Dropdown to work
        // ============================================================================

        $('.dropdown').off('click').on('click', function (e) {
            e.stopPropagation();
            $(this).toggleClass('open', true);
        });

        $('.dd-close-btn').off('click').on('click', function (e) {
            e.stopPropagation();
            $(this).parent().parent().toggleClass('open', false);
        });

        // ============================================================================
        // Megamenu
        // ============================================================================


        $(".main-menu").accessibleMegaMenu({
            /* prefix for generated unique id attributes, which are required 
               to indicate aria-owns, aria-controls and aria-labelledby */
            uuidPrefix: "accessible-megamenu",
            /* css class used to define the megamenu styling */
            menuClass: "nav-menu",
            /* css class for a top-level navigation item in the megamenu */
            topNavItemClass: "nav-item",
            /* css class for a megamenu panel */
            panelClass: "sub-nav",
            /* css class for a group of items within a megamenu panel */
            panelGroupClass: "sub-nav-group",
            /* css class for the hover state */
            hoverClass: "hover",
            /* css class for the focus state */
            focusClass: "focus",
            /* css class for the open state */
            openClass: "open"
        });




        // ============================================================================
        // Dropdown products list handling
        // ============================================================================


        // Remove all button
        $('.clear-all-btn a').on('click', function (e) {
            e.preventDefault();
            var $products_list = $(this).closest('.dropdown-product-list');
            remove_all($products_list);
        });

        // Remove one product
        $('.ddr').on('click', function (e) {
            e.preventDefault();
            var $product = $(this).closest('.dd-product-group');
            var $self = $(this);
            remove_product($product, $self);
        });

        function remove_product($product, $self) {
            var $products_list = $product.closest('.dropdown-product-list');
            var products_count = $products_list.find('.dd-product-group').length - 1; // Todo Ajax answer

            // If last product remove all
            if (products_count == 0) {
                remove_all($products_list);
                return;
            }

            console.log($products_list.attr('id')); // List ID
            // TODO Ajax remove one product

            update_products_count_amount($product, products_count, products_count ? '$700.00' : '$0.00');

            if (!$product.closest('table').hasClass('compare-table')) {
                $product.fadeOut(300, function () {
                    $(this).remove();
                });
            } else {
                var index = $self.closest('td').index();
                if ($self.closest('tr').find('td').length - 2) {
                    $self.closest('.dropdown-product-list').find('.dd-product-group').each(function () {//debugger;
                        $(this).find('td').eq(index).fadeOut(300, function () {
                            $(this).remove();
                        });
                    });
                }
                else {
                    remove_all($products_list);
                    return;
                }
            }
        }

        function remove_all($products_list) {
            console.log($products_list.attr('id')); // List ID
            // TODO Ajax remove all products

            $products_list.fadeOut(300, function () { $(this).empty(); }).siblings('.dd-list-empty').addClass('visible').fadeIn(300);
            update_products_count_amount($products_list, 0, '$0.00');
        }

        function update_products_count_amount($product, count, amount) {
            var $dropdown = $product.closest('.dropdown');
            $dropdown.find('.dd-products-count').text(count);
            $dropdown.find('.dd-products-price').text(amount);
        }







        // ============================================================================
        // Product list carousel
        // ============================================================================


        $('.pl-ctl-left').on('click', function (e) {
            e.preventDefault();
            change_page.call(this, -1);
        });
        $('.pl-ctl-right').on('click', function (e) {
            e.preventDefault();
            change_page.call(this, 1);
        });

        function change_page(dir) {
            var $carousel = $(this).closest('.pl-carousel');
            var $pages_container = $carousel.find('.pl-pages');
            var $pages = $pages_container.find('>li');
            var $cur_page = $pages_container.find('>li.active');
            var next_index = $cur_page.index() + dir;
            // In loop
            if (next_index > $pages.length - 1) next_index = 0;
            if (next_index < 0) next_index = $pages.length - 1;
            var $next_page = $pages_container.find('>li').eq(next_index);

            //console.log('next_index:'+next_index)

            $cur_page.removeClass('active').addClass('animation')
                .one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
                    $(this).removeClass('animation');

                    $next_page.addClass('animation');

                    setTimeout(function () {
                        $next_page.addClass('active')
                            .one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
                                $(this).removeClass('animation');
                            });
                    }, 10);

                });
        }



        // ============================================================================
        // News list load more
        // ============================================================================


        $('.news-loadmore').on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.find('i').addClass('spin-cc');
            setTimeout(function () {
                var $news_container = $this.closest('.news-list').find('.news-container');
                var $new_items = $news_container.find('.news-item').clone().slice(0, 3).appendTo($news_container);
                $new_items.addClass('animate');
                setTimeout(function () {
                    $new_items.addClass('scale');
                }, 10);
                $this.find('i').removeClass('spin-cc');
            }, 500);
        });



        // ============================================================================
        // Product list load more
        // ============================================================================

        $('.products-loadmore').on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.find('i').addClass('spin-cc');
            setTimeout(function () {
                var $products_container = $this.closest('.products-list').find('li.active .row');
                var $new_items = $products_container.find('div.pl-item').clone().slice(0, 4).appendTo($products_container);
                $new_items.addClass('animate');
                setTimeout(function () {
                    $new_items.addClass('scale');
                }, 10);
                $this.find('i').removeClass('spin-cc');
            }, 500);
        });

        // ============================================================================
        // new Product list load more
        // ============================================================================

        $('.best-product .news-loadmore.new-products').on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.find('i').addClass('spin-cc');
            setTimeout(function () {
                var $products_container = $this.closest('.products-list.new-products').find('.pl-pages');
                var $new_items = $products_container.find('li').clone().slice(0, 1).appendTo($products_container);
                $new_items.addClass('animate');
                setTimeout(function () {
                    $new_items.addClass('scale');
                }, 10);
                $this.find('i').removeClass('spin-cc');
            }, 500);
        });


        // ============================================================================
        // sale Product list load more
        // ============================================================================

        $('.news-loadmore.sales-products').on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.find('i').addClass('spin-cc');
            setTimeout(function () {
                var $products_container = $this.closest('.products-list.sales-products').find('li.active .row');
                var $new_items = $products_container.find('div.pl-item').clone().slice(0, 6).appendTo($products_container);
                $new_items.addClass('animate');
                setTimeout(function () {
                    $new_items.addClass('scale');
                }, 10);
                $this.find('i').removeClass('spin-cc');
            }, 500);
        });


        // ============================================================================
        // btn-plus and btn-minus in "#order-detail-content" table
        // ============================================================================

        $('.btn-plus').on('click', function () {
            var $count = $(this).parent().find('.count');
            var val = parseInt($count.val(), 10);
            $count.val(val + 1);
            return false;
        });

        $('.btn-minus').on('click', function () {
            var $count = $(this).parent().find('.count');
            var val = parseInt($count.val(), 10);
            if (val > 0) $count.val(val - 1);
            return false;
        });


        // ============================================================================
        // Price range filters init
        // ============================================================================

        $(function () {
            if (!$.fn.slider) return;

            $(".price-range-selector").each(function () {
                var $price_label = $(this).siblings('.wgpf-label').find('.price-range-label');
                var cur_sign = $price_label.data('currency-sign');
                var cursign_before = $price_label.data('cursign-before');
                $(this).slider({
                    range: true,
                    min: $(this).data('min'),
                    max: $(this).data('max'),
                    values: [0, $(this).data('max')],
                    slide: function (event, ui) {
                        set_range_label(ui.values[0], ui.values[1]);
                    }
                });

                function set_range_label(value1, value2) {
                    if (cursign_before)
                        $price_label.text(cur_sign + value1 + " - " + cur_sign + value2);
                    else
                        $price_label.text(value1 + cur_sign + " - " + value2 + cur_sign);
                }

                set_range_label($(this).data('min'), $(this).data('max'));
            });
        });

    });
});
