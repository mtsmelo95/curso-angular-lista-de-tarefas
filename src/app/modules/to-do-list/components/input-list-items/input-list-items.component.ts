import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItems } from '../../interface/IListItems.interface';

@Component({
  selector: 'app-input-list-items',
  standalone: true,
  imports: [],
  templateUrl: './input-list-items.component.html',
  styleUrl: './input-list-items.component.scss',
})
export class InputListItemsComponent {
  @Input({ required: true }) public inputListItems: Array<IListItems> = [];

  @Output() public outputUpdateItemCheckbox = new EventEmitter<{
    checked: boolean;
    id: string;
  }>();
  public updateItemCheckbox(checked: boolean, id: string) {
    return this.outputUpdateItemCheckbox.emit({ checked, id });
  }

  @Output() public outputUpdateItemText = new EventEmitter<{
    value: string;
    id: string;
  }>();
  public updateItemText(value: string, id: string) {
    return this.outputUpdateItemText.emit({ value, id });
  }

  @Output() public outputDeleteItem = new EventEmitter<string>();
  public deleteItem(id: string) {
    return this.outputDeleteItem.emit(id);
  }
}
