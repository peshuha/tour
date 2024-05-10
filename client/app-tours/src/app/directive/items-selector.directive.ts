import {AfterViewInit, Directive, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";

@Directive({
  selector: '[appItemsSelector]',
  exportAs: "appItemsSelector",
  inputs: [
    {
      // Класс элементов внутри контейнера
      name: "itemsclass",
      required: true
    },
    {
      // Класс выделения текущего элемента
      name: "toggleclass",
      required: true
    },
    {
      // Подписчик на событие активации элемента
      name: "activator",
      required: false
    },
    {
      // Название поля, содержащего id элемента
      name: "itemid",
      required: false
    },
    {
      // Инициализацию первого?
      name: "initindex",
      required: false
    }
  ],
  host: {
    "(document:click)": "OnClick($event)",
    "(document:keyup)": "OnKeyup($event)"
  }
})
export class ItemsSelectorDirective implements OnInit, AfterViewInit{

  itemsclass = ""
  toggleclass = ""
  itemClassSelector = ""
  elContainer: HTMLElement | null = null;
  elCurrent: HTMLElement | null = null;
  activator: ReplaySubject<any> | undefined;
  itemid = ""
  initindex = false

  // После того как проиниализирован
  @Output() OnAfterInitialize: EventEmitter<void> = new EventEmitter<void>()
  constructor(
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.itemClassSelector = !!this.itemsclass ? ("." + this.itemsclass) : ""
  }

  ngAfterViewInit(): void {
    // Переводим в элемент
    this.elContainer = this.el.nativeElement

    // Находим первого
    if(this.initindex && !this.elCurrent) {
      this.elCurrent = <HTMLElement>this.elContainer?.querySelector(this.itemClassSelector)
      this.ToggleClass(this.elCurrent)
    }

    setTimeout(() => {
      this.OnAfterInitialize.emit()
    })
  }

  ContainerClassAdd(cls: string) {
    this.elContainer?.classList.add(cls)
  }
  ContainerClassRemove(cls: string) {
    this.elContainer?.classList.remove(cls)
  }

  OnClick(e: Event) {
    // Работаем со своим набором
    // console.log("OnClick(e: Event)", e.target)
    this.ToggleClass(this.LookupClosest(<HTMLElement>e.target));
  }

  OnKeyup(e:KeyboardEvent) {
    // console.log(" OnKeyup(e:KeyboardEvent)", e)

    if(!this.elCurrent) {
      return;
    }

    let el: HTMLElement | null = null
    switch(e.key) {
      case "ArrowUp":
        el = this.LookupUp();
        break;
      case "ArrowRight":
        el = this.LookupRight();
        break
      case "ArrowDown":
        el = this.LookupDown();
        break;
      case "ArrowLeft":
        el = this.LookupLeft()
        break;
      case "Enter": {
        // Вызываем подписку
        this.ActivateItem();
        return;
      }
    }

    if(!el) {
      return
    }
    this.ToggleClass(el)
  }

  NavigateUp() {
    this.ToggleClass(this.LookupUp())
  }

  NavigateRight() {
    this.ToggleClass(this.LookupRight())
  }
  NavigateDown() {
    this.ToggleClass(this.LookupDown())
  }
  NavigateLeft() {
    this.ToggleClass(this.LookupLeft())
  }


  private ActivateItem(): void {
    if(!this.elCurrent || !this.activator) {
      return;
    }
    // console.log("ActivateItem()", this.elCurrent.getAttribute(this.itemid))
    this.activator.next(this.elCurrent.getAttribute(this.itemid) || "")
  }

  private LookupUp(): HTMLElement | null {

    if(!this.elCurrent) {
      return null
    }

    // Движемся ввлево (вверх по сестрам)
    const rect = (<HTMLElement>this.elCurrent).getBoundingClientRect();
    let el: HTMLElement| null = <HTMLElement>this.elCurrent.previousElementSibling;
    while(el) {
      // console.log("LookupUp()", el.getBoundingClientRect(), rect)
      if(el.getBoundingClientRect().left === rect.left) {
        break
      }

      // Переходим к следущему
      el = <HTMLElement>el.previousElementSibling;
    }

    return el;
  }

  private LookupDown(): HTMLElement | null {

    if(!this.elCurrent) {
      return null
    }

    // Движемся вправо (вниз по сестрам)
    const rect = (<HTMLElement>this.elCurrent).getBoundingClientRect();
    let el: HTMLElement| null = <HTMLElement>this.elCurrent.nextElementSibling;
    while(el) {
      // console.log("LookupUp()", el.getBoundingClientRect(), rect)
      if(el.getBoundingClientRect().left === rect.left) {
        break
      }

      // Переходим к следущему
      el = <HTMLElement>el.nextElementSibling;
    }

    return el;
  }

  private LookupLeft(): HTMLElement | null {

    if(!this.elCurrent) {
      return null
    }

    return <HTMLElement>this.elCurrent.previousElementSibling;
  }

  private LookupRight(): HTMLElement | null {

    if(!this.elCurrent) {
      return null
    }

    return <HTMLElement>this.elCurrent.nextElementSibling;
  }

  private LookupClosest(el: HTMLElement): HTMLElement | null {
    if(!el || !this.itemClassSelector) {
      return null;
    }
    return el.closest(this.itemClassSelector)
  }

  private ToggleClass(el: HTMLElement | null): void {
    if(!el || el.classList.contains(this.toggleclass)) {
      return
    }

    // Сбрасываем с текущего
    if(this.elCurrent) {
      this.elCurrent.classList.remove(this.toggleclass)
    }

    this.elCurrent = el;
    this.elCurrent.classList.add(this.toggleclass)
  }

  GetCountOfItems(): number | undefined {
    return this.elContainer?.querySelectorAll(this.itemClassSelector).length
  }
  // Какой элемент по счету
  public GetItemNumber(): number | null {
    if(!this.elCurrent) {
      return null
    }

    let n = 1;
    let el: HTMLElement = <HTMLElement>this.elCurrent.previousElementSibling
    while(el) {
      el = <HTMLElement>el.previousElementSibling;
      n++;
    }
    return n
  }
}
