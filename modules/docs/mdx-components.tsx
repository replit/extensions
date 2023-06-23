import { MDXComponents } from 'mdx/types'
import { HTMLAttributes } from 'react'

export function useMDXComponents(components: MDXComponents) {
  return {
    strong: ({ children }: HTMLAttributes<HTMLSpanElement>) => <strong style={{ color: 'red' }}>{children}</strong>,
    ...components
  }
}