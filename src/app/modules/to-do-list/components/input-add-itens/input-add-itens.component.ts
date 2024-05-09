import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  inject,
  ViewChild,
  Input,
} from '@angular/core';
import { IListItems } from '../../interface/IListItems.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-itens',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-itens.component.html',
  styleUrl: './input-add-itens.component.scss',
})
export class InputAddItensComponent {
  #cdr = inject(ChangeDetectorRef);

  @Input({ required: true }) public inputListItems: Array<IListItems> = [];
  @ViewChild('inputText')
  public inputText!: ElementRef;

  @Output() public outputAddListItems = new EventEmitter<IListItems>();
  public focusAndAddItem(value: string) {
    if (value) {
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const currentyDate = new Date();
      const timestamp = currentyDate.getTime();
      const id = `ID ${timestamp}`;

      this.outputAddListItems.emit({
        id,
        checked: false,
        value,
      });

      return this.inputText.nativeElement.focus();
    }
  }
}
