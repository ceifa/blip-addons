import * as React from 'react'

export type TitleProps = {
  children: React.ReactChild[] | React.ReactChild
}

export const Title = ({ children }: TitleProps) => {
  return <span className="bp-fs-5 bp-c-city ttu b">{children}</span>
}
