export type T_SELECTORS =
  | ".slider__prev"
  | ".slider__next"
  | ".slider__panel_btn"
  | ".slider__panel_dot";

export type T_SLIDELIST_ITEM = {
  readonly slideImg: string,
  readonly comment?: string | null,
  readonly controlImg?: string | null
}  
export type T_ARRAY_METHODS = "forEach" | "map" | "filter" | "reduce"

export type T_PANEL = 'renderDots' | 'renderControls'