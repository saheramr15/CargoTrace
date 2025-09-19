import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'oklch(var(--sidebar))',
                    foreground: 'oklch(var(--sidebar-foreground))',
                    primary: 'oklch(var(--sidebar-primary))',
                    'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
                    accent: 'oklch(var(--sidebar-accent))',
                    'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
                    border: 'oklch(var(--sidebar-border))',
                    ring: 'oklch(var(--sidebar-ring))'
                },
                // Custom Web3 colors
                'crypto-gold': 'oklch(var(--crypto-gold))',
                'chain-blue': 'oklch(var(--chain-blue))',
                'fusion-purple': 'oklch(var(--fusion-purple))',
                'ico-green': 'oklch(var(--ico-green))'
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
                'glow-sm': '0 0 20px oklch(var(--primary) / 0.3)',
                'glow-md': '0 0 40px oklch(var(--primary) / 0.4)',
                'glow-lg': '0 0 60px oklch(var(--primary) / 0.5)',
                'crypto': '0 8px 32px oklch(var(--primary) / 0.15)',
                'chain': '0 4px 20px oklch(var(--chain-blue) / 0.3)',
                'fusion': '0 4px 20px oklch(var(--fusion-purple) / 0.3)',
                'ico': '0 4px 20px oklch(var(--ico-green) / 0.3)'
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Consolas', 'monospace']
            },
            fontSize: {
                'hero': 'clamp(2.5rem, 8vw, 6rem)',
                'display': 'clamp(1.875rem, 4vw, 3.75rem)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' }
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px oklch(var(--primary) / 0.3)' },
                    '50%': { boxShadow: '0 0 40px oklch(var(--primary) / 0.6)' }
                },
                'rotate': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' }
                },
                'slide-up': {
                    from: { 
                        opacity: '0', 
                        transform: 'translateY(30px)' 
                    },
                    to: { 
                        opacity: '1', 
                        transform: 'translateY(0)' 
                    }
                },
                'shimmer': {
                    '0%': { left: '-100%' },
                    '100%': { left: '100%' }
                },
                'bounce-slow': {
                    '0%, 100%': { 
                        transform: 'translateY(-25%)',
                        animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
                    },
                    '50%': { 
                        transform: 'translateY(0)',
                        animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
                    }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'rotate': 'rotate 20s linear infinite',
                'slide-up': 'slide-up 0.6s ease-out forwards',
                'shimmer': 'shimmer 2s infinite',
                'bounce-slow': 'bounce-slow 3s infinite'
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'mesh-gradient': 'linear-gradient(135deg, oklch(var(--primary) / 0.1) 0%, oklch(var(--accent) / 0.1) 50%, oklch(var(--secondary) / 0.1) 100%)'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
