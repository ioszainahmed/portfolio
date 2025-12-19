# Portfolio Project Context

## Project Overview
iOS-themed portfolio website for Zain Ahmed. Mimics iPhone interface on desktop, native mobile UI on mobile devices.

## File Structure
- `index.html` - Main HTML structure (105 lines)
- `styles.css` - All styling, mobile-first responsive (1364 lines)
- `script.js` - Interactive functionality, swipe gestures (579 lines)
- `assets/` - Images (app icons, wallpaper, contact icons)

## Key Features Implemented

### Mobile-First Responsive Design
- **Breakpoints**: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)
- **Mobile**: Phone frame removed, full viewport, native UI patterns
- **Desktop**: iPhone mockup with frame, side-by-side experience panel

### Widget System
- **About Widget**: Name, title, tagline with responsive font scaling
- **Notes Widget**: iOS Notes-style with yellow header, note list
- **Layout**: Horizontal 2-column grid on all devices, scales with viewport
- **Font Sizes**: Use `clamp()` for responsive scaling (e.g., `clamp(18px, 5vw, 22px)`)

### App Grid
- **Experience Row**: Marriott, myQ, Community, WanaSell (opens full-screen experience)
- **Connect Row**: LinkedIn, GitHub, Notes, App Store (opens modals)
- **Tools Row**: Swift, SwiftUI, Xcode, Dev Stack (opens modals)
- **Mobile**: 3-column grid, 70px icons, 44px+ touch targets
- **Desktop**: 4-column grid, 60px icons

### Experience Content Panel
- **Desktop**: Slides in from right (500px width), phone shifts left
- **Mobile**: Full-screen overlay, slides up from bottom, swipe-down to dismiss
- **Content**: Project details, role, dates, bullet points, tech tags, dismiss button

### Modals
- **Desktop**: Centered modal (320px max-width)
- **Mobile**: Full-screen bottom sheet, swipe-down to dismiss
- **Content**: Project descriptions, tech tags, external links

### Mobile Interactions
- **Swipe Gestures**: Swipe down to dismiss experience content and modals
- **Body Scroll Lock**: Prevents background scroll when overlays open
- **Touch Feedback**: Visual feedback on all interactive elements
- **Safe Area Support**: iOS safe area insets for notched devices

## CSS Architecture

### Key Classes
- `.phone-frame` - iPhone mockup (hidden on mobile)
- `.screen` - Main content container (grid layout)
- `.widgets` - 2-column grid, responsive scaling
- `.apps` - App icon grid (3-col mobile, 4-col desktop)
- `.experience-content` - Project detail panel/overlay
- `.modal-overlay` - Modal container

### Responsive Strategy
- Uses `clamp()` extensively for fluid typography and spacing
- Viewport units (vw) for scaling
- `min-height: 100vh` with `-webkit-fill-available` for iOS
- `overflow-y: auto` for scrollable content
- All rows use `auto` sizing to allow natural growth

## JavaScript Architecture

### Core Functions
- `showExperienceContent(projectData)` - Opens experience panel with animation
- `hideExperienceContent()` - Closes experience panel
- `createModal(projectData)` - Creates and shows modal
- `updateTime()` - Updates status bar time display

### Mobile Enhancements
- `isMobile()` - Detects mobile devices
- `setupSwipeToDismiss()` - Adds swipe gesture handlers
- `preventBodyScroll()` - Locks/unlocks body scroll
- Touch event handlers for visual feedback

### Project Data
- `projects` object contains all project information
- Experience projects have: title, role, dateRange, description, tech, icon
- Other projects have: title, description, tech, link

## Recent Changes

### Mobile Widget Scaling
- Widgets remain horizontal (2-column) on mobile
- All dimensions scale using `clamp()` and viewport units
- Font sizes increased for better readability:
  - About h1: `18px-22px` (was 14px-18px)
  - About subtitle: `11px-13px` (was 9px-11px)
  - Notes h2: `13px-15px` (was 11px-12.6px)
  - Note titles: `12px-14px` (was 10px-12px)

### Content Flow
- Screen uses `grid-template-rows: auto auto auto auto` (all auto)
- Widgets can grow vertically and push content down
- Screen has `height: auto` with `min-height: 100vh`
- Overflow scrolling enabled for long content

## Design System

### Colors
- `--text`: `rgba(255,255,255,0.95)`
- `--muted`: `rgba(255,255,255,0.75)`
- `--accent`: `#007aff` (iOS blue)

### Typography
- Font: `-apple-system, BlinkMacSystemFont, 'SF Pro Display'`
- Responsive scaling via `clamp()` throughout

### Animations
- Phone fade-in on load
- Staggered line animations in experience content
- Smooth transitions (0.3s-0.4s cubic-bezier)
- Mobile: Reduced animation complexity for performance

## Testing Notes
- Test on real iOS/Android devices
- Verify swipe gestures work smoothly
- Check body scroll lock/unlock
- Test orientation changes
- Verify touch targets are 44px+ minimum
- Test on iPhone SE (smallest) to iPhone Pro Max (largest)

## Known Patterns
- Experience row icons → `showExperienceContent()`
- Other row icons → `createModal()`
- LinkedIn/GitHub → Direct links (no modal)
- Contact dock → Direct tel:/mailto:/sms: links
- Time updates every minute
- Escape key closes modals

## Future Considerations
- Image optimization (WebP, lazy loading)
- Service worker for offline support
- Enhanced accessibility (ARIA labels)
- Performance monitoring



