import { cep_node, cep, __adobe_cep__ } from "./lib/cep-types";

declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.svg";

declare global {
  interface Window {
    cep_node: cep_node;
    cep: cep;
    __adobe_cep__: __adobe_cep__;
  }
}

export type LayerObj = {
  index: number;
  name: string;
  in: string;
  out: string[];
  prev: string;
  count: number;
  darken: boolean;
};
