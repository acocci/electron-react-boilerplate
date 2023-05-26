import { RFC } from 'types/generic.types';

export interface IComponent {
  Comp: RFC;
  id: string;
}

export type ComponentArray = Array<IComponent>;

export interface IComponents {
  components: ComponentArray;
  selected?: string;
}
