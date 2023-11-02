import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import type { ButtonProps, SwitchProps, TagProps } from 'element-plus'
import { ElButton, ElTag, ElSwitch } from 'element-plus'
import type { Slot } from 'vue'

export interface Column {
  prop?: string
  label?: string
  width?: string | number
  align?: string
  slot?: Slot
}
export interface ColumnAttrs<T> {
  row: T
  column: TableColumnCtx<T>
  rowIndex: number
}

export type SlotButtonProps = Partial<ButtonProps>

export type SlotTagProps = Partial<TagProps> & { style?: Partial<CSSStyleDeclaration> }
export type SlotSwitch = Partial<SwitchProps>

export const useSlotButton = (text: string, onClick?: () => void, props: SlotButtonProps = {}) => {
  const defaultProps: SlotButtonProps = {
    link: true,
    type: 'primary',
    size: 'small'
  }
  return h(
    ElButton,
    {
      ...defaultProps,
      ...props,
      onClick
    },
    {
      default: () => text || '按钮'
    }
  )
}

export const useSlotTag = (text: string, onClick?: () => void, props: SlotTagProps = {}) => {
  const defaultProps: SlotTagProps = {
    size: 'default'
  }
  return h(
    ElTag,
    {
      ...defaultProps,
      ...props,
      onClick
    },
    {
      default: () => text || '标签'
    }
  )
}
export const useSlotSwitch = (value: any, onClick?: (val: any) => void, props: SlotSwitch = {}) => {
  return h(
    ElSwitch,
    {
      ...props,
      onClick
    },
    {
      default: () => value
    }
  )
}
