import { Component, signal } from '@angular/core';
import { InputAddItensComponent } from '../../components/input-add-itens/input-add-itens.component';
import { IListItems } from '../../interface/IListItems.interface';
import { InputListItemsComponent } from '../../components/input-list-items/input-list-items.component';
import { ELocalStorage } from '../../enum/ELocalStorage.enum';
import Swal from 'sweetalert2';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    InputAddItensComponent,
    InputListItemsComponent,
    MatSlideToggleModule,
    NgClass,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  public addItem = signal(true);

  #setListItems = signal<IListItems[]>(this.#parseItems());
  public getListItems = this.#setListItems.asReadonly();

  #parseItems() {
    return JSON.parse(localStorage.getItem(ELocalStorage.MY_LIST) || '[]');
  }

  #updateLocalStorage() {
    return localStorage.setItem(
      ELocalStorage.MY_LIST,
      JSON.stringify(this.#setListItems())
    );
  }

  public getInputAndAddItem(value: IListItems) {
    localStorage.setItem(
      ELocalStorage.MY_LIST,
      JSON.stringify([...this.#setListItems(), value])
    );

    return this.#setListItems.set(this.#parseItems());
  }

  public listItemsStage(value: 'pending' | 'completed') {
    return this.getListItems().filter((res: IListItems) => {
      if (value === 'pending') return !res.checked;

      if (value === 'completed') return res.checked;

      return res;
    });
  }

  public deleteAllItems() {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, delete tudo!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deletado!',
          text: 'Itens deletados com sucesso.',
          icon: 'success',
        });

        localStorage.removeItem(ELocalStorage.MY_LIST);
        return this.#setListItems.set(this.#parseItems());
      }
    });
  }

  public updateItemCheckbox(newItem: { id: string; checked: boolean }) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter((res) => {
        if (res.id === newItem.id) {
          res.checked = newItem.checked;
          return res;
        }
        return res;
      });
      return oldValue;
    });
    return this.#updateLocalStorage();
  }

  public updateItemText(newItem: { id: string; value: string }) {
    this.#setListItems.update((oldValue: IListItems[]) => {
      oldValue.filter((res) => {
        if (res.id === newItem.id) {
          res.value = newItem.value;
          return res;
        }
        return res;
      });
      return oldValue;
    });
    return this.#updateLocalStorage();
  }

  public deleteItem(id: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, delete este item!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deletado!',
          text: 'Item deletado com sucesso.',
          icon: 'success',
        });
        this.#setListItems.update((oldValue: IListItems[]) => {
          return oldValue.filter((res) => res.id !== id);
        });

        return this.#updateLocalStorage();
      }
    });
  }

  #darkMode = false;

  toggleDarkMode() {
    this.#darkMode = !this.#darkMode;
  }

  getDarkModeClass() {
    console.log(this.#darkMode);
    return this.#darkMode ? 'dark' : 'light';
  }

  getDarkModeText() {
    return this.#darkMode ? 'Desativar modo escuro' : 'Ativar modo escuro';
  }
}
