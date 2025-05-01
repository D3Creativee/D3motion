// deepseek_javascript_20250426_867f21.js

// تهيئة Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  
  // وظائف عامة
  function handleFirebaseError(error) {
    console.error("Firebase Error:", error);
    alert("حدث خطأ: " + error.message);
  }
  
  async function addData(collection, data) {
    try {
      const docRef = await db.collection(collection).add(data);
      console.log("Document written with ID: ", docRef.id);
      return docRef;
    } catch (error) {
      handleFirebaseError(error);
      throw error;
    }
  }
  
  // التنقل المتنقل
  document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenu');
    const mainNav = document.getElementById('mainNav');
    
    mobileMenuBtn.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
  
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('#mainNav .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  
    // إضافة فعالية للروابط
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
  
    // تغيير لون الهيدر عند التمرير
    window.addEventListener('scroll', function() {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0.5rem 0';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.padding = '1rem 0';
      }
    });
  
    // تنشيط الروابط عند التمرير
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
  
    window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
          current = section.getAttribute('id');
        }
      });
  
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  
    // كاروسيل الهيرو
    const heroSlides = document.querySelectorAll('.hero-slide');
    const paginationDots = document.querySelectorAll('.pagination-dot');
    let currentSlide = 0;
  
    function showSlide(index) {
      heroSlides.forEach(slide => slide.classList.remove('active'));
      paginationDots.forEach(dot => dot.classList.remove('active'));
      
      heroSlides[index].classList.add('active');
      paginationDots[index].classList.add('active');
      currentSlide = index;
    }
  
    document.querySelector('.control-next').addEventListener('click', () => {
      let nextSlide = (currentSlide + 1) % heroSlides.length;
      showSlide(nextSlide);
    });
  
    document.querySelector('.control-prev').addEventListener('click', () => {
      let prevSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
      showSlide(prevSlide);
    });
  
    paginationDots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index));
    });
  
    // تبديل الخدمات
    const serviceNavItems = document.querySelectorAll('.nav-item');
    const serviceCards = document.querySelectorAll('.service-card');
    const navHighlight = document.querySelector('.nav-highlight');
  
    function updateNavHighlight(element) {
      const { left, width } = element.getBoundingClientRect();
      const containerLeft = document.querySelector('.nav-track').getBoundingClientRect().left;
      
      navHighlight.style.width = `${width}px`;
      navHighlight.style.left = `${left - containerLeft}px`;
    }
  
    serviceNavItems.forEach(item => {
      item.addEventListener('click', function() {
        const category = this.dataset.category;
        
        // تحديث العنصر النشط
        serviceNavItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        // تحديد موضع الخط
        updateNavHighlight(this);
        
        // تصفية الخدمات
        serviceCards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  
    // تهيئة الخط تحت العنصر النشط
    const activeNavItem = document.querySelector('.nav-item.active');
    if (activeNavItem) {
      updateNavHighlight(activeNavItem);
    }
  
    // إرسال نموذج الاتصال
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
          name: this.name.value,
          email: this.email.value,
          phone: this.phone.value,
          service: this.service.value,
          message: this.message.value,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        try {
          await addData('contacts', formData);
          alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.');
          this.reset();
        } catch (error) {
          handleFirebaseError(error);
        }
      });
    }
  
    // تحميل آراء العملاء
    async function loadTestimonials() {
      try {
        const snapshot = await db.collection('testimonials').orderBy('timestamp', 'desc').limit(5).get();
        const testimonialsContainer = document.querySelector('.testimonials-container');
        
        if (testimonialsContainer) {
          testimonialsContainer.innerHTML = '';
          
          snapshot.forEach(doc => {
            const testimonial = doc.data();
            const testimonialElement = document.createElement('div');
            testimonialElement.className = 'testimonial';
            testimonialElement.innerHTML = `
              <div class="testimonial-content">
                <p>"${testimonial.content}"</p>
              </div>
              <div class="testimonial-author">
                <h4>${testimonial.name}</h4>
                <span>${testimonial.position}</span>
              </div>
            `;
            testimonialsContainer.appendChild(testimonialElement);
          });
        }
      } catch (error) {
        handleFirebaseError(error);
      }
    }
  
    // تحميل الأسئلة الشائعة
    async function loadFAQs() {
      try {
        const snapshot = await db.collection('faqs').orderBy('order').get();
        const faqContainer = document.querySelector('.faq-container');
        
        if (faqContainer) {
          // إزالة الأسئلة الافتراضية
          const defaultItems = faqContainer.querySelectorAll('.faq-item[data-default]');
          defaultItems.forEach(item => item.remove());
          
          snapshot.forEach(doc => {
            const faq = doc.data();
            const faqItem = document.createElement('details');
            faqItem.className = 'faq-item';
            faqItem.innerHTML = `
              <summary class="faq-question">
                ${faq.question}
                <i class="fas fa-chevron-down"></i>
              </summary>
              <div class="faq-answer">
                <p>${faq.answer}</p>
              </div>
            `;
            faqContainer.appendChild(faqItem);
          });
        }
      } catch (error) {
        handleFirebaseError(error);
      }
    }
  
    // تحميل البيانات عند الحاجة
    if (document.querySelector('.testimonials-container')) {
      loadTestimonials();
    }
    
    if (document.querySelector('.faq-container')) {
      loadFAQs();
    }
  
    // تأثيرات للبطاقات عند التمرير
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.service-card, .step, .faq-item');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
  
    // تهيئة العناصر
    document.querySelectorAll('.service-card, .step, .faq-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.5s ease';
    });
  
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // تشغيل مرة أولى عند التحميل
  });
  
  // دورة تلقائية لكاروسيل الهيرو
  let heroInterval = setInterval(() => {
    const nextSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(nextSlide);
  }, 5000);
  
  // إيقاف الدورة عند التفاعل
  document.querySelector('.hero-carousel').addEventListener('mouseenter', () => {
    clearInterval(heroInterval);
  });
  
  document.querySelector('.hero-carousel').addEventListener('mouseleave', () => {
    heroInterval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % heroSlides.length;
      showSlide(nextSlide);
    }, 5000);
  });
  // حل مشكلة عدم عمل الأزرار
document.querySelectorAll('.service-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.stopPropagation(); // يمنع انتشار الحدث
        const target = this.getAttribute('href');
        if(target === '#contact') {
            // إضافة تأثير ناعم للتمرير
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// إصلاح مشكلة تغطية العناصر
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if(!e.target.closest('.service-link')) {
            // تنفيذ الأكشن الأساسي للبطاقة هنا
        }
    });
});
document.body.addEventListener('click', function(e) {
    if(e.target.closest('.service-link')) {
        e.preventDefault();
        const target = e.target.closest('.service-link').getAttribute('href');
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
        });
    }
});document.querySelectorAll('.service-link').forEach(link => {
    link.addEventListener('click', function(e) {
        console.log('تم النقر على الرابط');
        console.log('الحدث:', e);
        console.log('الهدف:', e.target);
        console.log('الرابط:', this.getAttribute('href'));
    });
});// حل كامل متكامل
function initServiceLinks() {
    const links = document.querySelectorAll('.service-link');
    
    links.forEach(link => {
        // إزالة جميع المعالجات السابقة
        link.removeEventListener('click', handleServiceLinkClick);
        link.addEventListener('click', handleServiceLinkClick);
    });
}

function handleServiceLinkClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    
    const targetId = this.getAttribute('href');
    if(targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // إضافة تأثير مرئي للتأكيد
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        }
    }
}

// تهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initServiceLinks);

// إعادة التهيئة عند تغيير المحتوى ديناميكياً
if(typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function(mutations) {
        initServiceLinks();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}// تهيئة الهيدر المتقدم
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.sticky-header');
    const mobileMenu = document.getElementById('mobileMenu');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');
    
    // تأثير التمرير
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // تحديث المؤشر حسب القسم النشط
        updateNavIndicator();
    });
    
    // القائمة المتنقلة
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    // إغلاق القائمة عند النقر على رابط
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });
    
    // تأثير المؤشر
    function updateNavIndicator() {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            const linkRect = activeLink.getBoundingClientRect();
            const navRect = mainNav.getBoundingClientRect();
            
            navIndicator.style.width = `${linkRect.width}px`;
            navIndicator.style.left = `${linkRect.left - navRect.left}px`;
        }
    }
    
    // تحديث المؤشر عند تحميل الصفحة
    updateNavIndicator();
    
    // تأثيرات الشعار
    const logo = document.querySelector('.animate-logo');
    logo.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // كشف العناصر النشطة
    const sections = document.querySelectorAll('section');
    
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        updateNavIndicator();
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
});
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    // عرض حالة التحميل
    submitBtn.disabled = true;
    btnText.textContent = 'جاري الإرسال...';
    submitBtn.style.opacity = '0.8';
    
    try {
        const formData = new FormData(form);
        
        // إرسال البيانات إلى Formspree
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // عرض رسالة النجاح
            btnText.textContent = 'تم الإرسال بنجاح!';
            submitBtn.style.backgroundColor = 'var(--success-color)';
            form.reset();
            
            // إعادة تعيين النموذج بعد 3 ثوان
            setTimeout(() => {
                btnText.textContent = originalText;
                submitBtn.style.backgroundColor = 'var(--primary-color)';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }, 3000);
        } else {
            throw new Error('فشل في إرسال النموذج');
        }
    } catch (error) {
        console.error('Error:', error);
        btnText.textContent = 'حدث خطأ، حاول مرة أخرى';
        submitBtn.style.backgroundColor = 'var(--danger-color)';
        
        setTimeout(() => {
            btnText.textContent = originalText;
            submitBtn.style.backgroundColor = 'var(--primary-color)';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }, 3000);
    }
});

// تحسين تجربة المستخدم للهاتف
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.querySelector('i').style.color = 'var(--accent-color)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.querySelector('i').style.color = 'var(--primary-color)';
    });
});