import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, pipe, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit {

  private dbouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
     this.dbouncer
     .pipe(
      debounceTime(300)
     )
     .subscribe( value => {
      this.onDebounce.emit(value);
  });
}

  emitValue( value: string ):void {
    this.onValue.emit( value );
  }

  onKeyPress(searchTerm: string){
    this.dbouncer.next(searchTerm);
  }

}
