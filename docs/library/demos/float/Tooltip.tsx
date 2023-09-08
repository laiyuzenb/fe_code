import React, {
  useState,
  useEffect,
  useRef,
  cloneElement,
  ReactElement,
  ReactNode,
} from 'react';
import {
  useFloating,
  offset,
  flip,
  shift,
  useHover,
  useInteractions,
  arrow,
  useClick,
  FloatingArrow,
  autoUpdate,
  FloatingPortal,
} from '@floating-ui/react';

export interface TooltipProps {
  children: ReactElement;
  /** 自定义最外层样式classname */
  className?: string;
  /** 箭头classname */
  arrowClassName?: string;
  /** 提示文字*/
  title: ReactNode;
  /** 触发方式 */
  trigger?: 'hover' | 'click';
  /** 是否显示 */
  open?: boolean;
  /** 位置 */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** 是否显示箭头 */
  showArrow?: boolean;
  /** 距离目标元素的距离 */
  offset_gap?: number;
  /** 箭头的宽度 */
  arrowWidth?: number;
  /** 箭头的高度 */
  arrowHeight?: number;
  /** 箭头的半径 */
  arrowRadius?: number;
  /** 是否跟随元素定位（当元素移动位置时跟随定位）*/
  follow?: boolean;
  /** 显示隐藏的回调 */
  onOpenChange?: (open: boolean) => void;
  /** 是否渲染在body */
  inBody?: boolean;
  /** 渲染节点 默认为children相邻节点 相当于ant的getPopupContainer */
  portalNode: HTMLElement;
  /** 阻止浮层内点击事件冒泡 */
  stoppropagation: boolean;
}

function Tooltip(props: TooltipProps) {
  const {
    children,
    title,
    trigger,
    open,
    placement,
    showArrow,
    offset_gap,
    arrowWidth,
    arrowHeight,
    arrowRadius,
    follow,
    onOpenChange,
    className,
    arrowClassName,
    inBody,
    portalNode,
    stoppropagation,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const arrowRef = useRef(null);

  useEffect(() => {
    if (typeof open === 'boolean') {
      setIsOpen(open);
    }
  }, [open]);

  const { x, y, strategy, refs, context } = useFloating({
    placement,
    middleware: [
      offset(offset_gap),
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
    open: isOpen,
    onOpenChange: (show) => {
      setIsOpen(show);
      onOpenChange && onOpenChange(show);
    },
    whileElementsMounted: follow
      ? function (...args) {
          const cleanup = autoUpdate(...args, { animationFrame: true });

          return cleanup;
        }
      : undefined,
  });

  const click = useClick(context, {
    enabled: trigger === 'click',
  });

  const hover = useHover(context, {
    enabled: trigger === 'hover',
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
  ]);

  const TriggerElement = cloneElement(children, {
    ref: refs.setReference,
    ...getReferenceProps(),
  });

  const FloatElement = cloneElement(
    <div>
      {title}
      {showArrow ? (
        <FloatingArrow
          ref={arrowRef}
          context={context}
          width={arrowWidth}
          height={arrowHeight}
          tipRadius={arrowRadius}
          className={`tootip-arrow ${arrowClassName}`}
        />
      ) : null}
    </div>,
    {
      ref: refs.setFloating,
      style: {
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
      },
      className: `tootip ${className}`,
      ...getFloatingProps(
        stoppropagation ? { onClick: (e) => e.stopPropagation() } : {},
      ),
    },
  );

  return (
    <>
      {TriggerElement}
      {isOpen && inBody ? (
        <FloatingPortal root={portalNode}> {FloatElement} </FloatingPortal>
      ) : null}
      {isOpen && !inBody ? FloatElement : null}
    </>
  );
}

Tooltip.defaultProps = {
  className: '',
  arrowClassName: '',
  trigger: 'hover',
  open: false,
  placement: 'right',
  showArrow: true,
  offset_gap: 10,
  arrowWidth: 12,
  arrowHeight: 5,
  arrowRadius: 3,
  follow: false,
  onOpenChange: () => {},
  inBody: false,
  portalNode: document.body,
  stoppropagation: false,
};

export default Tooltip;
