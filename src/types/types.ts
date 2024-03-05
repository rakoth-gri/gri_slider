export type T_SELECTORS =
  | ".gri-slider__prev"
  | ".gri-slider__next"
  | ".gri-slider__panel_btn"
  | ".gri-slider__panel_dot";

export type T_SLIDELIST_ITEM = {
  readonly slideImg: string,
  readonly comment?: string | null,
  readonly controlImg?: string | null
}  
export type T_ARRAY_METHODS = "forEach" | "map" | "filter" | "reduce"

export type T_PANEL = 'renderDots' | 'renderControls'