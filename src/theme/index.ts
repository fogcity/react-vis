const theme: Theme = {
  mode: 'light',
  color: {
    primary: '#003CBE',
    black: '#111827',
    grey: '#6b7280',
    red: '#e32b3a',
    greyLight: '#F3F4F6',
    white: '#fff',
  },
}
type Theme = {
  mode: 'dark' | 'light'
  color: Partial<{
    primary: string
    black: string
    grey: string
    greyLight: string
    white: string
    red: string
  }>
}

export { theme, Theme }
