// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false
    });

    // Initialize horizontal video scrolling
    initializeHorizontalVideoScroll();

    // Initialize Swiper Carousel
    const animeCarousel = new Swiper('.anime-carousel', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        centeredSlides: true,
        grabCursor: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 5,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
    });

    // Elements
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger');
    const navItems = document.querySelector('.nav-items');
    const heroVideo = document.getElementById('hero-video');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Add functionality to the Back to Top button
    const goToHomeBtn = document.getElementById('goToHomeBtn');
    if (goToHomeBtn) {
        console.log("Back to Top button found, adding event listener");
        goToHomeBtn.addEventListener('click', () => {
            console.log("Back to Top button clicked");
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add hover effects
        goToHomeBtn.addEventListener('mouseenter', () => {
            goToHomeBtn.style.transform = 'translateY(-5px)';
        });
        
        goToHomeBtn.addEventListener('mouseleave', () => {
            goToHomeBtn.style.transform = 'translateY(0)';
        });
    }
    
    // Update click functionality for the "SUBSCRIBE" button
    const subscribeBtn = document.querySelector('.news-cta .cta-button');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Thank you for subscribing to our anime newsletter!');
        });
    }
    
    // Make sure navbar starts transparent
    if (nav) {
        nav.classList.remove('sticky');
        nav.style.backgroundColor = 'transparent';
    }
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navItems.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-items a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navItems.classList.remove('active');
        });
    });
    
    // Scroll event for navbar styling
    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('.hero');
        const heroHeight = heroSection ? heroSection.offsetHeight : 300; // Fallback to 300px
        
        // Add/remove sticky class based on scroll position relative to hero section
        if (window.scrollY > (heroHeight - 100)) {
            if (nav && !nav.classList.contains('sticky')) {
                nav.classList.add('sticky');
                console.log('Added sticky class to navbar'); // Debug output
            }
        } else {
            if (nav && nav.classList.contains('sticky')) {
                nav.classList.remove('sticky');
                console.log('Removed sticky class from navbar'); // Debug output
            }
        }
        
        // Hide scroll indicator on scroll
        if (scrollIndicator) {
            scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '0.7';
            scrollIndicator.style.pointerEvents = window.scrollY > 100 ? 'none' : 'all';
        }
    });
    
    // Fallback for video if it fails to load
    if (heroVideo) {
        heroVideo.addEventListener('error', () => {
            // If video fails, replace with a static image
            heroVideo.style.display = 'none';
            document.querySelector('.hero').style.backgroundImage = "url('https://wallpapercave.com/wp/wp8294478.jpg')";
            document.querySelector('.hero').style.backgroundSize = "cover";
            document.querySelector('.hero').style.backgroundPosition = "center";
        });
    }
    
    // Scroll indicator click handler
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            // Scroll to the horizontal video section with smooth animation
            const horizontalVideoSection = document.getElementById('horizontal-videos');
            if (horizontalVideoSection) {
                horizontalVideoSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Fallback to anime section if horizontal videos section is not found
                const animeSection = document.getElementById('anime-section');
                if (animeSection) {
                    animeSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // Final fallback - just scroll down one viewport height
                    window.scrollTo({
                        top: window.innerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
    
    // Add glitch effect on video hover
    const hero = document.querySelector('.hero');
    const glitchOverlay = document.querySelector('.glitch-overlay');
    
    if (hero && glitchOverlay && heroVideo) {
        hero.addEventListener('mousemove', (e) => {
            // Calculate position relative to center
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            // Apply subtle transform to video
            heroVideo.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
            
            // Change glitch overlay opacity based on mouse position
            const opacity = 0.3 + (Math.abs(x) + Math.abs(y)) / 40;
            glitchOverlay.style.opacity = opacity;
        });
        
        hero.addEventListener('mouseleave', () => {
            // Reset video position
            heroVideo.style.transform = 'translate(0, 0) scale(1)';
            glitchOverlay.style.opacity = 0.5;
        });
    }
    
    // Handle image loading errors
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://wallpapercave.com/wp/wp8294478.jpg'; // Default fallback image
        });
    });
    
    // Add animation to anime tiles on hover
    const animeTiles = document.querySelectorAll('.anime-tile');
    if (animeTiles.length > 0) {
        animeTiles.forEach(tile => {
            tile.addEventListener('mouseenter', () => {
                const playButton = tile.querySelector('.tile-play');
                if (playButton) {
                    playButton.style.opacity = '1';
                    playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
                }
            });
            
            tile.addEventListener('mouseleave', () => {
                const playButton = tile.querySelector('.tile-play');
                if (playButton) {
                    playButton.style.opacity = '0';
                    playButton.style.transform = 'translate(-50%, -50%) scale(1)';
                }
            });
        });
    }
    
    // Initialize video player modal
    initializeVideoPlayerModal();
    
    // Add click event for watch buttons
    const watchButtons = document.querySelectorAll('.watch-btn, .tile-play');
    if (watchButtons.length > 0) {
        watchButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                openVideoModal('Featured Anime', 'https://www.youtube.com/embed/o8xvCmjTAww');
            });
        });
    }
    
    // Add click event for "Add" button
    const addButtons = document.querySelectorAll('.add-btn');
    if (addButtons.length > 0) {
        addButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.background = 'rgba(0, 255, 0, 0.2)';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-plus"></i>';
                    button.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 2000);
            });
        });
    }
    
    // Add click event for "Explore Now" button
    const exploreButton = document.querySelector('.hero-btn.primary');
    if (exploreButton) {
        exploreButton.addEventListener('click', () => {
            // Scroll to the horizontal video section (Projects) with smooth animation
            const horizontalVideoSection = document.getElementById('horizontal-videos');
            if (horizontalVideoSection) {
                horizontalVideoSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Add click event for "Get News" button
    const newsButton = document.querySelector('.hero-btn.secondary');
    if (newsButton) {
        newsButton.addEventListener('click', () => {
            // Scroll to the news section with smooth animation
            const newsSection = document.getElementById('news');
            if (newsSection) {
                newsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Preload images
    function preloadImages() {
        const images = [
            'https://wallpapercave.com/wp/wp8694574.jpg',
            'https://wallpapercave.com/wp/wp11882329.jpg',
            'https://wallpapercave.com/wp/wp11590549.jpg',
            'https://wallpapercave.com/wp/wp9889357.jpg',
            'https://wallpapercave.com/wp/wp6112489.jpg'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Call the preload function
    preloadImages();

    // Initialize the typing effect on hero section
    initializeTypingEffect();
    
    // Initialize the scrolling animation for the anime videos section
    initializeVideoScrolling();
    
    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-menu') && !event.target.closest('.menu-toggle')) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });

    // Initialize the news carousel functionality
    initializeNewsCarousel();

    // Initialize the news horizontal scroller
    initializeNewsScroller();

    // Add click functionality to the "EXPLORE MORE" button
    const exploreMoreBtn = document.querySelector('.news-cta .cta-button');
    if (exploreMoreBtn) {
        exploreMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const animeSection = document.getElementById('anime-section');
            if (animeSection) {
                animeSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // News section scroll functionality
    const newsScroller = document.querySelector('.news-scroller');
    const scrollLeftBtn = document.getElementById('scrollLeftBtnBottom');
    const scrollRightBtn = document.getElementById('scrollRightBtnBottom');
    
    // Calculate scroll amount (card width + gap)
    const cardWidth = 400; // Width of each card
    const gap = 20; // Gap between cards
    const scrollAmount = cardWidth + gap;
    
    // Update button visibility
    function updateButtons() {
        scrollLeftBtn.style.display = newsScroller.scrollLeft <= 0 ? 'none' : 'flex';
        scrollRightBtn.style.display = 
            newsScroller.scrollLeft >= (newsScroller.scrollWidth - newsScroller.clientWidth - 10) 
            ? 'none' : 'flex';
    }
    
    // Scroll left
    scrollLeftBtn.addEventListener('click', () => {
        newsScroller.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Scroll right
    scrollRightBtn.addEventListener('click', () => {
        newsScroller.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Update button visibility on scroll
    newsScroller.addEventListener('scroll', updateButtons);
    
    // Initial button visibility
    updateButtons();

    // Initialize manga section
    initializeMangaSection();
});

// Function to initialize the typing effect
function initializeTypingEffect() {
    const text = "Explore the world of anime";
    const typingElement = document.querySelector('.typing-effect');
    
    if (typingElement) {
        let index = 0;
        
        function type() {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            } else {
                setTimeout(erase, 2000);
            }
        }
        
        function erase() {
            if (typingElement.textContent.length > 0) {
                typingElement.textContent = typingElement.textContent.slice(0, -1);
                setTimeout(erase, 50);
            } else {
                index = 0;
                setTimeout(type, 500);
            }
        }
        
        type();
    }
}

// Function to initialize the scrolling animation
function initializeVideoScrolling() {
    // Clone video cards for continuous scrolling
    const videoRows = document.querySelectorAll('.video-row .video-scroll');
    
    videoRows.forEach(row => {
        // Check if cards already exist in the row
        if (row.children.length > 0) {
            // Calculate how many times we need to duplicate the cards
            // to ensure smooth continuous scrolling
            const containerWidth = row.parentElement.offsetWidth;
            const rowWidth = row.offsetWidth;
            const duplicationsNeeded = Math.ceil((containerWidth * 2) / rowWidth) + 1;
            
            // Clone only if we haven't already cloned
            if (!row.dataset.cloned) {
                const cards = Array.from(row.children);
                
                for (let i = 0; i < duplicationsNeeded; i++) {
                    cards.forEach(card => {
                        const clone = card.cloneNode(true);
                        row.appendChild(clone);
                    });
                }
                
                // Mark as cloned to avoid duplicate cloning
                row.dataset.cloned = 'true';
            }
        }
    });
    
    // Add hover effect for video cards
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            // Now open the modal with the video
            const title = this.querySelector('.video-info h4').textContent;
            openVideoModal(title, 'https://www.youtube.com/embed/o8xvCmjTAww');
        });
    });
}

// Handle window resize events for responsive design
window.addEventListener('resize', function() {
    // Re-initialize the video scrolling on window resize
    if (typeof initializeVideoScrolling === 'function') {
        initializeVideoScrolling();
    }
});

// Function to initialize the horizontal video scrolling
function initializeHorizontalVideoScroll() {
    const videoRows = document.querySelectorAll('.video-row');
    
    videoRows.forEach(row => {
        // Clone videos for seamless infinite scrolling
        const originalItems = Array.from(row.children);
        
        // Create enough clones to ensure no gaps
        // We need at least 2 complete sets to ensure continuous flow
        for (let i = 0; i < 2; i++) {
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                row.appendChild(clone);
            });
        }
        
        // Use Intersection Observer for better performance
        const videos = row.querySelectorAll('video');
        const options = {
            root: null,
            rootMargin: '100px',  // Increased margin to start loading earlier
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                
                if (entry.isIntersecting) {
                    // Only play videos that are visible
                    if (video.paused) {
                        // Use setTimeout to stagger video playback and prevent lag
                        setTimeout(() => {
                            // Lower video quality for better performance
                            video.setAttribute('playsinline', '');
                            video.muted = true;
                            
                            // Attempt to play with error handling
                            const playPromise = video.play();
                            if (playPromise !== undefined) {
                                playPromise.catch(error => {
                                    console.log('Auto-play prevented:', error);
                                    // Add a play button that users can click if autoplay fails
                                    addPlayButton(video);
                                });
                            }
                        }, Math.random() * 300); // Random delay between 0-300ms
                    }
                } else if (!video.paused) {
                    // Pause videos that are not visible to save resources
                    video.pause();
                }
            });
        }, options);
        
        videos.forEach(video => {
            observer.observe(video);
            
            // Preload videos for smoother playback using 'metadata' instead of 'auto' for performance
            video.preload = 'metadata';
            
            // Handle errors
            video.addEventListener('error', function() {
                handleVideoError(this);
            });
            
            // Add loaded data event
            video.addEventListener('loadeddata', function() {
                // Remove any error states once video loads
                const parent = this.parentElement;
                if (parent.classList.contains('video-error')) {
                    parent.classList.remove('video-error');
                }
            });
        });
    });
}

// Helper function to handle video errors
function handleVideoError(videoElement) {
    const parent = videoElement.parentElement;
    parent.style.backgroundColor = "#222";
    videoElement.style.display = 'none';
    
    // Add error class
    parent.classList.add('video-error');
    
    // Create error message
    const errorMsg = document.createElement('div');
    errorMsg.className = 'video-error-message';
    errorMsg.textContent = 'Video could not be loaded';
    errorMsg.style.position = 'absolute';
    errorMsg.style.top = '50%';
    errorMsg.style.left = '50%';
    errorMsg.style.transform = 'translate(-50%, -50%)';
    errorMsg.style.color = '#888';
    errorMsg.style.fontSize = '14px';
    
    // Only add if not already added
    if (!parent.querySelector('.video-error-message')) {
        parent.appendChild(errorMsg);
    }
}

// Helper function to add play button when autoplay fails
function addPlayButton(videoElement) {
    const parent = videoElement.parentElement;
    
    // Only add if not already added
    if (!parent.querySelector('.manual-play-button')) {
        const playButton = document.createElement('button');
        playButton.className = 'manual-play-button';
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        playButton.style.position = 'absolute';
        playButton.style.top = '50%';
        playButton.style.left = '50%';
        playButton.style.transform = 'translate(-50%, -50%)';
        playButton.style.background = 'rgba(227, 59, 59, 0.8)';
        playButton.style.color = 'white';
        playButton.style.border = 'none';
        playButton.style.borderRadius = '50%';
        playButton.style.width = '60px';
        playButton.style.height = '60px';
        playButton.style.cursor = 'pointer';
        playButton.style.zIndex = '5';
        
        playButton.addEventListener('click', () => {
            videoElement.play()
                .then(() => {
                    playButton.style.display = 'none';
                })
                .catch(error => {
                    console.error('Play failed:', error);
                });
        });
        
        parent.appendChild(playButton);
    }
}

// Function to adjust video rows based on screen size
function adjustVideoRows() {
    const videoRows = document.querySelectorAll('.video-row');
    videoRows.forEach(row => {
        // Reset animation
        row.style.animation = 'none';
        row.offsetHeight; // Trigger reflow
        
        // Restart animation with optimized speed
        if (row.classList.contains('scroll-right')) {
            row.style.animation = 'scrollRight 60s linear infinite';
        } else if (row.classList.contains('scroll-left')) {
            row.style.animation = 'scrollLeft 60s linear infinite';
        }
    });
}

// Initialize the news carousel functionality
function initializeNewsCarousel() {
    const slides = document.querySelectorAll('.news-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (!slides.length || !dots.length || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Show the current slide and update dots
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Deactivate all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and activate corresponding dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }
    
    // Previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto advance slides every 7 seconds
    let slideInterval = setInterval(nextSlide, 7000);
    
    // Pause auto-advance on hover
    const carousel = document.querySelector('.news-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 7000);
        });
    }
}

// Initialize the video player modal
function initializeVideoPlayerModal() {
    const modal = document.getElementById('modal');
    const closeBtn = modal.querySelector('.close-modal');
    const videoElement = document.getElementById('modal-video');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    // Add click listeners to all video items
    document.querySelectorAll('.video-item').forEach(item => {
        item.addEventListener('click', function() {
            // Get the video source from the item
            const videoSource = this.querySelector('video source')?.src || 
                               (this.querySelector('img')?.src || '').replace('.gif', '.mp4');
            const videoTitle = this.querySelector('video')?.getAttribute('data-title') || 
                              'Astro Nexus Project';
            const videoDesc = this.querySelector('video')?.getAttribute('data-desc') || 
                             'Explore the stunning visual content from our digital art collection.';
            
            // Set the modal content
            videoElement.src = videoSource;
            modalTitle.textContent = videoTitle;
            modalDescription.textContent = videoDesc;
            
            // Open the modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Load and play the video
            videoElement.load();
            videoElement.play();
        });
    });

    // Close button event
    closeBtn.addEventListener('click', () => {
        closeVideoModal();
    });

    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeVideoModal();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeVideoModal();
        }
    });
}

window.openVideoModal = function(title, src, description = '') {
    const modal = document.getElementById('modal');
    const videoElement = document.getElementById('modal-video');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    // Set video source
    videoElement.src = src;
    videoElement.load();
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    
    // Play the video
    videoElement.play();
};

window.closeVideoModal = function() {
    const modal = document.getElementById('modal');
    const videoElement = document.getElementById('modal-video');
    
    // Pause the video
    videoElement.pause();
    
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
};

// Initialize the news horizontal scroller
function initializeNewsScroller() {
    const scroller = document.getElementById('newsScroller');
    const scrollLeftBtn = document.querySelector('.scroll-btn.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-btn.scroll-right');
    
    if (!scroller) return;
    
    // Update scroll buttons functionality
    if (scrollLeftBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            scroller.scrollBy({
                left: -500,
                behavior: 'smooth'
            });
        });
    }
    
    if (scrollRightBtn) {
        scrollRightBtn.addEventListener('click', () => {
            scroller.scrollBy({
                left: 500,
                behavior: 'smooth'
            });
        });
    }
    
    // Add enhanced card interactions
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        // Simplified interaction - just handle basic hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px)';
        });
        
        // Reset on mouseleave
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Add scroll event for the Back to Top button
    const scrollText = document.querySelector('.scroll-text');
    if (scrollText) {
        scrollText.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize manga section interactions
function initializeMangaSection() {
    // Add click handlers for manga items
    document.querySelectorAll('.manga-item').forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.manga-item-info h4').textContent;
            const imgSrc = this.querySelector('.manga-item-cover img').src;
            alert(`You selected ${title}. In a full implementation, this would open the manga reader.`);
        });
    });
    
    // Add click handler for the featured manga read button
    const readBtn = document.querySelector('.featured-manga .read-btn');
    if (readBtn) {
        readBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const title = document.querySelector('.manga-details h3').textContent;
            alert(`Starting to read ${title}. In a full implementation, this would open the manga reader.`);
        });
    }
    
    // Add click handlers for pre-order buttons
    document.querySelectorAll('.preorder-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const title = this.closest('.release-item').querySelector('h4').textContent;
            this.innerHTML = 'PRE-ORDERED';
            this.style.background = 'var(--primary-color)';
            this.style.color = 'white';
            this.style.borderColor = 'var(--primary-color)';
            
            // Show confirmation
            alert(`You've pre-ordered ${title}! Thank you for your purchase.`);
            
            // Disable button
            this.disabled = true;
        });
    });
    
    // Add click handler for explore full library button
    const exploreBtn = document.querySelector('.manga-explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Exploring full manga library. In a full implementation, this would navigate to the complete manga collection page.');
        });
    }
    
    // Add hover effects for manga covers
    document.querySelectorAll('.manga-item-cover').forEach(cover => {
        cover.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.1)';
        });
        
        cover.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = '';
        });
    });
    
    // Add pulsing effect to the new badge
    const newBadge = document.querySelector('.new-badge');
    if (newBadge) {
        setInterval(() => {
            newBadge.style.transform = 'scale(1.1)';
            setTimeout(() => {
                newBadge.style.transform = 'scale(1)';
            }, 500);
        }, 2000);
    }
} 