// Project data
const projects = {
  'Marriott': {
    title: 'Marriott Bonvoy',
    description: 'A premium hotel booking and loyalty app experience. Built with modern iOS design principles and seamless user experience.',
    tech: ['Swift', 'SwiftUI', 'iOS'],
    link: '#'
  },
  'myQ': {
    title: 'myQ Smart Garage',
    description: 'Smart home integration for garage door control. Features real-time status monitoring and remote access capabilities.',
    tech: ['Swift', 'IoT', 'HomeKit'],
    link: '#'
  },
  'Community': {
    title: 'Community App',
    description: 'A social platform connecting local communities. Built with focus on engagement and meaningful connections.',
    tech: ['Swift', 'Firebase', 'UIKit'],
    link: '#'
  },
  'WanaSell': {
    title: 'WanaSell',
    description: 'Marketplace app for buying and selling locally. Features secure transactions and user verification.',
    tech: ['Swift', 'Stripe', 'MapKit'],
    link: '#'
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
    description: 'Personal notes, thoughts, and reminders. Keeping track of ideas and important information.',
    tech: ['Productivity', 'Organization', 'Notes'],
    link: '#'
  },
  'App Store': {
    title: 'App Store',
    description: 'Check out my published iOS applications on the App Store. Explore apps I\'ve developed and released to users worldwide.',
    tech: ['iOS', 'App Store', 'Published Apps'],
    link: '#'
  },
  'Swift': {
    title: 'Swift',
    description: 'Building iOS applications with Swift. Expertise in modern Swift features, SwiftUI, and UIKit development.',
    tech: ['Swift', 'iOS', 'SwiftUI'],
    link: '#'
  },
  'SwiftUI': {
    title: 'SwiftUI',
    description: 'Building modern, declarative user interfaces with SwiftUI. Creating beautiful and responsive iOS apps with Apple\'s latest UI framework.',
    tech: ['SwiftUI', 'iOS', 'UI/UX'],
    link: '#'
  },
  'Xcode': {
    title: 'Xcode',
    description: 'Professional iOS development using Xcode. Creating, debugging, and optimizing apps with Apple\'s integrated development environment.',
    tech: ['Xcode', 'iOS', 'Development'],
    link: '#'
  },
  'Dev Stack': {
    title: 'Dev Stack',
    description: 'My development technology stack and tools. The technologies, frameworks, and tools I use to build iOS applications.',
    tech: ['Swift', 'SwiftUI', 'Xcode', 'iOS'],
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
  if (timeElement) {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const timeString = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
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

// Add click handlers to app icons
document.querySelectorAll('.apps .icon').forEach(icon => {
  const label = icon.querySelector('.label');
  if (label) {
    const projectName = label.textContent.trim();
    // Skip LinkedIn and GitHub - let them redirect directly
    if (projects[projectName] && projectName !== 'LinkedIn' && projectName !== 'GitHub') {
      // Prevent default link behavior and show modal instead
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

// Enhanced tap animation for tiles
document.querySelectorAll('.tile').forEach(t => {
  t.addEventListener('click', (e) => {
    // Don't trigger if clicking on a link
    if (t.closest('a')) {
      return;
    }
    t.style.transform = 'scale(0.96)';
    setTimeout(() => { 
      t.style.transform = ''; 
    }, 120);
  });
});
