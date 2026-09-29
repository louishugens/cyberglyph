import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { Plus } from "@phosphor-icons/react/dist/ssr"
import { cn } from "cn"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-center justify-between gap-6 rounded-(--radius-field) py-6 text-left text-lg font-medium tracking-[-0.01em] outline-none focus-visible:ring-4 focus-visible:ring-ring aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-[transform,color] duration-200 ease-(--ease-out) group-hover/accordion-trigger:text-foreground group-aria-expanded/accordion-trigger:rotate-45">
          <Plus size={14} weight="bold" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pb-6 max-w-[62ch] leading-relaxed text-muted-foreground data-ending-style:h-0 data-starting-style:h-0",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
