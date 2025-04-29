
document.addEventListener('DOMContentLoaded', function() {
    // شريط التحميل
    const loader = document.querySelector('.loader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
        }, 1000);
    });

    // زر العودة للأعلى
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // القائمة المتنقلة
    const mobileMenuBtn = document.getElementById('mobileMenu');
    const nav = document.getElementById('mainNav');
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // تغيير لون الهيدر عند التمرير
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // تأثير سلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
      
            }
        });
    });

    // السلايدر الرئيسي
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[n].classList.add('active');
        updateDots();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // إنشاء نقاط السلايدر
    const sliderDots = document.querySelector('.slider-dots');
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
        sliderDots.appendChild(dot);
    });

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // التمرير التلقائي للسلايدر
    let slideInterval = setInterval(nextSlide, 5000);

    function pauseSlider() {
        clearInterval(slideInterval);
    }

    function resumeSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // إيقاف التمرير التلقائي عند التفاعل
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', pauseSlider);
    heroSlider.addEventListener('mouseleave', resumeSlider);

    // عداد الإحصائيات
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }

    // تشغيل العداد عند التمرير للقسم
    const statsSection = document.querySelector('.stats-bar');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.unobserve(statsSection);
        }
    }, { threshold: 0.5 });

    observer.observe(statsSection);

    // تبويبات الخدمات
    const tabBtns = document.querySelectorAll('.tab-btn');
    const servicesGrid = document.querySelector('.services-grid');

    const servicesData = {
        design: [
            {
                icon: 'fas fa-paint-brush',
                title: 'تصميم الجرافيك',
                description: 'تصميم شعارات، هوية بصرية، بطاقات عمل، إعلانات، وغيرها من المواد التسويقية'
            },
            {
                icon: 'fas fa-palette',
                title: 'تصميم واجهات المستخدم',
                description: 'تصميم واجهات مستخدم جذابة وسهلة الاستخدام للمواقع والتطبيقات'
            },
            {
                icon: 'fas fa-icons',
                title: 'تصميم الرسوم المتحركة',
                description: 'إنشاء رسوم متحركة وإعلانات متحركة لجذب الانتباه'
            }
        ],
        content: [
            {
                icon: 'fas fa-pen-fancy',
                title: 'كتابة المحتوى',
                description: 'نصوص إبداعية، مقالات، محتوى مواقع إلكترونية، سيناريوهات، وصف منتجات'
            },
            {
                icon: 'fas fa-language',
                title: 'الترجمة',
                description: 'ترجمة احترافية بين العربية والإنجليزية والفرنسية بجودة عالية ودقة متناهية'
            },
            {
                icon: 'fas fa-search',
                title: 'تحسين محركات البحث',
                description: 'تحسين محتوى موقعك لظهور أفضل في نتائج محركات البحث'
            }
        ],
        development: [
            {
                icon: 'fas fa-laptop-code',
                title: 'تصميم مواقع',
                description: 'تصميم مواقع إلكترونية جذابة وسريعة الاستجابة تلبي احتياجات عملك'
            },
            {
                icon: 'fas fa-mobile-alt',
                title: 'برمجة تطبيقات',
                description: 'تطوير تطبيقات مخصصة بأساليب برمجية حديثة وآمنة'
            },
            {
                icon: 'fas fa-shopping-cart',
                title: 'متاجر إلكترونية',
                description: 'إنشاء متاجر إلكترونية متكاملة مع أنظمة الدفع والشحن'
            }
        ]
    };

    function renderServices(category) {
        servicesGrid.innerHTML = '';
        servicesData[category].forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card fade-in';
            serviceCard.innerHTML = `
                <i class="${service.icon}"></i>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            `;
            servicesGrid.appendChild(serviceCard);
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderServices(btn.dataset.tab);
        });
    });

    // عرض الخدمات الافتراضية عند التحميل
    renderServices('design');

    // تصفية أعمالنا
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.querySelector('.projects-grid');

    const projectsData = [
        {
            id: 1,
            title: 'تصميم شعار لشركة تقنية',
            category: 'design',
            image: 'images/project1.jpg'
        },
        {
            id: 2,
            title: 'موقع إلكتروني لمطعم',
            category: 'web',
            image: 'images/project2.jpg'
        },
        {
            id: 3,
            title: 'تطبيق جوال للياقة البدنية',
            category: 'app',
            image: 'images/project3.jpg'
        },
        {
            id: 4,
            title: 'فيديو دعائي لشركة',
            category: 'video',
            image: 'images/project4.jpg'
        },
        {
            id: 5,
            title: 'هوية بصرية لمتجر',
            category: 'design',
            image: 'images/project5.jpg'
        },
        {
            id: 6,
            title: 'نظام إدارة محتوى',
            category: 'web',
            image: 'images/project6.jpg'
        }
    ];

    function renderProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        const filteredProjects = filter === 'all' 
            ? projectsData 
            : projectsData.filter(project => project.category === filter);
        
        filteredProjects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item fade-in';
            projectItem.dataset.category = project.category;
            projectItem.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <h3>${project.title}</h3>
                    <p>فئة المشروع: ${project.category}</p>
                    <div class="project-links">
                        <a href="#"><i class="fas fa-link"></i></a>
                        <a href="#"><i class="fas fa-search"></i></a>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(projectItem);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.filter);
        });
    });

    // عرض المشاريع الافتراضية عند التحميل
    renderProjects();

    // تبديل الباقات السعرية
    const pricingToggle = document.getElementById('pricingToggle');
    const monthlyPrices = [444, 777, 999];
    const yearlyPrices = [200, 600, 800];

    const pricingData = [
        {
            title: "الباقة الأساسية",
            features: [
                "تصميم 5 شعارات",
                "3 صفحات موقع",
                "دعم فني محدود",
                "تحديثات شهرية"
            ],
            popular: false
        },
        {
            title: "الباقة المتوسطة",
            features: [
                "تصميم 10 شعارات",
                "10 صفحات موقع",
                "دعم فني متوسط",
                "تحديثات أسبوعية",
                "استضافة مجانية"
            ],
            popular: true
        },
        {
            title: "الباقة الممتازة",
            features: [
                "تصميم غير محدود",
                "موقع كامل",
                "دعم فني 24/7",
                "تحديثات يومية",
                "استضافة مجانية",
                "نطاق مجاني"
            ],
            popular: false
        }
    ];

    function renderPricing(isYearly) {
        const pricingGrid = document.querySelector('.pricing-grid');
        pricingGrid.innerHTML = '';
        
        const prices = isYearly ? yearlyPrices : monthlyPrices;
        
        pricingData.forEach((plan, index) => {
            const pricingCard = document.createElement('div');
            pricingCard.className = `pricing-card ${plan.popular ? 'popular' : ''} fade-in`;
            pricingCard.innerHTML = `
                <h3>${plan.title}</h3>
                <div class="price">$${prices[index]} <span>/${isYearly ? 'سنوياً' : 'شهرياً'}</span></div>
                <ul>
                    ${plan.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
                <button class="btn ${plan.popular ? 'btn-primary' : 'btn-outline'}">اختر الباقة</button>
            `;
            pricingGrid.appendChild(pricingCard);
        });
    }

    pricingToggle.addEventListener('change', function() {
        renderPricing(this.checked);
    });


    // تأثيرات الظهور عند التمرير
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // التحقق عند التحميل وعند التمرير
    window.addEventListener('load', checkFade);
    window.addEventListener('scroll', checkFade);
    
    // تأثيرات AOS
    function initAOS() {
        const aosElements = document.querySelectorAll('[data-aos]');
        
        function checkAOS() {
            aosElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('aos-animate');
                }
            });
        }
        
        window.addEventListener('load', checkAOS);
        window.addEventListener('scroll', checkAOS);
    }
    
    initAOS();
});



// أضف في JS
const firebaseConfig = {
    apiKey: "AIzaSy...",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-app",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "123...",
    appId: "1:123..."
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
      await db.collection('requests').add({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      alert('تم حفظ الطلب بنجاح!');
    } catch (error) {
      alert('حدث خطأ: ' + error.message);
    }
  });
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      answer.classList.toggle('active');
      button.querySelector('i').classList.toggle('fa-chevron-up');
    });
  });
   // هذا الكود لجعل الأيقونة تتغير عند الفتح/الإغلاق
   document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('toggle', function() {
        const icon = this.querySelector('i');
        if (this.open) {
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    });
});
// في ملف JavaScript
const mobileMenuBtn = document.getElementById('mobileMenu');
const mainNav = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    this.classList.toggle('fa-times');
    this.classList.toggle('fa-bars');
});

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('#mainNav a').forEach(link => {
    link.addEventListener('click', function() {
        mainNav.classList.remove('active');
        mobileMenuBtn.classList.remove('fa-times');
        mobileMenuBtn.classList.add('fa-bars');
    });
});
// في ملف JavaScript
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});// في ملف JavaScript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // إغلاق القائمة الجانبية إذا كانت مفتوحة
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});// في ملف JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarClose = document.querySelector('.sidebar-close');

    // فتح القائمة الجانبية
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // إغلاق القائمة الجانبية
    sidebarClose.addEventListener('click', function() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // إغلاق عند النقر خارج القائمة
    sidebarOverlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});