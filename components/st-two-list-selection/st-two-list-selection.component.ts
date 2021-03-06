import {
   Component,
   ChangeDetectionStrategy,
   Input,
   Output,
   EventEmitter,
   OnInit,
   OnChanges,
   SimpleChanges,
   ChangeDetectorRef
} from '@angular/core';
import * as _ from 'lodash';

import { CheckRequired, Required } from '../decorators';
import { StTwoListSelectionElement, StTwoListSelectionConfig } from './st-two-list-selection.model';
import { StTwoListSelection } from './st-two-list-selection';

@Component({
   selector: 'st-two-list-selection',
   template: `
      <st-two-list-selection-view
         [allElements]="allList | stFilterList:searchBy:allSearch"
         [selectedElements]="selectedList | stFilterList:searchBy:selectedSearch"
         [config]="config"
         [editable]="editable"
         [qaTag]="qaTag"

         [activeArrowLeft]="canActivateArrowLeft()"
         [activeArrowRight]="canActivateArrowRight()"

         (selectAllElement)="onSelectAllElement($event)"
         (selectSelectedElement)="onSelectSelectedElement($event)"
         (searchOverAll)="onSearchOverAll($event)"
         (searchOverSelected)="onSearchOverSelected($event)"
         (moveToSelected)="onMoveToSelected($event)"
         (moveToAll)="onMoveToAll($event)"
      ></st-two-list-selection-view>
   `,
   changeDetection: ChangeDetectionStrategy.OnPush
})
@CheckRequired()
export class StTwoListSelectionComponent extends StTwoListSelection implements OnInit, OnChanges {

   @Input() @Required('editable') allElements: Array<StTwoListSelectionElement>;
   @Input() @Required() selectedElements: Array<StTwoListSelectionElement>;
   @Output() selectedElementsChange: EventEmitter<Array<StTwoListSelectionElement>> = new EventEmitter<Array<StTwoListSelectionElement>>();

   @Input() config: StTwoListSelectionConfig;
   @Input() editable: boolean = false;
   @Input() @Required() qaTag: string;
   @Input() sortBy: 'id' | 'name' = 'id';

   constructor(private cd: ChangeDetectorRef) {
      super(cd);
   }

   ngOnInit(): void {
      this.init(
         this.allElements,
         this.selectedElements,
         this.selectedElementsChange,
         this.sortBy
      );
   }

   ngOnChanges(changes: SimpleChanges): void {
      this.checkChanges(changes, 'allElements', 'selectedElements');
   }

   get allList(): Array<StTwoListSelectionElement> {
      return this.copyAllElement;
   }

   get selectedList(): Array<StTwoListSelectionElement> {
      return this.copySelectedElements;
   }
}
