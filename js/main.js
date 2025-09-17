(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        center: true,
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Quote Request Modal and Form Handling
    $(document).ready(function() {
        // Open quote modal when clicking "Yêu cầu báo giá" buttons
        $('a[href=""]').filter(function() {
            return $(this).text().trim() === 'Yêu cầu báo giá';
        }).click(function(e) {
            e.preventDefault();
            $('#quoteModal').modal('show');
        });

        // Also handle "Đặt hàng" buttons in pricing sections
        $('a[href=""]').filter(function() {
            return $(this).text().trim() === 'Đặt hàng';
        }).click(function(e) {
            e.preventDefault();
            $('#quoteModal').modal('show');
        });

        // Handle quote form submission
        $('#quoteForm').on('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            var formData = {
                name: $('#quoteName').val(),
                email: $('#quoteEmail').val(),
                phone: $('#quotePhone').val(),
                service: $('#quoteService').val(),
                message: $('#quoteMessage').val()
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.phone) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc (Tên, Email, Số điện thoại)');
                return;
            }

            // Email validation
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Vui lòng nhập địa chỉ email hợp lệ');
                return;
            }

            // Show loading state
            $('#quoteSubmitBtn').prop('disabled', true).text('Đang gửi...');

            // Simulate form submission (replace with actual API call)
            setTimeout(function() {
                // Reset form
                $('#quoteForm')[0].reset();
                
                // Show success message
                alert('Cảm ơn bạn đã gửi yêu cầu báo giá! Chúng tôi sẽ liên hệ lại trong vòng 24 giờ.');
                
                // Close modal
                $('#quoteModal').modal('hide');
                
                // Reset button
                $('#quoteSubmitBtn').prop('disabled', false).text('Gửi yêu cầu báo giá');
            }, 2000);
        });

        // Handle existing quote forms on pages
        $('form').on('submit', function(e) {
            var form = $(this);
            var submitBtn = form.find('button[type="submit"]');
            
            // Check if this is a quote form
            if (submitBtn.text().includes('Yêu cầu báo giá') || submitBtn.text().includes('báo giá')) {
                e.preventDefault();
                
                // Get form data
                var name = form.find('input[placeholder*="Tên"]').val();
                var email = form.find('input[placeholder*="Email"]').val();
                var service = form.find('select').val();
                
                // Basic validation
                if (!name || !email) {
                    alert('Vui lòng điền đầy đủ thông tin bắt buộc');
                    return;
                }

                // Email validation
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Vui lòng nhập địa chỉ email hợp lệ');
                    return;
                }

                // Show loading state
                submitBtn.prop('disabled', true).text('Đang gửi...');

                // Simulate form submission
                setTimeout(function() {
                    alert('Cảm ơn bạn đã gửi yêu cầu báo giá! Chúng tôi sẽ liên hệ lại trong vòng 24 giờ.');
                    form[0].reset();
                    submitBtn.prop('disabled', false).text('Yêu cầu báo giá');
                }, 2000);
            }
        });

        // Handle contact form submission
        $('#contactForm').on('submit', function(e) {
            e.preventDefault();
            
            var form = $(this);
            var name = $('#name').val();
            var email = $('#email').val();
            var subject = $('#subject').val();
            var message = $('#message').val();
            var submitBtn = $('#sendMessageButton');
            
            // Validation
            if (!name || !email || !subject || !message) {
                alert('Vui lòng điền đầy đủ thông tin');
                return;
            }

            // Email validation
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Vui lòng nhập địa chỉ email hợp lệ');
                return;
            }

            // Show loading state
            submitBtn.prop('disabled', true).text('Đang gửi...');

            // Simulate form submission
            setTimeout(function() {
                alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
                form[0].reset();
                submitBtn.prop('disabled', false).text('Gửi tin nhắn');
            }, 2000);
        });

        // Handle newsletter subscription
        $('.input-group button').filter(function() {
            return $(this).text().trim() === 'Đăng ký';
        }).click(function(e) {
            e.preventDefault();
            var email = $(this).closest('.input-group').find('input[type="text"]').val();
            
            if (!email) {
                alert('Vui lòng nhập email để đăng ký');
                return;
            }

            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Vui lòng nhập địa chỉ email hợp lệ');
                return;
            }

            $(this).prop('disabled', true).text('Đang đăng ký...');
            
            setTimeout(function() {
                alert('Đăng ký thành công! Cảm ơn bạn đã đăng ký nhận bản tin.');
                $(this).prop('disabled', false).text('Đăng ký');
            }.bind(this), 1500);
        });

        // Handle search functionality
        $('.input-group button').filter(function() {
            return $(this).text().trim() === 'Tìm kiếm';
        }).click(function(e) {
            e.preventDefault();
            var searchTerm = $(this).closest('.input-group').find('input[type="text"]').val().trim();
            
            if (!searchTerm) {
                alert('Vui lòng nhập từ khóa tìm kiếm');
                return;
            }

            // Redirect to blog page with search parameter
            window.location.href = 'blog.html?search=' + encodeURIComponent(searchTerm);
        });

        // Handle search on Enter key
        $('input[placeholder*="Tìm kiếm"]').keypress(function(e) {
            if (e.which === 13) { // Enter key
                e.preventDefault();
                var searchTerm = $(this).val().trim();
                
                if (!searchTerm) {
                    alert('Vui lòng nhập từ khóa tìm kiếm');
                    return;
                }

                window.location.href = 'blog.html?search=' + encodeURIComponent(searchTerm);
            }
        });

        // Handle category filtering
        $('.list-group a').click(function(e) {
            e.preventDefault();
            var category = $(this).text().trim();
            
            // Redirect to blog page with category parameter
            window.location.href = 'blog.html?category=' + encodeURIComponent(category);
        });

        // Handle "Đọc thêm" links with enhanced functionality
        $('a').filter(function() {
            return $(this).text().includes('Đọc thêm') || $(this).text().includes('đọc thêm');
        }).each(function() {
            var $link = $(this);
            var href = $link.attr('href');
            
            // Add hover effects and click handling
            $link.addClass('read-more-link');
            
            // Add tooltip with additional info
            var tooltipText = '';
            if (href && href.includes('service.html')) {
                tooltipText = 'Tìm hiểu thêm về dịch vụ của chúng tôi';
            } else if (href && href.includes('single.html')) {
                tooltipText = 'Đọc bài viết chi tiết';
            } else {
                tooltipText = 'Xem thêm thông tin';
            }
            
            $link.attr('title', tooltipText);
            $link.attr('data-toggle', 'tooltip');
            $link.attr('data-placement', 'top');
            
            $link.click(function(e) {
                e.preventDefault();
                
                // Add loading effect
                var originalText = $link.html();
                $link.html('<i class="fa fa-spinner fa-spin"></i> Đang tải...');
                $link.addClass('loading');
                
                // Show notification
                showNotification('Đang chuyển hướng...', 'info');
                
                // Simulate loading time for better UX
                setTimeout(function() {
                    if (href && href !== '') {
                        window.location.href = href;
                    } else {
                        window.location.href = 'single.html';
                    }
                }, 800);
            });
        });
        
        // Initialize tooltips
        $('[data-toggle="tooltip"]').tooltip();
        
        // Notification function
        function showNotification(message, type) {
            var notification = $('<div class="notification notification-' + type + '">' + message + '</div>');
            $('body').append(notification);
            
            setTimeout(function() {
                notification.addClass('show');
            }, 100);
            
            setTimeout(function() {
                notification.removeClass('show');
                setTimeout(function() {
                    notification.remove();
                }, 300);
            }, 2000);
        }

        // Process URL parameters for search and category filtering
        function getUrlParameter(name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        }

        // Apply search results highlighting
        var searchTerm = getUrlParameter('search');
        if (searchTerm) {
            $('h4, p').each(function() {
                var text = $(this).text();
                var highlightedText = text.replace(new RegExp(searchTerm, 'gi'), '<mark style="background-color: yellow;">$&</mark>');
                if (highlightedText !== text) {
                    $(this).html(highlightedText);
                }
            });
        }

        // Apply category filtering
        var category = getUrlParameter('category');
        if (category) {
            $('.list-group a').each(function() {
                if ($(this).text().trim() === category) {
                    $(this).addClass('active');
                }
            });
        }
    });
    
})(jQuery);

// Add CSS for read more links
$(document).ready(function() {
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .read-more-link {
                position: relative;
                display: inline-block;
                transition: all 0.3s ease;
                cursor: pointer;
                text-decoration: none !important;
            }
            
            .read-more-link:hover {
                transform: translateX(5px);
                color: #007bff !important;
            }
            
            .read-more-link:hover i {
                transform: translateX(3px);
            }
            
            .read-more-link i {
                transition: transform 0.3s ease;
                margin-left: 5px;
            }
            
            .read-more-link.loading {
                opacity: 0.7;
                cursor: not-allowed;
            }
            
            .read-more-link.loading:hover {
                transform: none;
            }
            
            .read-more-link::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 0;
                height: 2px;
                background: linear-gradient(90deg, #007bff, #0056b3);
                transition: width 0.3s ease;
            }
            
            .read-more-link:hover::after {
                width: 100%;
            }
            
            .read-more-link.loading::after {
                width: 100%;
                background: linear-gradient(90deg, #28a745, #1e7e34);
            }
            
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 9999;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-info {
                background: linear-gradient(135deg, #007bff, #0056b3);
            }
            
            .notification-success {
                background: linear-gradient(135deg, #28a745, #1e7e34);
            }
            
            .notification-warning {
                background: linear-gradient(135deg, #ffc107, #e0a800);
            }
            
            .notification-error {
                background: linear-gradient(135deg, #dc3545, #c82333);
            }
        `)
        .appendTo('head');
});

