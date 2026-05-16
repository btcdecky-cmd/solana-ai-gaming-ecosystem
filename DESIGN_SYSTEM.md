# Solana AI Gaming Ecosystem - Design System

## Visual Identity: Luxury Black-and-Gold Glassmorphism

The Solana AI Gaming Ecosystem embodies a premium fintech-meets-GameFi aesthetic through a carefully curated luxury black-and-gold color palette, frosted glass morphism effects, and sophisticated typography. Every visual element reinforces the platform's positioning as an institutional-grade gaming and trading terminal.

---

## Color Palette

### Primary Colors
- **Deep Black**: `#0a0e27` - Primary background, deep immersion
- **Luxury Gold**: `#d4af37` - Primary accent, premium highlights
- **Soft Gold**: `#e8d5b7` - Secondary accent, subtle highlights
- **Charcoal**: `#1a1f3a` - Secondary background, card surfaces

### Semantic Colors
- **Success**: `#10b981` - Green for wins, positive outcomes
- **Warning**: `#f59e0b` - Amber for alerts, pending states
- **Danger**: `#ef4444` - Red for losses, critical alerts
- **Info**: `#3b82f6` - Blue for informational messages

### Glassmorphism Overlays
- **Glass Light**: `rgba(255, 255, 255, 0.08)` - Frosted glass base
- **Glass Medium**: `rgba(255, 255, 255, 0.12)` - Elevated glass elements
- **Glass Dark**: `rgba(0, 0, 0, 0.3)` - Dark glass overlays

---

## Typography

### Font Stack
- **Primary Font**: Inter (sans-serif) - Clean, modern, institutional
- **Display Font**: Space Mono (monospace) - Technical, futuristic elements
- **Fallback**: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto

### Type Scale
- **Display Large**: 48px, weight 700, letter-spacing -0.02em
- **Display Medium**: 36px, weight 700, letter-spacing -0.01em
- **Heading 1**: 28px, weight 600, letter-spacing -0.005em
- **Heading 2**: 24px, weight 600
- **Heading 3**: 20px, weight 600
- **Body Large**: 16px, weight 400, line-height 1.6
- **Body Regular**: 14px, weight 400, line-height 1.6
- **Body Small**: 12px, weight 400, line-height 1.5
- **Label**: 12px, weight 600, text-transform uppercase, letter-spacing 0.05em
- **Caption**: 11px, weight 400, opacity 0.7

---

## Spacing System

```
4px   - xs
8px   - sm
12px  - md
16px  - lg
24px  - xl
32px  - 2xl
48px  - 3xl
64px  - 4xl
```

---

## Glassmorphism Component Specifications

### Glass Card
- **Background**: `rgba(26, 31, 58, 0.6)` with `backdrop-filter: blur(10px)`
- **Border**: `1px solid rgba(212, 175, 55, 0.2)`
- **Border Radius**: 16px
- **Box Shadow**: `0 8px 32px rgba(0, 0, 0, 0.3)`
- **Padding**: 24px
- **Hover Effect**: Increase blur to 15px, border opacity to 0.4

### Glass Button
- **Background**: `rgba(212, 175, 55, 0.15)` with `backdrop-filter: blur(8px)`
- **Border**: `1px solid rgba(212, 175, 55, 0.3)`
- **Border Radius**: 12px
- **Padding**: 12px 24px
- **Transition**: All 200ms ease-out
- **Hover**: Background opacity increases to 0.25, border opacity to 0.5
- **Active**: Scale 0.97, background opacity 0.35

### Glass Input
- **Background**: `rgba(255, 255, 255, 0.05)` with `backdrop-filter: blur(8px)`
- **Border**: `1px solid rgba(212, 175, 55, 0.2)`
- **Border Radius**: 12px
- **Padding**: 12px 16px
- **Focus**: Border color becomes `#d4af37`, background opacity 0.1
- **Text Color**: `#e8d5b7`
- **Placeholder**: `rgba(232, 213, 183, 0.4)`

### Glass Badge
- **Background**: `rgba(212, 175, 55, 0.1)` with `backdrop-filter: blur(6px)`
- **Border**: `1px solid rgba(212, 175, 55, 0.3)`
- **Border Radius**: 8px
- **Padding**: 6px 12px
- **Font Size**: 12px
- **Font Weight**: 600
- **Color**: `#d4af37`

---

## Animation Guidelines

### Easing Functions
- **Ease Out**: `cubic-bezier(0.23, 1, 0.32, 1)` - Snappy, responsive
- **Ease In Out**: `cubic-bezier(0.77, 0, 0.175, 1)` - Smooth transitions
- **Ease In**: `cubic-bezier(0.42, 0, 1, 1)` - Deceleration

### Animation Timings
- **Micro Interactions** (button press, toggle): 100-160ms
- **Transitions** (dropdown, tooltip): 150-250ms
- **Modals & Drawers**: 200-400ms
- **Page Transitions**: 300-500ms
- **Rank-Up Notifications**: 600-800ms (celebratory)

### Key Animation Patterns

#### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
animation: fadeIn 300ms ease-out;
```

#### Slide Up
```css
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
animation: slideUp 300ms ease-out;
```

#### Scale In
```css
@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
animation: scaleIn 250ms ease-out;
```

#### Rank Up Celebration
```css
@keyframes rankUpPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
animation: rankUpPulse 600ms ease-out;
```

---

## Component Library

### Navigation
- **Header**: Fixed top navigation with logo, wallet status, notifications, user menu
- **Sidebar**: Collapsible left sidebar with main navigation items
- **Breadcrumb**: Navigation trail for nested pages
- **Tabs**: Horizontal tab navigation for feature sections

### Forms
- **Text Input**: Glass input with gold focus state
- **Number Input**: Specialized for USD1 amounts with currency symbol
- **Select Dropdown**: Glass select with scrollable options
- **Checkbox**: Custom checkbox with gold accent
- **Radio Button**: Custom radio with gold accent
- **Toggle Switch**: Animated toggle with gold accent
- **Textarea**: Multi-line glass input for descriptions

### Data Display
- **Table**: Glass table with alternating row backgrounds
- **Card Grid**: Responsive grid of glass cards
- **Leaderboard**: Ranked list with animated rank-up indicators
- **Chart**: Recharts with gold accent lines and tooltips
- **Progress Bar**: Animated progress with gold fill
- **Stat Box**: Key metric display with glass card styling

### Feedback
- **Toast Notification**: Slide-up notification with glass styling
- **Modal Dialog**: Centered modal with glass background and blur
- **Drawer**: Side drawer with glass styling
- **Tooltip**: Hover tooltip with gold text
- **Loading Spinner**: Animated spinner with gold accent
- **Skeleton Loader**: Pulsing skeleton for content loading

### Buttons
- **Primary Button**: Gold background, black text
- **Secondary Button**: Transparent with gold border
- **Tertiary Button**: Text-only button with gold text
- **Danger Button**: Red background for destructive actions
- **Loading Button**: Button with spinner and disabled state
- **Icon Button**: Compact button for icons

---

## Layout Patterns

### Dashboard Layout
- **Header**: Logo, wallet status, notifications, user menu
- **Sidebar**: Navigation with collapsible sections
- **Main Content**: Full-width content area with glass cards
- **Right Panel**: Optional secondary information panel

### Feature Page Layout
- **Hero Section**: Large heading with description
- **Content Grid**: 2-3 column grid of glass cards
- **Action Bar**: Sticky bottom bar with primary actions
- **Sidebar**: Optional filters or secondary navigation

### Modal Layout
- **Header**: Title and close button
- **Content**: Main modal content with glass styling
- **Footer**: Action buttons (Cancel, Confirm)

---

## Responsive Design

### Breakpoints
- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px - 1440px
- **Large Desktop**: 1441px+

### Mobile-First Approach
- Start with mobile layout
- Stack elements vertically
- Single column for cards and lists
- Full-width inputs and buttons

### Tablet Adjustments
- 2-column grid for cards
- Sidebar navigation
- Larger touch targets

### Desktop Optimizations
- 3-4 column grid for cards
- Persistent sidebar
- Optimized spacing and typography

---

## Accessibility

### Color Contrast
- Text on background: Minimum 4.5:1 contrast ratio
- Interactive elements: Minimum 3:1 contrast ratio
- Gold (#d4af37) on black (#0a0e27): 8.2:1 ✓

### Focus States
- All interactive elements have visible focus ring
- Focus ring color: `#d4af37` with 2px width
- Focus ring offset: 2px

### Keyboard Navigation
- Tab order follows visual flow
- All buttons and links keyboard accessible
- Escape key closes modals and dropdowns
- Enter key submits forms

### Screen Reader Support
- Semantic HTML (buttons, links, headings)
- ARIA labels for icon buttons
- ARIA live regions for notifications
- Form labels associated with inputs

---

## Dark Theme Implementation

### CSS Variables (in index.css)
```css
:root {
  --color-bg-primary: #0a0e27;
  --color-bg-secondary: #1a1f3a;
  --color-text-primary: #e8d5b7;
  --color-text-secondary: #b0a080;
  --color-accent-primary: #d4af37;
  --color-accent-secondary: #e8d5b7;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-info: #3b82f6;
  
  --glass-blur: blur(10px);
  --glass-bg-light: rgba(255, 255, 255, 0.08);
  --glass-bg-medium: rgba(255, 255, 255, 0.12);
  --glass-border: rgba(212, 175, 55, 0.2);
  
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 8px 16px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 16px 32px rgba(0, 0, 0, 0.4);
  --shadow-xl: 0 24px 48px rgba(0, 0, 0, 0.5);
}
```

---

## Component Examples

### Glass Card with Hover
```jsx
<div className="relative rounded-2xl overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl" />
  <div className="relative border border-gold/20 rounded-2xl p-6 hover:border-gold/40 transition-all duration-300">
    {/* Content */}
  </div>
</div>
```

### Animated Button
```jsx
<button className="relative px-6 py-3 rounded-lg font-semibold overflow-hidden group">
  <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-gold/10 backdrop-blur-md group-hover:from-gold/30 group-hover:to-gold/20 transition-all duration-200" />
  <div className="relative text-gold group-active:scale-95 transition-transform duration-150">
    Click Me
  </div>
</button>
```

### Rank-Up Notification
```jsx
<motion.div
  initial={{ scale: 0.95, opacity: 0, y: 20 }}
  animate={{ scale: 1, opacity: 1, y: 0 }}
  exit={{ scale: 0.95, opacity: 0, y: 20 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="glass-card p-6 text-center"
>
  <motion.div
    animate={{ scale: [1, 1.1, 1] }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="text-4xl mb-4"
  >
    🏆
  </motion.div>
  <h3 className="text-2xl font-bold text-gold">Rank Up!</h3>
  <p className="text-gold/70">You've reached Gold Tier</p>
</motion.div>
```

---

## Implementation Checklist

- [ ] Set up Tailwind CSS with custom color variables
- [ ] Create glassmorphism utility classes
- [ ] Implement glass card component
- [ ] Implement glass button component
- [ ] Implement glass input component
- [ ] Create animation utilities with Framer Motion
- [ ] Build responsive layout components
- [ ] Implement dark theme CSS variables
- [ ] Create component showcase/storybook
- [ ] Test accessibility with screen readers
- [ ] Verify color contrast ratios
- [ ] Test animations on low-end devices
- [ ] Optimize performance for animations
