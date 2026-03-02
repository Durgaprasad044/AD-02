export const theme = {
  colors: {
    primary: 'var(--color-primary)',
    primaryHover: '#8d6a46',
    primaryForeground: 'var(--color-primary-foreground)',
    
    secondary: 'var(--color-secondary)',
    secondaryForeground: 'var(--color-secondary-foreground)',

    accent: 'var(--color-accent)',
    accentForeground: 'var(--color-accent-foreground)',
    
    background: 'var(--color-background)',
    foreground: 'var(--color-foreground)',
    
    card: 'var(--color-card)',
    cardForeground: 'var(--color-card-foreground)',
    
    muted: 'var(--color-muted)',
    mutedForeground: 'var(--color-muted-foreground)',
    
    destructive: 'var(--color-destructive)',
    destructiveForeground: 'var(--color-destructive-foreground)',
    
    border: 'var(--color-border)',
    input: 'var(--color-input)',
    ring: 'var(--color-ring)',
    
    sidebar: 'var(--color-sidebar)',
    sidebarForeground: 'var(--color-sidebar-foreground)',

    success: '#5c8a6b', // Muted green for success
    warning: '#cca052', // Muted yellow/orange
    danger: 'var(--color-destructive)',
    
    // Abstracting old variable names to map to the new paper theme to prevent breaking
    textPrimary: 'var(--color-foreground)',
    textSecondary: 'var(--color-muted-foreground)',
    cardBackground: 'var(--color-card)',
    elevated: 'var(--color-card)',
  },
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
    xxl: 'var(--spacing-2xl)',
    xxxl: 'var(--spacing-3xl)',
    giant: '80px',
  },
  borderRadius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)', /* 12px for cards / buttons typically */
    lg: 'var(--radius-lg)',
    full: 'var(--radius-full)',
  },
  shadows: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
  },
  typography: {
    fontFamily: '"Inter", serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
      display: '2.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  animation: {
    transition: 'all 0.2s ease-in-out',
  }
};
