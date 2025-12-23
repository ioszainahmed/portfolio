// Project data
const projects = {
  'Marriott': {
    title: 'Marriott Bonvoy',
    role: 'Software Engineer',
    dateRange: 'January 2023 – Present',
    description: '• Marriott Bonvoy App (hyperlink: https://apps.apple.com/us/app/marriott-bonvoy-book-hotels/id455004730)\n• Spearhead the redesign of legacy UIKit and Storyboard views into modern SwiftUI-based flows using Figma.\n• Migrate eAPI calls to GraphQL using Apollo Studio, enhancing performance and maintainability.\n• Enhance accessibility by customizing ADA-compliant experiences across key user flows and app interfaces.\n• Led the deprecation of legacy Objective-C modules in favor of SwiftUI-first architecture for modern development.\n• Collaborate with product, design and QA teams to define best practices for SwiftUI implementation and testing.\n• Deliver regular cross-team presentations and demos to showcase new features and technical advancements.',
    tech: ['Swift', 'SwiftUI', 'GraphQL', 'Apollo Studio', 'Figma'],
    link: '#',
    icon: 'assets/bonvoy.png'
  },
  'myQ': {
    title: 'myQ Smart Garage',
    role: 'Software Engineer II',
    dateRange: 'November 2021 – December 2022',
    description: '• myQ Garage and Access App & myQ Community App (hyperlink: https://apps.apple.com/us/app/myq-garage-access-control/id456282559)\n• Configured communication of the iOS App with IOT devices such as garage door openers, cameras and intercom.\n• Converted all views and elements to Programmatic UI and SwiftUI to remove dependency on Storyboards.\n• Tested and deployed a generic iOS package via Carthage to log analytics for multiple iOS applications.\n• Documented, unit tested and contributed to the automation of existing code for usability and reliability.\n• Worked in a cross-functional Scrum team to deliver features and services in a fast-paced Agile environment.',
    tech: ['Swift', 'SwiftUI', 'IoT', 'Carthage', 'Agile'],
    link: '#',
    icon: 'assets/myQ.png'
  },
  'Community': {
    title: 'myQ Community',
    role: 'Software Engineer II',
    dateRange: 'November 2021 – December 2022',
    description: '• myQ Garage and Access App & myQ Community App (hyperlink: https://apps.apple.com/us/app/myq-community/id1516518499)\n• Configured communication of the iOS App with IOT devices such as garage door openers, cameras and intercom.\n• Converted all views and elements to Programmatic UI and SwiftUI to remove dependency on Storyboards.\n• Tested and deployed a generic iOS package via Carthage to log analytics for multiple iOS applications.\n• Documented, unit tested and contributed to the automation of existing code for usability and reliability.\n• Worked in a cross-functional Scrum team to deliver features and services in a fast-paced Agile environment.',
    tech: ['Swift', 'SwiftUI', 'IoT', 'Carthage', 'Agile'],
    link: '#',
    icon: 'assets/community.png'
  },
  'WanaSell': {
    title: 'WanaSell',
    role: 'iOS Developer',
    dateRange: 'June 2019 – September 2021',
    description: '• WanaSell App (hyperlink: https://apptopia.com/ios/app/1521338655/about)\n• Designed and built adaptive User Interface on Storyboards and Xibs using Auto-layout.\n• Implemented an object detection feature using AVKit and Apple\'s ResNet50 data model.\n• Used various instruments tools to identify memory leaks and improve the performance of the app.\n• Participated in the full iOS mobile application life cycle from conception to release to the App Store',
    tech: ['Swift', 'UIKit', 'AVKit', 'ResNet50', 'Auto Layout'],
    link: '#',
    icon: 'assets/wanasell.png'
  },
  'LinkedIn': {
    title: 'LinkedIn Profile',
    description: 'Connect with me on LinkedIn to see my professional experience, projects, and network with me in the tech industry.',
    tech: ['Networking', 'Professional', 'Career'],
    link: 'https://www.linkedin.com/in/zainahmedios/'
  },
  'GitHub': {
    title: 'GitHub Profile',
    description: 'Check out my code repositories, open source contributions, and side projects on GitHub.',
    tech: ['Code', 'Open Source', 'Development'],
    link: 'https://github.com/ioszainahmed'
  },
  'Notes': {
    title: 'Notes',
    description: 'A space for in-progress thoughts, technical notes, and ideas I\'m actively refining. This section is evolving and will be published soon.',
    tech: ['Drafts', 'Ideas', 'In Progress'],
    link: '#'
  },
  'App Store': {
    title: 'App Store',
    description: 'A curated list of iOS applications I\'ve built and shipped. App links and release details will be added as they go live.',
    tech: ['Shipping Soon', 'Production', 'iOS'],
    link: '#'
  },
  'Swift': {
    title: 'Swift',
    description: 'Building iOS applications with Swift. Expertise in modern Swift features, SwiftUI, and UIKit development.',
    tech: ['async/await', 'actors', 'tasks', 'generics', 'protocols', 'extensions', 'ARC', 'error-handling'],
    link: '#'
  },
  'SwiftUI': {
    title: 'SwiftUI',
    description: 'Building modern, declarative user interfaces with SwiftUI. Creating beautiful and responsive iOS apps with Apple\'s latest UI framework.',
    tech: ['views', 'modifiers', 'state', 'bindings', 'environment', 'navigation', 'stacks', 'lists', 'animations', 'accessibility'],
    link: '#'
  },
  'Xcode': {
    title: 'Xcode',
    description: 'Professional iOS development using Xcode. Creating, debugging, and optimizing apps with Apple\'s integrated development environment.',
    tech: ['debugging', 'instruments', 'profiling', 'memory-leaks', 'breakpoints', 'simulators', 'test-plans', 'coverage'],
    link: '#'
  },
  'Dev Stack': {
    title: 'Dev Stack',
    description: 'My development technology stack and tools. The technologies, frameworks, and tools I use to build iOS applications.',
    tech: ['GraphQL', 'Apollo', 'REST', 'Git', 'Python', 'automation', 'Figma', 'CI', 'analytics', 'Cursor', 'Claude'],
    link: '#'
  },
  'News': {
    title: 'Tech News',
    description: 'Curated tech news and updates. Staying informed about the latest in iOS and technology.',
    tech: ['News', 'Tech', 'Updates'],
    link: '#'
  }
};

// Update time display
function updateTime() {
  const timeElement = document.getElementById('time');
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const timeString = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  if (timeElement) {
    timeElement.textContent = timeString;
  }
}

// Update time immediately and then every minute
updateTime();
setInterval(updateTime, 60000);

// Modal functionality
function createModal(projectData) {
  // Remove existing modal if any
  const existingModal = document.querySelector('.modal-overlay');
  if (existingModal) {
    existingModal.remove();
  }

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  
  const modal = document.createElement('div');
  modal.className = 'modal';
  
  modal.innerHTML = `
    <div class="modal-header">
      <h2 class="modal-title">${projectData.title}</h2>
      <button class="modal-close" aria-label="Close">✕</button>
    </div>
    <div class="modal-content">
      <p>${projectData.description}</p>
      <div class="modal-tech">
        ${projectData.tech.map(tech => `<span>${tech}</span>`).join('')}
      </div>
      ${projectData.link !== '#' ? `<a href="${projectData.link}" target="_blank" class="modal-link">Learn More →</a>` : ''}
    </div>
  `;
  
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  
  // Trigger animation
  setTimeout(() => {
    overlay.classList.add('active');
  }, 10);
  
  // Close handlers
  const closeModal = () => {
    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.remove();
    }, 300);
  };
  
  overlay.querySelector('.modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });
  
  // Close on Escape key
  const escapeHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escapeHandler);
    }
  };
  document.addEventListener('keydown', escapeHandler);
}

// Show experience content
function showExperienceContent(projectData) {
  const mainPhone = document.querySelector('.main-phone');
  const phonesContainer = document.querySelector('.phones-container');
  const experienceContent = document.querySelector('.experience-content');
  const experienceContentInner = document.querySelector('.experience-content-inner');
  
  // Format description with bullet points and hyperlinks
  const formatDescription = (description) => {
    if (!description) return '';
    
    return description.split('\n').map(line => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('•')) {
        // Check for hyperlink pattern
        const hyperlinkMatch = trimmedLine.match(/\(hyperlink:\s*(https?:\/\/[^\)]+)\)/);
        if (hyperlinkMatch) {
          const url = hyperlinkMatch[1];
          const textWithoutHyperlink = trimmedLine.replace(/\s*\(hyperlink:\s*https?:\/\/[^\)]+\)/, '').trim();
          const bulletText = textWithoutHyperlink.replace('•', '').trim();
          return `<div class="exp-bullet exp-line"><a href="${url}" target="_blank" rel="noopener noreferrer" class="exp-link">${bulletText}</a></div>`;
        }
        const bulletText = trimmedLine.replace('•', '').trim();
        return `<div class="exp-bullet exp-line">${bulletText}</div>`;
      }
      return trimmedLine ? `<p class="exp-line">${trimmedLine}</p>` : '';
    }).join('');
  };
  
  // Update content
  experienceContentInner.innerHTML = `
    <button class="exp-close-button" type="button" aria-label="Close">×</button>
    <div class="exp-header">
      <div class="exp-icon">
        <img src="${projectData.icon || 'assets/bonvoy.png'}" alt="${projectData.title}">
      </div>
      <div class="exp-title-section">
        <h1 class="exp-title exp-line">${projectData.title}</h1>
        <div class="exp-role exp-line">${projectData.role || 'Developer'}</div>
        <div class="exp-date exp-line">${projectData.dateRange || ''}</div>
      </div>
    </div>
    <div class="exp-body">
      ${formatDescription(projectData.description)}
      <div class="exp-tech">
        ${projectData.tech.map(tech => `<span class="exp-line">${tech}</span>`).join('')}
      </div>
    </div>
    <button class="exp-dismiss-button exp-line" aria-label="Dismiss">dismiss</button>
  `;
  
  // Move phone to the left and show content instantly
  phonesContainer.classList.add('show-experience');
  experienceContent.classList.add('visible');
  
  // Animate each line with staggered delays
  const animateLines = () => {
    const lines = experienceContentInner.querySelectorAll('.exp-line');
    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('animate');
      }, 100 + (index * 80)); // Stagger by 80ms per line
    });
  };
  
  // Start animations after a short delay
  setTimeout(animateLines, 50);
  
  // Add dismiss button handler
  const dismissButton = experienceContentInner.querySelector('.exp-dismiss-button');
  if (dismissButton) {
    dismissButton.addEventListener('click', hideExperienceContent);
  }

  // Add close (X) handler
  const closeButton = experienceContentInner.querySelector('.exp-close-button');
  if (closeButton) {
    closeButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      hideExperienceContent();
    });
  }
}

function hideExperienceContent() {
  const mainPhone = document.querySelector('.main-phone');
  const phonesContainer = document.querySelector('.phones-container');
  const experienceContent = document.querySelector('.experience-content');
  const experienceContentInner = document.querySelector('.experience-content-inner');
  
  // Fade out all lines (reverse order for smooth exit)
  const lines = experienceContentInner.querySelectorAll('.exp-line');
  const lineArray = Array.from(lines).reverse();
  lineArray.forEach((line, index) => {
    setTimeout(() => {
      line.classList.remove('animate');
    }, index * 30); // Quick reverse stagger
  });
  
  // Wait for fade-out transition, then move phone back and hide content
  setTimeout(() => {
    phonesContainer.classList.remove('show-experience');
    experienceContent.classList.remove('visible');
  }, 500); // Match CSS transition duration
}

// Add click handlers to app icons
document.querySelectorAll('.apps .icon').forEach(icon => {
  const label = icon.querySelector('.label');
  if (label) {
    const projectName = label.textContent.trim();
    // Skip LinkedIn and GitHub - let them redirect directly
    const isExperience = icon.closest('.app-row')?.querySelector('.row-title')?.textContent === 'Experience';
    
    if (isExperience && projects[projectName]) {
      // Experience row - show content on tap
      icon.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showExperienceContent(projects[projectName]);
      });
    } else if (projects[projectName] && projectName !== 'LinkedIn' && projectName !== 'GitHub') {
      // Other rows - show modal
      const link = icon.querySelector('a');
      if (link) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          createModal(projects[projectName]);
        });
      } else {
        icon.addEventListener('click', (e) => {
          e.preventDefault();
          createModal(projects[projectName]);
        });
      }
    }
  }
});

// Close experience content when clicking outside
document.addEventListener('click', (e) => {
  const experienceContent = document.querySelector('.experience-content');
  const phonesContainer = document.querySelector('.phones-container');
  
  if (phonesContainer.classList.contains('show-experience')) {
    // Check if click is outside both phone and content
    if (!e.target.closest('.phone-frame') && !e.target.closest('.experience-content')) {
      hideExperienceContent();
    }
  }
});

// Enhanced tap animation for tiles
document.querySelectorAll('.tile').forEach(t => {
  t.addEventListener('click', (e) => {
    // Don't trigger if clicking on a link
    if (t.closest('a')) {
      return;
    }
    // Don't prevent event bubbling - let parent handlers work
    t.style.transform = 'scale(0.96)';
    setTimeout(() => { 
      t.style.transform = ''; 
    }, 120);
  });
});

// ============================================
// MOBILE OPTIMIZATIONS & SWIPE GESTURES
// ============================================

// Detect if device is mobile
const isMobile = () => {
  return window.innerWidth <= 767 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Prevent body scroll when experience content or modal is open on mobile
function preventBodyScroll(prevent) {
  if (!isMobile()) return;
  
  if (prevent) {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  } else {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }
}

// Swipe gesture handler for experience content
function setupSwipeToDismiss(element, dismissCallback) {
  let touchStartY = 0;
  let touchStartX = 0;
  let touchEndY = 0;
  let touchEndX = 0;
  let isDragging = false;
  let currentTranslateY = 0;

  const handleTouchStart = (e) => {
    if (!isMobile()) return;
    
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
    isDragging = true;
    element.style.transition = 'none';
  };

  const handleTouchMove = (e) => {
    if (!isMobile() || !isDragging) return;

    touchEndY = e.touches[0].clientY;
    touchEndX = e.touches[0].clientX;
    
    const deltaY = touchEndY - touchStartY;
    const deltaX = Math.abs(touchEndX - touchStartX);
    
    // Only allow vertical swipe (prevent horizontal scrolling interference)
    if (deltaY > 0 && deltaY > deltaX) {
      currentTranslateY = Math.max(0, deltaY);
      element.style.transform = `translateY(${currentTranslateY}px)`;
      
      // Add opacity fade as user drags down
      const opacity = 1 - (currentTranslateY / 300);
      element.style.opacity = Math.max(0.3, opacity);
    }
  };

  const handleTouchEnd = () => {
    if (!isMobile() || !isDragging) return;
    
    isDragging = false;
    element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease';
    
    const deltaY = touchEndY - touchStartY;
    const swipeThreshold = 100; // Minimum swipe distance to dismiss
    
    if (deltaY > swipeThreshold) {
      // Dismiss on swipe down
      dismissCallback();
    } else {
      // Snap back to original position
      currentTranslateY = 0;
      element.style.transform = 'translateY(0)';
      element.style.opacity = '1';
    }
  };

  // Add touch event listeners with passive option for better performance
  element.addEventListener('touchstart', handleTouchStart, { passive: true });
  element.addEventListener('touchmove', handleTouchMove, { passive: true });
  element.addEventListener('touchend', handleTouchEnd, { passive: true });
  element.addEventListener('touchcancel', handleTouchEnd, { passive: true });
}

// Swipe gesture handler for modals
function setupModalSwipeToDismiss(overlay, modal, dismissCallback) {
  if (!isMobile()) return;
  
  let touchStartY = 0;
  let touchEndY = 0;
  let isDragging = false;
  let currentTranslateY = 0;

  const handleTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
    isDragging = true;
    modal.style.transition = 'none';
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    touchEndY = e.touches[0].clientY;
    const deltaY = touchEndY - touchStartY;
    
    // Only allow downward swipe
    if (deltaY > 0) {
      currentTranslateY = deltaY;
      modal.style.transform = `translateY(${currentTranslateY}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    isDragging = false;
    modal.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    const deltaY = touchEndY - touchStartY;
    const swipeThreshold = 100;
    
    if (deltaY > swipeThreshold) {
      dismissCallback();
    } else {
      currentTranslateY = 0;
      modal.style.transform = 'translateY(0)';
    }
  };

  modal.addEventListener('touchstart', handleTouchStart, { passive: true });
  modal.addEventListener('touchmove', handleTouchMove, { passive: true });
  modal.addEventListener('touchend', handleTouchEnd, { passive: true });
  modal.addEventListener('touchcancel', handleTouchEnd, { passive: true });
}

// Wrap showExperienceContent to add mobile features
const originalShowExperienceContent = showExperienceContent;
showExperienceContent = function(projectData) {
  if (isMobile()) {
    preventBodyScroll(true);
  }
  
  originalShowExperienceContent(projectData);
  
  const experienceContent = document.querySelector('.experience-content');
  const experiencePanel = document.querySelector('.experience-content-inner');
  if (experienceContent && isMobile()) {
    // Reset panel transform/opacity (in case a swipe-dismiss was in progress)
    if (experiencePanel) {
      experiencePanel.style.transform = '';
      experiencePanel.style.opacity = '';
    }
    
    // Setup swipe to dismiss
    if (experiencePanel) {
      setupSwipeToDismiss(experiencePanel, hideExperienceContent);
    }
    
    // Add tap-to-dismiss functionality - dismiss when tapping on background or content area
    experienceContent.addEventListener('click', (e) => {
      // Dismiss unless clicking on interactive elements (links, buttons, tech tags)
      const isInteractive = e.target.closest('a, button, .exp-tech span');
      if (!isInteractive) {
        hideExperienceContent();
      }
    });
  }
};

// Wrap hideExperienceContent to restore body scroll
const originalHideExperienceContent = hideExperienceContent;
hideExperienceContent = function() {
  if (isMobile()) {
    preventBodyScroll(false);
  }
  originalHideExperienceContent();
};

// Wrap createModal to add mobile features
const originalCreateModal = createModal;
createModal = function(projectData) {
  originalCreateModal(projectData);
  
  const overlay = document.querySelector('.modal-overlay');
  const modal = overlay?.querySelector('.modal');
  
  if (overlay && isMobile()) {
    preventBodyScroll(true);
    
    if (modal) {
      // Reset transform
      modal.style.transform = '';
      
      const mobileCloseModal = () => {
        preventBodyScroll(false);
        overlay.classList.remove('active');
        setTimeout(() => {
          overlay.remove();
        }, 400);
      };
      
      // Setup swipe to dismiss
      setupModalSwipeToDismiss(overlay, modal, mobileCloseModal);
      
      // Add observer to detect when modal is removed/closed and restore scroll
      const observer = new MutationObserver(() => {
        if (!document.body.contains(overlay)) {
          preventBodyScroll(false);
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true });
    }
  }
};

// Optimize touch interactions for mobile
if (isMobile()) {
  // Use touchstart for faster response on mobile
  document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('touchstart', function(e) {
      // Add visual feedback
      this.style.opacity = '0.7';
      setTimeout(() => {
        this.style.opacity = '';
      }, 150);
    }, { passive: true });
  });
  
  // Improve tap targets for note items
  document.querySelectorAll('.note-item').forEach(item => {
    item.addEventListener('touchstart', function() {
      this.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
    }, { passive: true });
    
    item.addEventListener('touchend', function() {
      setTimeout(() => {
        this.style.backgroundColor = '';
      }, 150);
    }, { passive: true });
  });
}

// Handle orientation change
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Reset any transforms on resize
    const experiencePanel = document.querySelector('.experience-content-inner');
    if (experiencePanel) {
      experiencePanel.style.transform = '';
      experiencePanel.style.opacity = '';
    }
  }, 250);
}, { passive: true });
