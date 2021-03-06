import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StDropdownMenuComponent } from './st-dropdown-menu.component';
import { StDropdownMenuItemComponent } from './components';
import { StDropDownMenuItem } from './st-dropdown-menu.interface';

let items: Array<StDropDownMenuItem> = [
   {
      label: 'example 1',
      value: 1
   },
   {
      label: 'example 2',
      value: 2
   }
];

describe('StDropdownMenuComponent', () => {

   let component: StDropdownMenuComponent;
   let fixture: ComponentFixture<StDropdownMenuComponent>;
   let de: DebugElement;

   beforeEach(() => {
      TestBed.configureTestingModule({
         declarations: [StDropdownMenuComponent, StDropdownMenuItemComponent]
      });

      fixture = TestBed.createComponent(StDropdownMenuComponent);
      component = fixture.componentInstance;
   });

   it('should throw an error for missing Items attribute', () => {
      expect(() => component.ngOnInit()).toThrowError('Attribute items is required');
   });

   it('should show two items in component', () => {
      component.items = items;
      fixture.detectChanges();
      expect(component.items.length).toBe(items.length);
   });

   it('should show the menu inactive', () => {
      component.items = items;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('.dropdown-menu')).toBeNull();
   });

   it('should show the menu active', () => {
      component.items = items;
      component.active = true;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('.dropdown-menu')).toBeDefined();
   });


});
