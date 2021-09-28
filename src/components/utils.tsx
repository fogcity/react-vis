import { useEffect, useState, useRef } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export interface accessorPropsType<T> {
  (datum: T, index?: number, array?: Iterable<T>): string | undefined | string
}

export function callAccessor<T>(accessor: accessorPropsType<T>, d: any, i: number) {
  return typeof accessor === 'function' ? accessor(d, i) : accessor
}
export type combineDimensionsPropsType = {
  boundedHeight: number
  boundedWidth: number
} & dimensionsPropsType
export type dimensionsPropsType = {
  height: number
  width: number
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number
}

export const combineChartDimensions = (dimensions: dimensionsPropsType) => {
  const parsedDimensions: Required<dimensionsPropsType> = {
    marginTop: 40,
    marginRight: 30,
    marginBottom: 40,
    marginLeft: 75,
    ...dimensions,
  }

  return {
    ...parsedDimensions,
    boundedHeight: Math.max(parsedDimensions?.height - parsedDimensions.marginTop - parsedDimensions.marginBottom, 0),
    boundedWidth: Math.max(parsedDimensions?.width - parsedDimensions.marginLeft - parsedDimensions.marginRight, 0),
  }
}

export const useChartDimensions = (passedSettings: dimensionsPropsType) => {
  const ref = useRef()
  const dimensions = combineChartDimensions(passedSettings)

  const [width, changeWidth] = useState(0)
  const [height, changeHeight] = useState(0)
  const changeSetting = () => {
    if (dimensions.width && dimensions.height) return [ref, dimensions]

    const element = ref.current
    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries)) return
      if (!entries.length) return

      const entry = entries[0]

      if (width !== entry.contentRect.width) changeWidth(entry.contentRect.width)
      if (height !== entry.contentRect.height) changeHeight(entry.contentRect.height)
    })

    resizeObserver.observe(element as unknown as Element)

    return () => resizeObserver.unobserve(element as unknown as Element)
  }
  useEffect(changeSetting as any, [passedSettings, height, width, dimensions])

  const newSettings = combineChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  })

  return [ref, newSettings]
}

let lastId = 0
export const useUniqueId = (prefix = '') => {
  lastId++
  return [prefix, lastId].join('-')
}
