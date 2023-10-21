import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import type { ButtonProps, SwitchProps, TagProps } from 'element-plus'
import { ElButton, ElTag, ElSwitch } from 'element-plus'

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
export const useSlotSwitch = (value: any, onClick?: (index: number, val: any) => void, props: SlotSwitch = {}) => {
  const defaultProps: SlotSwitch = {
    size: 'default'
  }
  return h(
    ElSwitch,
    {
      ...defaultProps,
      ...props,
      onClick
    },
    {
      default: () => value
    }
  )
}
